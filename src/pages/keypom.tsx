import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import KeypomComponent from "../components/keypom/KeypomComponent";

// NEAR | Keypom
import React, { useState, useEffect } from "react";
import { GuestBook } from "../lib/key-pom/near-interface";
import { Wallet } from "../lib/key-pom/near-wallet";

// Get contract name from environment variable
const contractName = "guest-book.examples.keypom.testnet";
if (typeof contractName !== "string") {
  throw new Error("KEYPOM_CONTRACT_NAME environment variable is not defined");
}

// Initialize wallet and guestBook
const wallet = new Wallet({ createAccessKeyFor: contractName as any });
const guestBook = new GuestBook({
  contractId: contractName,
  walletToUse: wallet,
});

export default function KeypomPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    async function checkSignIn() {
      const signedIn = await wallet.startUp();
      setIsSignedIn(signedIn);
    }

    checkSignIn();
  }, []);

  return (
    <>
      <Head>
        <title>Sign In Basketball Pick&apos;em Powered by TENAMINT</title>
      </Head>
      <main>
        <div className="flex min-h-screen flex-1">
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                {/* <img
                  className="h-10 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                /> */}
                <Link href="/" className="">
                  <span className="sr-only">
                    Basketball Pick&apos;em Powered by TENAMINT
                  </span>
                  <Image
                    src="/images/basketball-logo.png"
                    width={164}
                    height={28}
                    alt="logo"
                    className="mx-auto"
                  />
                </Link>
                <h2 className="mt-8 text-xl font-bold leading-9 tracking-tight text-gray-900">
                  {/* Sign up / Log in to your account */}
                  {/* Select how you would like to continue */}
                  Keypom Trial Account
                </h2>
              </div>
              <KeypomComponent
                isSignedIn={isSignedIn}
                guestBook={guestBook}
                wallet={wallet}
              />
            </div>
          </div>
          <div className="relative hidden w-0 flex-1 lg:block">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="/images/background.jpg"
              alt="Background Image"
            />
          </div>
        </div>
      </main>
    </>
  );
}
