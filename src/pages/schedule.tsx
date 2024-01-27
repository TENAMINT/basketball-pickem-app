import Head from "next/head";
import FullWidthLayout from "../components/LayoutFullWidth";
import GridLayout from "../components/LayoutGrid";
import GameSchedule from "../components/GameSchedule";

export default function HowToGuide() {
  return (
    <FullWidthLayout>
        <Head>
        <title>How to Guide | Basketball Pick&apos;em Powered by TENAMINT</title>
      </Head>
      <GridLayout>
        <div className="px-8">
          <h1 className="text-5xl font-bold my-12 text-center">Game Schedule</h1>
          <GameSchedule />
        </div>
      </GridLayout>
    </FullWidthLayout>
  );
}
