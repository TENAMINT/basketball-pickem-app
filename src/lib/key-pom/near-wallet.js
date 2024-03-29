// near-wallet.js
// wallet selector options & wallet selector UI
import "@near-wallet-selector/modal-ui/styles.css";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupKeypom } from "@keypom/selector";
import { JsonRpcProvider } from "@near-js/providers";
import { getTransactionLastResult } from "@near-js/utils";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { KEYPOM_OPTIONS } from "./keypom-data";

const THIRTY_TGAS = "30000000000000";
const NO_DEPOSIT = "0";

// Wallet that simplifies using the wallet selector
export class Wallet {
  walletSelector;
  wallet;
  network;
  createAccessKeyFor;

  constructor({ createAccessKeyFor = undefined, network = "testnet" }) {
    // Login to a wallet passing a contractId will create a local
    // key, so the user skips signing non-payable transactions.
    // Omitting the accountId will result in the user being
    // asked to sign all transactions.
    this.createAccessKeyFor = createAccessKeyFor;
    this.network = network;
  }

  // To be called when the website loads
  async startUp() {
    this.walletSelector = await setupWalletSelector({
      network: this.network,
      modules: [
        setupMyNearWallet(),
        setupSender(),
        setupKeypom({
          networkId: this.network,
          signInContractId: this.createAccessKeyFor,
          trialAccountSpecs: {
            url: "http://localhost:3000/trial-url#ACCOUNT_ID/SECRET_KEY",
            modalOptions: KEYPOM_OPTIONS,
          },
          instantSignInSpecs: {
            url: "http://localhost:3000/instant-url#ACCOUNT_ID/SECRET_KEY/MODULE_ID",
          },
        }),
      ],
    });

    const isSignedIn = this.walletSelector.isSignedIn();

    if (isSignedIn) {
      this.wallet = await this.walletSelector.wallet();
      this.accountId =
        this.walletSelector.store.getState().accounts[0].accountId;
    }

    return isSignedIn;
  }

  // Sign-in method
  signIn() {
    const description = "Please select a wallet to sign in.";
    const modal = setupModal(this.walletSelector, {
      contractId: this.createAccessKeyFor,
      description,
    });
    modal.show();
  }

  // Sign-out method
  signOut() {
    this.wallet.signOut();
    this.wallet = this.accountId = this.createAccessKeyFor = null;
    window.location.replace(window.location.origin + window.location.pathname);
  }

  async ensureWalletSelectorInitialized() {
    if (!this.walletSelector || !this.walletSelector.options) {
      await this.startUp();
    }
  }

  // Make a read-only call to retrieve information from the network
  async viewMethod({ contractId, method, args = {} }) {
    await this.ensureWalletSelectorInitialized();

    const { network } = this.walletSelector.options;
    const provider = new JsonRpcProvider({ url: network.nodeUrl });

    if (!contractId) {
      throw new Error("Missing contractId");
    }

    let res = await provider.query({
      request_type: "call_function",
      account_id: contractId, // Ensure this is provided and valid
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic",
    });
    return JSON.parse(Buffer.from(res.result).toString());
  }

  // Call a method that changes the contract's state
  async callMethod({
    contractId,
    method,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT,
  }) {
    // Sign a transaction with the "FunctionCall" action
    const outcome = await this.wallet.signAndSendTransaction({
      signerId: this.accountId,
      receiverId: contractId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });

    return getTransactionLastResult(outcome);
  }

  // Get transaction result from the network
  async getTransactionResult(txhash) {
    const { network } = this.walletSelector.options;
    const provider = new JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve transaction result from the network
    const transaction = await provider.txStatus(txhash, "unnused");
    return getTransactionLastResult(transaction);
  }
}
