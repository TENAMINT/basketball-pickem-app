import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useDirectListing,
  useNFT,
} from "@thirdweb-dev/react";
import { CARD_ADDRESS, MARKETPLACE_ADDRESS } from "../lib/constants";
import styles from "../styles/Card.module.css";

type Props = {
  tokenID: string;
  listingID: string;
};

export default function NFTCard({ tokenID, listingID }: Props) {
  const address = useAddress();

  const { contract: cardContract } = useContract(CARD_ADDRESS, "edition");
  const { data: nft } = useNFT(cardContract, tokenID);

  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { data: listing, isLoading: loadingListing } = useDirectListing(
    marketplace,
    listingID
  );
  console.log(listing);

  async function buyNFT() {
    let txResult;

    if (listing) {
      txResult = await marketplace?.directListings.buyFromListing(
        listing.id,
        1
      );
    } else {
      throw new Error("No valid listing found");
    }

    return txResult;
  }

  return (
    <div className={styles.nftCard}>
      <div className="w-272 h-272 bg-gradient-to-b from-gray-100 via-gray-300 to-gray-100 rounded-md mb-4">
        <MediaRenderer src={nft?.metadata?.image} width="100%" height="100%" />
      </div>
      <h3 className={styles.cardName}>{nft?.metadata?.name}</h3>
      <p className="font-bold text-xl">
        {listing?.currencyValuePerToken.displayValue}{" "}
        {` ${listing?.currencyValuePerToken.symbol}`}
      </p>
      
      {!address ? (
        <button className={styles.LoginToBuyBtn}>Login to Buy</button>
      ) : (
        <Web3Button
          contractAddress={MARKETPLACE_ADDRESS}
          action={() => buyNFT()}
          className={styles.buyButton}
        >
          Buy Now
        </Web3Button>
      )}
    </div>
  );
}
