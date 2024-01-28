import { useEffect, useState } from "react";
import Image from "next/image";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { WalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupMintbaseWallet } from "@near-wallet-selector/mintbase-wallet";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupMeteorWallet} from "@near-wallet-selector/meteor-wallet";
import { setupLedger } from "@near-wallet-selector/ledger" 
import "@near-wallet-selector/modal-ui/styles.css";

export default function NearWallet() {
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);

  useEffect(() => {
    const initializeWallet = async () => {
      const selector: WalletSelector = await setupWalletSelector({
        network: "testnet",
        modules: [
          setupMyNearWallet(),
          setupMintbaseWallet(),
          setupHereWallet(),
          setupSender(),
          setupMeteorWallet(),
          setupLedger()
        ],
      });

      // Ensure modalInstance is of type WalletSelectorModal
      const modalInstance: WalletSelectorModal = setupModal(selector, {
        contractId: "test.testnet",
      });

      setModal(modalInstance);
    };

    initializeWallet();
  }, []);

  const nearWalletSelector = () => {
    if (modal) {
      modal.show();
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <button onClick={nearWalletSelector}>
          <Image
            src="/images/near-protocol-near-logo.svg"
            width={28}
            height={28}
            alt="NEAR"
            className="mt-3 mr-2"
          />
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
            />
          </svg> */}
        </button>
      </div>
    </div>
  );
}
