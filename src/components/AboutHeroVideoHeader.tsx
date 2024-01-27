import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function AboutHeroVideoHeader() {
  return (
    <>
      <div className={styles.videoContainer}>
        <video autoPlay loop muted className={styles.heroVideo}>
          <source src="/videos/about-hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.heroPage}>
          <div className={styles.heroSection}>
            {/* Your Image, Text, and CTA Button */}
            <Image
              src="/images/logo-white-2.png"
              width="320"
              height="40"
              alt="Basketball logo"
              className="mx-auto object-contain"
            />
            <h1 className="text-5xl font-bold mt-6 mb-3 text-white">
            BUILDING THE FUTURE, <span className="text-volt">NOW</span>.
            </h1>
            {/* <p className="text-white">
              Pick your winning teams and win cash prizes
              <br />
              and other Basketball exclusive perks!
            </p>
            <button
              className={styles.heroButton}
              onClick={() => (window.location.href = "/shop-packs")}
            >
              Play for FREE
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
