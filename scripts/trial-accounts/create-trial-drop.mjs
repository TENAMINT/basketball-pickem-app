// create-trial-drop.mjs
import { initKeypom, createTrialAccountDrop } from '@keypom/core';
import { UnencryptedFileSystemKeyStore } from "@near-js/keystores-node";
import { Account } from '@near-js/accounts';
import { Near } from "@near-js/wallet-account";
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import dotenv from 'dotenv';

dotenv.config();

const funderAccountId = 'shunsukekano.testnet';
const NETWORK_ID = 'testnet';
async function createTrialAccount() {
	// Initiate connection to the NEAR blockchain.
    const CREDENTIALS_DIR = path.join(os.homedir(), '.near-credentials');
    console.log("Path: " + CREDENTIALS_DIR);

    let myKeyStore = new UnencryptedFileSystemKeyStore(CREDENTIALS_DIR);  

    console.log("Keys: " + myKeyStore);

    let nearConfig = {
        networkId: NETWORK_ID,
        keyStore: myKeyStore,
        nodeUrl: `https://rpc.${NETWORK_ID}.near.org`,
        walletUrl: `https://wallet.${NETWORK_ID}.near.org`,
        helperUrl: `https://helper.${NETWORK_ID}.near.org`,
        explorerUrl: `https://explorer.${NETWORK_ID}.near.org`,
    };  

    let near = new Near(nearConfig);
    let fundingAccount = new Account(near.connection, funderAccountId);

	// Initialize the SDK and point it to the custom NEAR object that was created.
    await initKeypom({
		near,
		network: NETWORK_ID
	});

	// What contracts can the trial account call?
    const callableContracts = [
        'guest-book.examples.keypom.testnet',
        'v1.social08.testnet'
    ]
    // What is the maximum amount of $NEAR that can be attached to a call for each callable contract?
    const maxAttachableNEARPerContract = [
        '1',
        '1'
    ]
	// What methods can the trial account call?
	const callableMethods = [
		['*'],
        ['*']
	]

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const wasmDirectory = path.resolve(__dirname, '..', 'trial-accounts', 'ext-wasm', 'trial-accounts.wasm');
    const {keys} = await createTrialAccountDrop({
		account: fundingAccount,
        numKeys: 1,
        contractBytes: [...readFileSync(wasmDirectory)],
		// How much $NEAR should be made available to the trial account when it's created?
        startingBalanceNEAR: 2.5,
        callableContracts,
        callableMethods,
        maxAttachableNEARPerContract,
		// Once the trial account has spent this much $NEAR, the trial will be over.
        trialEndFloorNEAR: 1.25
    })  

    

    const guestBookInstance = "http://localhost:3000/keypom/trial-url#"
    const keypomContractId = "v2.keypom.testnet"
    const delimiter = "/"
    const secretKey = keys.secretKeys[0]

    const alphaInstance = "https://bal-near-app.vercel.app/keypom/#trial-url/"

    console.log(`
    
    Guest-Book App:
 	${guestBookInstance}${keypomContractId}${delimiter}${secretKey}
    
    Alpha:
 	${alphaInstance}${keypomContractId}${delimiter}${secretKey}

 	Good Luck!
    `)
}

createTrialAccount();