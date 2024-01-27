import Image from "next/image";

function PartnerLogos() {
  return (
    <div>
      <p className="mt-6 text-center font-bold">Our Partners</p>
      <div className="flex mx-auto justify-center gap-10 mb-6">
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

export default PartnerLogos;
