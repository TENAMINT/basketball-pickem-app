import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";
import styles from "../styles/Header.module.css";
import Web3AuthButton from "./Web3AuthButton";
import FirebaseAuthButton from "./FirebaseAuthButton";

const navigation = [
  { name: "Join Discord", href: "https://discord.com/invite/FKkGzHjsJn" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Schedule", href: "/schedule" },
  { name: "About", href: "/about" },
];

const SignedInNavigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Profile", href: "/dashboard/profile" },
  { name: "My Packs", href: "/dashboard/my-packs" },
  { name: "My Card Collection", href: "/dashboard/my-card-collection" },
  { name: "Leader Board", href: "/dashboard/leader-board" },
  { name: "Upcoming Games", href: "/dashboard/upcoming-games" },
  { name: "Payment", href: "/dashboard/payment" },
  { name: "Help & Customer Support", href: "/help-support" },
];

export default function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const address = useAddress();
  const disconnect = useDisconnect();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  function disconnectWallet() {
    disconnect();
    setIsProfileDropdownOpen(false);
  }

  return (
    <header className="backdrop-blur-xl bg-white/70 shadow-md sticky top-0 z-10">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Basketball Pick&apos;em Powered by TENAMINT</span>
            <Image
              src="/images/basketball-logo.png"
              width={64}
              height={64}
              alt="logo"
              priority={true}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div>
            <FirebaseAuthButton />
          </div>
          {isProfileDropdownOpen && (
            <div className={styles.profileDropdown}>
              {SignedInNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sky-500 text-base block mb-4"
                >
                  {item.name}
                </Link>
              ))}
              <button
                className="px-4 py-2 rounded-md bg-black text-white mt-8"
                onClick={disconnectWallet}
              >
                <span>&nbsp;&nbsp;Logout&nbsp;&nbsp;</span>
              </button>
            </div>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Basketball Pick&apos;em Powered by TENAMINT</span>
              <Image
              src="/images/basketball-logo.png"
              width={124}
              height={60}
              alt="logo"
              priority={true}
            />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
