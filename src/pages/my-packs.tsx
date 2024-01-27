import { useState } from "react";
import Head from "next/head";
import {
  ThirdwebNftMedia,
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { PackRewards } from "@thirdweb-dev/react";
import { PACK_ADDRESS } from "../lib/constants";
import styles from "../styles/Card.module.css";
import FullWidthLayout from "@/src/components/LayoutFullWidth";
import GridLayout from "../components/LayoutGrid";
import { PackRewardCard } from "../components/PackRewardCard";
import { BigNumber } from "ethers";
import LoadingAnimation from "@/src/components/LoadingAnimation";

type Card = {
  tokenId: string | number | bigint | BigNumber;
  contractAddress: string;
  quantityPerReward: string | number | bigint | BigNumber;
};

export default function MyPacks() {
  const address = useAddress();

  const { contract } = useContract(PACK_ADDRESS, "pack");
  const { data, isLoading } = useOwnedNFTs(contract, address);

  const [openPackRewards, setOpenPackRewards] = useState<PackRewards>();

  async function openPack(packId: string) {
    const cardRewards = await contract?.open(parseInt(packId), 1);
    console.log(cardRewards);
    setOpenPackRewards(cardRewards);
  }

  return (
    <FullWidthLayout>
        <Head>
        <title>My Packs | Basketball Pick&apos;em Powered by TENAMINT</title>
      </Head>
      <GridLayout>
        <h1 className="text-5xl font-bold my-12">My Packs</h1>
        {!isLoading ? (
          <div className="grid grid-cols-3 gap-2">
            {data?.map((pack, index) => (
              <div key={index} className={styles.nftCard}>
                {/* <ThirdwebNftMedia
                  metadata={pack.metadata}
                  className="rounded-md"
                /> */}
                <div className="w-272 h-272 bg-gradient-to-b from-gray-100 via-gray-300 to-gray-100 rounded-md">
                    <MediaRenderer
                      src={pack?.metadata.image}
                      width="100%"
                      height="100%"
                      className="rounded-md"
                    />
                  </div>
                <div className={styles.myCardInfo}>
                  <h3 className="font-bold">{pack.metadata.name}</h3>
                  <p>Qty: {pack.quantityOwned}</p>
                </div>
                <Web3Button
                  contractAddress={PACK_ADDRESS}
                  action={() => openPack(pack.metadata.id)}
                  className={styles.saleButton}
                >
                  Open Pack
                </Web3Button>
              </div>
            ))}
          </div>
        ) : (
          <LoadingAnimation />
        )}
        {openPackRewards && openPackRewards.erc1155Rewards?.length && (
          <div className={styles.overlayContainer}>
            <h3 className="text-5xl font-bold my-12 text-volt">Pack Rewards</h3>
            <div className={styles.grid}>
              {openPackRewards.erc1155Rewards.map(
                (card: Card, index: number) => (
                  <PackRewardCard reward={card} key={index} />
                )
              )}
            </div>
          </div>
        )}
      </GridLayout>
    </FullWidthLayout>
  );
}
