import React, { useState, useEffect, ChangeEvent } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseApp from "../lib/firebase/firebaseConfig";
import { storage, db } from "../lib/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { updateEmail } from "firebase/auth";

import FullWidthLayout from "@/src/components/LayoutFullWidth";
import GridLayout from "../components/LayoutGrid";

const firebaseAuth = getAuth(firebaseApp);

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [userProfileImageUrl, setUserProfileImageUrl] = useState(
    "/images/profile-img.jpg"
  ); // Default image URL
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleChangeEmail = async () => {
    if (user && newEmail) {
      try {
        await updateEmail(user, newEmail);
        alert("Email updated successfully");
        // Optionally, you might want to update the user's email in your Firestore database as well
      } catch (error) {
        console.error("Error updating email: ", error);
        // Handle the error appropriately
      }
    } else {
      // Handle the case where the new email is empty or the user is not logged in
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]); // Now correctly typed as File
      setUserProfileImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const uploadImage = async () => {
    if (selectedImage && user) {
      try {
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(storageRef, selectedImage);
        const downloadURL = await getDownloadURL(storageRef);
        updateUserProfileImage(downloadURL);
      } catch (error) {
        console.error("Error uploading image: ", error);
        // Handle the error (e.g., show a notification to the user)
      }
    }
  };

  const updateUserProfileImage = async (imageUrl: string) => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        profileImageUrl: imageUrl,
      });
      setUserProfileImageUrl(imageUrl);
    } else {
      // Handle the scenario when 'user' is null
      // For example, you might want to show an error message or redirect to a login page
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
            <div>
              <h1 className="text-5xl font-bold my-12">Settings</h1>
            </div>
            <div className="px-1 mt-10">
              <h2 className="text-4xl font-bold mb-10 text-center uppercase">
                Profile
              </h2>
              <div className="bg-gray-100 rounded-xl flex flex-col justify-center items-center">
                <div className="grid grid-cols-2 gap-10">
                  <div className="flex justify-center items-center">
                    <div>
                      <p className="font-bold text-4xl mb-8">User Info</p>
                      <p className="font-bold text-base">
                        User name: {user?.email || "Not logged in"}
                      </p>
                      <input
                        type="email"
                        placeholder="Enter new user name"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                      />
                      <button className="ml-2 text-sm text-white font-semibold bg-sky-600 rounded-md px-4 py-2" onClick={handleChangeEmail}>Change User Name</button>
                      <p className="font-bold text-base mt-8">
                        Email address: {user?.email || "Not logged in"}
                      </p>
                      <div>
                        <input
                          type="email"
                          placeholder="Enter new email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <button className="ml-2 text-sm text-white font-semibold bg-sky-600 rounded-md px-4 py-2" onClick={handleChangeEmail}>
                          Change Email
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mb-12">
                    <Image
                      className="rounded-full m-6"
                      src={userProfileImageUrl || "/images/profile-img.jpg"}
                      width={240}
                      height={240}
                      alt="Profile image"
                    />
                    <div className="">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="w-1/2"
                    />
                    <button className="ml-2 text-sm text-white font-semibold bg-sky-600 rounded-md px-4 py-2" onClick={uploadImage}>Update Profile Image</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-32 mx-auto max-w-xl">
              <h1 className="text-3xl font-bold my-12 text-center">
                Let&apos;s set up your dashboard account
              </h1>
              <Link href="/signin" passHref>
                <button className="firebaseAuth-btn">Sign Up / Log In</button>
              </Link>
            </div>
          </>
        )}
      </GridLayout>
    </FullWidthLayout>
  );
}
