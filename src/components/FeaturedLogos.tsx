import Image from "next/image";

function FeaturedLogos() {
  return (
    <div>
      <p className="mt-12 text-center font-bold">Powered by</p>
      <div className="flex mx-auto justify-center mb-0 gap-10">
        <Image
          src="/images/logo-black.png"
          className="object-contain"
          width={160}
          height={160}
          alt="Logo"
        />
        <Image
          src="/images/near-protocol-near-seeklogo.com.svg"
          className="object-contain"
          width={160}
          height={160}
          alt="Logo"
        />
        <Image
          src="/images/mintbase-logo-web.png"
          className="object-contain"
          width={160}
          height={160}
          alt="Logo"
        />
      </div>
    </div>
  );
}

export default FeaturedLogos;
