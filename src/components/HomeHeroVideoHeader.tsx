import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function HomeHeroVideoHeader() {
  return (
    <>
      <div className={styles.videoContainer}>
        {/* Replace video with image */}
        <Image
          src="/images/background.jpg"
          layout="fill"
          objectFit="cover"
          alt="Background"
          className={styles.heroImage}
        />

        <div className={styles.heroPage}>
          <div className={styles.heroSection}>
            {/* Your Image, Text, and CTA Button */}
            
            <h1 className="text-5xl font-bold mt-6 mb-3 text-white">
              Join the action
            </h1>
            <p className="text-white">
              Pick your winning teams and win cash prizes
              <br />
              and other Basketball exclusive perks!
            </p>
            <button
              className={styles.heroButton}
              onClick={() => (window.location.href = "/shop-packs")}
            >
              Play for FREE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
