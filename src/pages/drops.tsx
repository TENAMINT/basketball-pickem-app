import Head from "next/head";
import FullWidthLayout from "../components/LayoutFullWidth";
import GridLayout from "../components/LayoutGrid";

export default function DropsPage() {
  return (
    <FullWidthLayout>
        <Head>
        <title>Drops | Basketball Pick&apos;em Powered by TENAMINT</title>
      </Head>
      <GridLayout>
        <div className="px-8">
          <h1 className="text-5xl font-bold my-12">Drops</h1>
        </div>
      </GridLayout>
    </FullWidthLayout>
  );
}
