import React from 'react';
import { Link } from 'react-router-dom-v5-compat';
import { ApprovalType } from '@metamask/controller-utils';
import {
  Box,
  IconSize,
  IconName,
  Text,
  TextVariant,
  Icon,
} from '@metamask/design-system-react';
import { IconName as LegacyIconName } from '../../../../../../components/component-library';
import { ConfirmInfoSection } from '../../../../../../components/app/confirm/info/row/section';
import { ConfirmInfoRow } from '../../../../../../components/app/confirm/info/row';
import { useConfirmContext } from '../../../../context/confirm';
// import { useI18nContext } from '../../../../../../hooks/useI18nContext';
// import { useAddEthereumChainActions } from '../../../../hooks/useAddEthereumChainActions';

// Define the shape of AddEthereumChain request data
// interface AddEthereumChainRequestData {
//   chainId: string;
//   chainName: string;
//   rpcPrefs: {
//     blockExplorerUrl?: string;
//   };
//   rpcUrl: string;
//   ticker: string;
// }

// interface AddEthereumChainApproval {
//   id: string;
//   type: ApprovalType.AddEthereumChain;
//   requestData: AddEthereumChainRequestData;
//   origin: string;
// }

// ApprovalsMetaMaskState

// TODO
type AddEthereumChainContext = {
  type: ApprovalType.AddEthereumChain;
  requestData: {
    chainId: string;
    chainName: string;
    rpcPrefs: {
      blockExplorerUrl?: string;
    };
    rpcUrl: string;
    ticker: string;
  };
  origin: string;
};

export const AddEthereumChainInfo = () => {
  const { currentConfirmation } = useConfirmContext<AddEthereumChainContext>();

  // Helper function to clean RPC URLs for display
  const cleanRpcUrl = (url: string): string => {
    if (!url) {
      return '';
    }
    const cleanedUrl = url.toLowerCase();
    return cleanedUrl
      .replace(/\/v3\/[a-f0-9]{32}$/iu, '') // Remove actual infura project IDs
      .replace(/\/v3\/\{?infuraprojectid\}?$/iu, '') // Remove placeholder text
      .replace(/\/v3\/.*$/iu, ''); // Fallback: remove anything after /v3/
  };

  // if (
  //   !currentConfirmation ||
  //   (currentConfirmation as any).type !== ApprovalType.AddEthereumChain
  // ) {
  //   return null;
  // }

  // const confirmation =
  const { requestData, origin } = currentConfirmation;

  // console.log('>>> currentConfirmation', currentConfirmation);
  // console.log('>>> requestData', requestData);

  const title = `Update ${'Network'}`;
  const description = 'A site is suggesting additional network details.';

  return (
    <>
      <Box className="text-center mb-4">
        <Text variant={TextVariant.HeadingLg} className="text-balance mb-2">
          {title}
        </Text>
        <Text className="text-alternative">{description}</Text>
      </Box>

      <ConfirmInfoSection>
        <ConfirmInfoRow
          label="Request from"
          tooltipIcon={LegacyIconName.Question}
          tooltip="Origin site"
        >
          <Box className="flex gap-1 items-center">
            <Icon name={IconName.Global} size={IconSize.Sm} />
            <Text>{origin}</Text>
          </Box>
        </ConfirmInfoRow>
      </ConfirmInfoSection>

      <ConfirmInfoSection>
        <ConfirmInfoRow label="Network">
          <Text>{requestData.chainName}</Text>
        </ConfirmInfoRow>

        <ConfirmInfoRow
          label="RPC"
          tooltip="RPC URL"
          tooltipIcon={LegacyIconName.Question}
        >
          <Text>{cleanRpcUrl(requestData.rpcUrl)}</Text>
        </ConfirmInfoRow>

        {/* Error display removed - handled by footer */}
      </ConfirmInfoSection>

      <ConfirmInfoSection>
        <ConfirmInfoRow label="Additional details">{/* TODO */}</ConfirmInfoRow>
      </ConfirmInfoSection>

      <Text className="text-center">
        Beware of{' '}
        <Link to="https://metamask.io/scam-warnings/">
          network scams and security risks
        </Link>
      </Text>
    </>
  );
};
