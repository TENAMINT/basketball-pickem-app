import { useState } from "react";
import Head from "next/head";
import {
  MediaRenderer,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import { CARD_ADDRESS } from "../lib/constants";
import styles from "../styles/Card.module.css";
import FullWidthLayout from "@/src/components/LayoutFullWidth";
import GridLayout from "../components/LayoutGrid";
import { ListingInfo } from "../components/ListingInfo";
import LoadingAnimation from "@/src/components/LoadingAnimation";

export default function MyCards() {
  const address = useAddress();

  const { contract: nftCollection, isLoading: loadingNFTCollection } =
    useContract(CARD_ADDRESS, "edition");

  const { data: nfts, isLoading: loadingNFTs } = useOwnedNFTs(
    nftCollection,
    address
  );
  console.log(nfts);

  const [selectedNFT, setSelectedNFT] = useState<NFTType>();

  return (
    <FullWidthLayout>
        <Head>
        <title>My Card Collection | Basketball Pick&apos;em Powered by TENAMINT</title>
      </Head>
      <GridLayout>
        <h1 className="text-5xl font-bold my-12">My Card Collection</h1>
        {!selectedNFT ? (
          !loadingNFTCollection && !loadingNFTs ? (
            <div className="grid grid-cols-3 gap-2">
              {nfts?.map((nft, index) => (
                <div key={index} className={styles.nftCard}>
                  {/* <ThirdwebNftMedia metadata={nft.metadata} /> */}
                  <div className="w-272 h-272 bg-gradient-to-b from-gray-100 via-gray-300 to-gray-100 rounded-md">
                    <MediaRenderer
                      src={nft?.metadata.image}
                      width="100%"
                      height="100%"
                      className="rounded-md"
                    />
                  </div>
                  <div className={styles.myCardInfo}>
                    <h3 className="font-bold">{nft.metadata.name}</h3>
                    <p>Qty: {nft.quantityOwned}</p>
                  </div>
                  <button
                    onClick={() => setSelectedNFT(nft)}
                    className={styles.saleButton}
                  >
                    Sell Card
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <LoadingAnimation />
          )
        ) : (
          <div className={styles.saleCard}>
            <div>
              <button onClick={() => setSelectedNFT(undefined)}>Back</button>
              <br />
              <ThirdwebNftMedia metadata={selectedNFT.metadata} />
            </div>
            <div>
              <p>List card for sale</p>
              <ListingInfo nft={selectedNFT} />
            </div>
          </div>
        )}
      </GridLayout>
    </FullWidthLayout>
  );
}
