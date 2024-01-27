import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseApp from "../lib/firebase/firebaseConfig";
import NearWallet from "@/src/components/NearWallet";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  TrophyIcon,
  BanknotesIcon,
  PlusCircleIcon,
  Square2StackIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const auth = getAuth(firebaseApp);

const UserNavigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: ChartPieIcon,
  },
  {
    name: "My Packs",
    href: "/my-packs",
    icon: Square2StackIcon,
  },
  {
    name: "My Card Collection",
    href: "/my-card-collection",
    icon: SquaresPlusIcon,
  },
  {
    name: "Payment",
    href: "/payment",
    icon: BanknotesIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Customer Support", href: "/help-support", icon: PhoneIcon },
];

const FirebaseAuthButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div>
      {user ? (
        <>
          <div className="flex justify-center items-center gap-10">
            <div>
              {/* <NearWallet /> */}
            </div>
            <div>
              <Popover className="relative">
                <Popover.Button className="">
                  <span className="relative inline-block">
                    <Image
                      className="h-12 w-12 rounded-full"
                      src="/images/profile-img.jpg"
                      width={124}
                      height={124}
                      alt="Profile image"
                    />
                    <span className="absolute right-0 top-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
                  </span>
                </Popover.Button>

                <Transition
                  // as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute right-0 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      <div className="text-center text-sm font-semibold mb-6">
                        Howdy, {user.email}
                      </div>
                      <span></span>
                      <span></span>

                      {UserNavigation.map((item) => (
                        <div
                          key={item.name}
                          className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50"
                        >
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <item.icon
                              className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="flex-auto">
                            <a
                              href={item.href}
                              className="block font-semibold text-gray-900"
                            >
                              {item.name}
                              <span className="absolute inset-0" />
                            </a>
                          </div>
                        </div>
                      ))}
                      {/* Logout */}
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                            />
                          </svg>
                        </div>
                        <div className="flex-auto">
                          <button
                            onClick={logout}
                            className="block font-semibold text-gray-900"
                          >
                            Logout
                            <span className="absolute inset-0" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Logout */}
                    <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                      {callsToAction.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                        >
                          <item.icon
                            className="h-5 w-5 flex-none text-gray-400"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </div>
          </div>
        </>
      ) : (
        <>
        <div className="flex gap-4">
        <NearWallet />
          <Link href="/login" passHref>
            <button className="firebaseAuth-btn-black text-sm">Log In</button>
          </Link>
          <Link href="/signin" passHref>
            <button className="firebaseAuth-btn text-sm">Sign Up</button>
          </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default FirebaseAuthButton;
