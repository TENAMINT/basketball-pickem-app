import Head from "next/head";
import FullWidthLayout from "@/src/components/LayoutFullWidth";
import GridLayout from "../components/LayoutGrid";
import GameSchedule from "@/src/components/GameSchedule";

export default function Payment() {
  return (
    <FullWidthLayout>
        <Head>
        <title>Payment | Basketball Pick&apos;em Powered by TENAMINT</title>
      </Head>
      <GridLayout>
        <div className="px-8">
          <h1 className="text-5xl font-bold my-12">Payment</h1>
          {/* <GameSchedule /> */}
        </div>
      </GridLayout>
    </FullWidthLayout>
  );
}
