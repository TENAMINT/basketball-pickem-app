import Head from "next/head";
import Image from "next/image";
import { useContract, useValidDirectListings } from "@thirdweb-dev/react";
import { CARD_ADDRESS, MARKETPLACE_ADDRESS } from "../lib/constants";
import FullWidthLayout from "../components/LayoutFullWidth";
import GridLayout from "../components/LayoutGrid";
import NFTCard from "../components/NFTCard";
import LoadingAnimation from "../components/LoadingAnimation";

import { ESize, EState, MbButton } from "mintbase-ui";
import Items from "../components/Items";
import { useState } from "react";
import { SelectedNft } from "../types/types";
import BuyModal from "../components/BuyModal/BuyModal";

export default function Marketplace() {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({} as SelectedNft);

  const handleOpenBuyModal = (item: SelectedNft) => {
    setSelectedItem(item);
    setShowBuyModal(true);
  };

  const handleCloseBuyModal = () => {
    setSelectedItem({} as SelectedNft);
    setShowBuyModal(false);
  };

  return (
    <FullWidthLayout>
        <Head>
        <title>Marketplace | Basketball Pick&apos;em Powered by TENAMINT</title>
      </Head>
      <GridLayout>
      <div className="w-full flex flex-col items-start gap-4">
      <h1 className="text-5xl font-bold mt-12 text-center">Marketplace</h1>
      <p className="">Powered by Mintbase</p>
      <div>
        {/* <p>
          1. Make sure to change the env NEXT_PUBLIC_AFFILIATE_ACCOUNT to your
          own NEAR account
        </p>
        <p>2. On purchase, see your account pop up on the leaderboard</p>
        <p>3. Check your wallet balance to see funds go up!</p> */}
        <div className="mt-4 flex">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://mintbase.xyz/leaderboard"
          >
            <MbButton
              label="See Leaderboard"
              size={ESize.MEDIUM}
              state={EState.ACTIVE}
            />
          </a>
        </div>
      </div>
      <div className="flex w-full">
        <Items showModal={handleOpenBuyModal} />
      </div>
      <div className="mx-24 mt-4">
        {!!showBuyModal && (
          <BuyModal closeModal={handleCloseBuyModal} item={selectedItem} />
        )}
      </div>
    </div>
      </GridLayout>
    </FullWidthLayout>
  );
}
