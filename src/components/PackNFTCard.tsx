import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useDirectListings,
  useNFT,
} from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS, PACK_ADDRESS } from "../lib/constants";
import styles from "../styles/Card.module.css";

type Props = {
  contractAddress: string;
  tokenId: any;
};

export const PackNFTCard = ({ contractAddress, tokenId }: Props) => {
  const address = useAddress();

  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { contract: packContract } = useContract(contractAddress);
  const { data: packNFT, isLoading: loadingNFT } = useNFT(
    packContract,
    tokenId
  );

  const { data: packListings, isLoading: loadingPackListings } =
    useDirectListings(marketplace, {
      tokenContract: PACK_ADDRESS,
    });
  console.log("Pack Listings: ", packListings);

  async function buyPack() {
    let txResult;

    if (packListings?.[tokenId]) {
      txResult = await marketplace?.directListings.buyFromListing(
        packListings[tokenId].id,
        1
      );
    } else {
      throw new Error("No valid listing found");
    }

    return txResult;
  }

  return (
    <div className={styles.packCard}>
      <div className={styles.shopPack}>
        <div className="w-272 h-272 bg-gradient-to-b from-gray-100 via-gray-300 to-gray-100 rounded-md">
          <MediaRenderer
            src={packNFT?.metadata.image}
            width="100%"
            height="100%"
            className="rounded-md"
          />
        </div>
        <div className={styles.packInfo}>
          <h3 className="font-bold text-base">{packNFT?.metadata.name}</h3>
          <p className="font-bold text-xl">
            {packListings![tokenId].currencyValuePerToken.displayValue}{" "}
            {` ` + packListings![tokenId].currencyValuePerToken.symbol}
          </p>
          <p className="mb-0">Stock: {packListings![tokenId].quantity}</p>
          {!address ? (
            <button className={styles.LoginToBuyBtn}>Login to Buy</button>
          ) : (
            <Web3Button
              contractAddress={MARKETPLACE_ADDRESS}
              action={() => buyPack()}
              className={styles.buyPack}
            >
              Buy Pack
            </Web3Button>
          )}
        </div>
      </div>
    </div>
  );
};
