import React, { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import LogoutIcon from "./LogoutIcon";
import NearWallet from "./NearWallet";

const SignedInNavigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Profile", href: "/dashboard/profile" },
  { name: "My Packs", href: "/dashboard/my-packs" },
  { name: "My Card Collection", href: "/dashboard/my-card-collection" },
  { name: "Leader Board", href: "/dashboard/leader-board" },
  { name: "Upcoming Games", href: "/dashboard/upcoming-games" },
  { name: "Payment", href: "/dashboard/payment" },
  { name: "Help & Customer Support", href: "/help-support" },
];

const Web3AuthButton: React.FC = () => {
  // Define the state with a specific type
  const [web3auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initWeb3Auth = async () => {
      const web3AuthInstance = new Web3Auth({
        clientId:
          "BFE1ykvfkvIcYuxdTKuSjx5oOD8XtrGngGSYEOPlhl7-MxIJKKUjcEwAfY2aAjTYOzijduVxN4j8uM2WWjVlOXs", // get it from Web3Auth Dashboard
        web3AuthNetwork: "sapphire_devnet", // "testnet" or "mainnet, "sapphire_mainnet", "aqua"
        chainConfig: {
          chainId: "0x1", // Needs to review
          chainNamespace: "other", // for all non EVM and SOLANA chains, use "other"
          rpcTarget: "https://rpc.testnet.near.org",
          displayName: "Near",
          blockExplorer: "https://explorer.testnet.near.org",
          ticker: "NEAR",
          tickerName: "NEAR",
        },
      });

      await web3AuthInstance.initModal();
      setWeb3Auth(web3AuthInstance);

      // Automatically connect when the component mounts
      try {
        await web3AuthInstance.connect();
        setIsLoggedIn(true);
        console.log("Successfully connected");
      } catch (error) {
        console.error(error);
      }
    };

    initWeb3Auth();
  }, []);

  const login = async () => {
    if (web3auth) {
      try {
        await web3auth.connect();
        console.log("Successfully connected");
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const loggedin = async () => {
    if (web3auth) {
      try {
        const user = await web3auth.getUserInfo();
        console.log("User info:", user);
        console.log("User is already logged in.");
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
  };

  const logout = async () => {
    if (web3auth) {
      try {
        await web3auth.logout();
        setIsLoggedIn(false);
        console.log("Successfully disconnected");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <button onClick={login} className="web3auth-btn">
          Login with Web3Auth
        </button>
      ) : (
        <div className="flex gap-6">
          <button onClick={loggedin} className="web3auth-btn">
            Logged In
          </button>
          <NearWallet />
          <button onClick={logout} className="">
            {/* Logout Icon */}
            <svg
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
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Web3AuthButton;
