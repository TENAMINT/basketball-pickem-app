import Head from "next/head";
import FullWidthLayout from "../components/LayoutFullWidth";
import GridLayout from "../components/LayoutGrid";
import HomeHeroVideoHeader from "../components/HomeHeroVideoHeader";
import FeaturedLogos from "../components/FeaturedLogos";
import CradPackCTA from "../components/CardPacksCTA";
import LeaderboardList from "../components/LeaderboardList";
import GameSchedule from "../components/GameSchedule";
import PartnerLogos from "../components/PartnerLogos";

export default function Home() {
  return (
    <>
      <FullWidthLayout>
        <Head>
          <title>Basketball Pick&apos;em Powered by TENAMINT</title>
        </Head>
        <HomeHeroVideoHeader />
        <GridLayout>
          <PartnerLogos />
          <hr />
          <CradPackCTA />
          <LeaderboardList />
          <GameSchedule />
          <FeaturedLogos />
        </GridLayout>
      </FullWidthLayout>
    </>
  );
}
