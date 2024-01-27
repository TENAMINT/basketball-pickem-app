import Head from "next/head";
import Image from "next/image";
import { useContract, useValidDirectListings } from "@thirdweb-dev/react";
import { CARD_ADDRESS, MARKETPLACE_ADDRESS } from "../lib/constants";
import FullWidthLayout from "../components/LayoutFullWidth";
import GridLayout from "../components/LayoutGrid";
import NFTCard from "../components/NFTCard";
import LoadingAnimation from "../components/LoadingAnimation";

export default function Marketplace() {
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { data: directListings, isLoading: loadingDirectListings } =
    useValidDirectListings(marketplace, {
      tokenContract: CARD_ADDRESS,
    });

  return (
    <FullWidthLayout>
        <Head>
        <title>Marketplace | Basketball Pick&apos;em Powered by TENAMINT</title>
      </Head>
      <GridLayout>
        <h1 className="text-5xl font-bold my-12 text-center">Marketplace</h1>
        {!loadingDirectListings ? (
          <div className="grid grid-cols-3 gap-2">
            {directListings?.map((listing, index) => (
              <div key={index}>
                <NFTCard tokenID={listing.asset.id} listingID={listing.id} />
              </div>
            ))}
          </div>
        ) : (
          <LoadingAnimation />
        )}
      </GridLayout>
    </FullWidthLayout>
  );
}
