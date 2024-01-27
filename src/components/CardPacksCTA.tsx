import Image from "next/image";
import Link from "next/link";

export default function CradPacksCTA() {
  return (
    <div className="mt-16">
      <Link href="/shop-packs">
      <div className="outline outline-4 outline-black hover:bg-black hover:text-white transition duration-300 ease-in-out rounded-xl flex flex-col justify-center items-center h-[160px]">
        <p className="text-center font-bold text-2xl mb-4 mt-4">Boot your reward with</p>
        <p className="text-center font-bold text-4xl uppercase">Racks Packs</p>
        <p className="text-center font-bold text-2xl">Coming Soon...</p>
      </div>
      </Link>
    </div>
  );
}
