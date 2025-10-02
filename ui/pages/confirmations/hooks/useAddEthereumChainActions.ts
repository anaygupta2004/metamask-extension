import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ApprovalType } from '@metamask/controller-utils';
import { providerErrors, serializeError } from '@metamask/rpc-errors';
import {
  rejectPendingApproval,
  resolvePendingApproval,
} from '../../../store/actions';
import { useConfirmContext } from '../context/confirm';

// Type definitions for AddEthereumChain request data
type AddEthereumChainRequestData = {
  chainId: string;
  chainName: string;
  rpcPrefs: {
    blockExplorerUrl?: string;
  };
  rpcUrl: string;
  ticker: string;
};

type AddEthereumChainApproval = {
  id: string;
  type: ApprovalType.AddEthereumChain;
  requestData: AddEthereumChainRequestData;
  origin: string;
};

export const useAddEthereumChainActions = () => {
  const dispatch = useDispatch();
  const { currentConfirmation } = useConfirmContext();

  // Add RPC - the featured RPC logic is handled in the background script
  const addRpc = useCallback(async () => {
    if (!currentConfirmation) {
      return;
    }

    const approval = currentConfirmation as unknown as AddEthereumChainApproval;

    try {
      // Simply resolve the approval - background script handles featured RPC logic
      await dispatch(resolvePendingApproval(approval.id, approval.requestData));
    } catch (error) {
      console.error('Error in addRpc:', error);
      throw error;
    }
  }, [currentConfirmation, dispatch]);

  // Reject the approval
  const rejectApproval = useCallback(() => {
    if (!currentConfirmation) {
      return;
    }

    const error = serializeError(providerErrors.userRejectedRequest());
    dispatch(rejectPendingApproval(currentConfirmation.id, error));
  }, [currentConfirmation, dispatch]);

  return {
    addRpc,
    rejectApproval,
  };
};
