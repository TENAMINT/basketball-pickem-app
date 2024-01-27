// FirebaseAuthForm.tsx
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
// Firebase auth
import firebaseApp from "../lib/firebase/firebaseConfig";
import {
  getAuth,
  User,
  signInWithPopup,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const modalStyles = {
  overlay: {
    className: "fixed inset-0 bg-gray-600 bg-opacity-50",
  },
  modal: {
    className: "bg-white px-6 pt-6 pb-12 rounded-lg shadow-lg w-96 mx-auto",
  },
  closeButton: {
    className: "absolute top-0 right-0 m-2",
  },
};

const firebaseAuth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const FirebaseAuthForm = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoginTab, setIsLoginTab] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  // const [currentUrl, setCurrentUrl] = useState("");
  const [emailLinkMessage, setEmailLinkMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const signInWithGoogle = async () => {
    try {
      // await signInWithPopup(firebaseAuth, googleProvider);
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const user = result.user;

      // Store user's email in Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, { email: user.email }, { merge: true });
    } catch (error) {
      console.error("Error signin with Google", error);
    }
  };

  // useEffect(() => {
  //   // This code now runs only on the client side
  //   setCurrentUrl(`${window.location.origin}${router.asPath}`);
  // }, [router]);

  const handleEmailLinkSignIn = async () => {
    try {
      const actionCodeSettings = {
        // url: "http://www.example.com/finishSignUp?cartId=1234",
        url: "/dashboard", // Current URL
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(firebaseAuth, email, actionCodeSettings);
      // Save the email locally so you can complete the sign-in process later
      window.localStorage.setItem("emailForSignIn", email);
      setEmailLinkMessage("Sign-in link sent! Check your email.");
      setError("");
    } catch (error) {
      console.error("Error sending sign-in link to email", error);
      setEmailLinkMessage("Failed to send sign-in link");
      setError("Failed to send sign-in link to email.");
    }
  };

  // Form to create user
  const handleCreateNewUser = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.error("Error signin link to email", error);
    }
  };

  //  Form to login
  const loginWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.error("Error login with email", error);
    }
  };

  const renderModalContent = () => (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleEmailLinkSignIn}>
        <input
          className="px-4 py-2 border border-gray-300 rounded w-full"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <button
          type="submit"
          className="mt-6 flex w-full justify-center rounded-md bg-volt px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );

  return (
    <>
      {error && <p className="error-message">{error}</p>}
      <div className="mt-10">
        <div className="mt-6">
          <button
            onClick={signInWithGoogle}
            className="flex w-full items-center justify-center gap-3 rounded-md bg-black px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
          >
            <span className="text-sm font-semibold leading-6">
              Sign in with Google
            </span>
          </button>
          <button
            type="submit"
            onClick={() => setModalOpen(true)}
            className="mt-6 flex w-full justify-center rounded-md bg-volt px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Sign in through email link
          </button>
          {emailLinkMessage && (
            <div className="message">{emailLinkMessage}</div>
          )}
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            center
            classNames={{
              overlay: modalStyles.overlay.className,
              modal: modalStyles.modal.className,
              closeButton: modalStyles.closeButton.className,
            }}
          >
            <h2 className="text-lg font-semibold text-center my-6">
              Email Link
            </h2>
            <p className="text-xs">
              Enter the email you would like to send the email link to
            </p>
            {renderModalContent()}
          </Modal>
        </div>

        <div className="mt-10">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-white px-6 text-gray-900">
                Or continue with
              </span>
            </div>
          </div>

          {/* Form Here */}
        </div>
      </div>
    </>
  );
};

export default FirebaseAuthForm;
