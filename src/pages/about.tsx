import Head from "next/head";
import FullWidthLayout from "../components/LayoutFullWidth";
import GridLayout from "../components/LayoutGrid";
import styles from "../styles/Home.module.css";
import AboutHeroVideoHeader from "../components/AboutHeroVideoHeader";

export default function AboutPage() {
  return (
    <FullWidthLayout>
      <Head>
        <title>About Us | Basketball Pick&apos;em Powered by TENAMINT</title>
      </Head>
      <AboutHeroVideoHeader />
      <GridLayout>
        <div className="px-8">
          <h1 className="text-5xl font-bold my-12">About</h1>
          <p className="mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button
              className={styles.ctaButton}
              onClick={() => (window.location.href = "https://tenamint.com/")}
            >
              View Official Website
            </button>
        </div>
      </GridLayout>
    </FullWidthLayout>
  );
}
