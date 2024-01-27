import React, { useState, useEffect, ChangeEvent } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import firebaseApp from "../lib/firebase/firebaseConfig";
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { storage, db } from "../lib/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import FullWidthLayout from "@/src/components/LayoutFullWidth";
import GridLayout from "../components/LayoutGrid";
import MyPickEm from "../components/MyPickEm";
import TheNumbers from "../components/TheNumbers";
import LeaderboardList from "../components/LeaderboardList";
import GameSchedule from "../components/GameSchedule";

const firebaseAuth = getAuth(firebaseApp);

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState(""); // State to store the user's name
  const [userProfileImageUrl, setUserProfileImageUrl] = useState(
    "/images/profile-img.jpg"
  ); // Default image URL

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          // Fetch user data from Firestore
          try {
            const userDocRef = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUserName(userData.username); // Update state with username
              setUserProfileImageUrl(
                userData.profileImageUrl || "/images/profile-img.jpg"
              ); // Update state with profile image URL
            } else {
              console.log("No such document in Firestore!");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(firebaseAuth);
      // Handle sign-out success
    } catch (error) {
      // Handle sign-out errors
    }
  };

  return (
    <FullWidthLayout>
      <Head>
        <title>Dashboard | Basketball Pick&apos;em Powered by TENAMINT</title>
      </Head>
      <GridLayout>
        {user ? (
          <>
            <div
              className="relative h-[240px] rounded-xl"
              style={{
                backgroundImage: "url(/images/background.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-80 text-white transition duration-300 ease-in-out rounded-xl flex flex-col justify-center items-center">
                <h1 className="text-5xl font-bold my-12">Dashboard</h1>
              </div>
            </div>
            <div className="px-1 mt-10">
              <h2 className="text-4xl font-bold mb-10 text-center uppercase">
                Profile
              </h2>
              <div className="outline outline-4 outline-blackx transition duration-300 ease-in-out rounded-t-xl flex flex-col justify-center items-center">
                <div className="grid grid-cols-2 gap-10">
                  <div className="flex justify-center items-center">
                    <div>
                      <p className="font-bold text-4xl mb-8">User Info</p>
                      <p className="font-bold text-base">
                        User name: {userName || "Unnamed"}
                      </p>
                      <p className="font-bold text-base">
                        Email address: {user?.email || "Not logged in"}
                      </p>
                      <Link
                        href="/settings/"
                        className="text-right font-semibold text-sky-600 pt-6"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 inline-block mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                        Edit
                      </Link>
                    </div>
                  </div>
                  <div>
                    <Image
                      className="rounded-full m-6 mx-auto block"
                      src={userProfileImageUrl}
                      width={240}
                      height={240}
                      alt="Profile image"
                    />
                  </div>
                </div>
              </div>
            </div>
            <TheNumbers />
            <MyPickEm />

            <LeaderboardList />
            <GameSchedule />
            <button
              className="bg-black text-white font-semibold px-8 py-4 rounded-xl mx-auto block"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <div className="mt-32 mx-auto max-w-xl">
              <h1 className="text-3xl font-bold my-12 text-center">
                Let&apos;s set up your dashboard account
              </h1>
              <div className="grid gap-10">
                <Link href="/signin" passHref>
                  <button className="firebaseAuth-btn text-sm">Sign Up</button>
                </Link>
                <Link href="/login" passHref>
                  <button className="firebaseAuth-btn-black text-sm">
                    Log In
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </GridLayout>
    </FullWidthLayout>
  );
}
