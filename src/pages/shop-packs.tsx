import Head from "next/head";
import { useContract, useDirectListings } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS, PACK_ADDRESS } from "../lib/constants";
import FullWidthLayout from "../components/LayoutFullWidth";
import GridLayout from "../components/LayoutGrid";
import { PackNFTCard } from "../components/PackNFTCard";
import LoadingAnimation from "../components/LoadingAnimation";

export default function Shop() {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: directListings, isLoading: loadingDirectListings } =
    useDirectListings(marketplace, {
      tokenContract: PACK_ADDRESS,
    });

  return (
    <FullWidthLayout>
        <Head>
        <title>Shop Packs | Basketball Pick&apos;em Powered by TENAMINT</title>
      </Head>
      <GridLayout>
        <h1 className="text-5xl font-bold my-12">Shop Packs</h1>
        {!loadingDirectListings ? (
          <div className="grid grid-cols-3 gap-2">
            {directListings?.map((listing, index) => (
              <div key={index}>
                <PackNFTCard
                  contractAddress={listing.assetContractAddress}
                  tokenId={listing.tokenId}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <LoadingAnimation />
          </div>
        )}
      </GridLayout>
    </FullWidthLayout>
  );
}
