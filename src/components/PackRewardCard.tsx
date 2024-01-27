import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { CARD_ADDRESS } from "../lib/constants";
import styles from "../styles/Card.module.css";

type Props = {
  reward: {
    tokenId: string | number | bigint | BigNumber;
    contractAddress: string;
    quantityPerReward: string | number | bigint | BigNumber;
  };
};

export const PackRewardCard = ({ reward }: Props) => {
  const { contract } = useContract(CARD_ADDRESS, "edition");
  const { data } = useNFT(contract, reward.tokenId);

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {data && (
          <div className={styles.nftCard}>
            <div className="w-272 h-272 bg-gradient-to-b from-gray-100 via-gray-300 to-gray-100 rounded-md">
              <ThirdwebNftMedia
                metadata={data.metadata}
                height="100%"
                width="100%"
              />
            </div>
            <h3 className="font-bold mt-4">{data.metadata.name}</h3>
          </div>
        )}
      </div>
    </div>
  );
};
