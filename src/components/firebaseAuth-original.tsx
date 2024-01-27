import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import firebaseApp from "../lib/firebase/firebaseConfig";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import NearWallet from "@/src/components/NearWallet";

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

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      // Handle the signed-in user info.
    })
    .catch((error) => {
      // Handle errors.
    });
};

const signUpWithEmail = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      // Handle new user info.
    })
    .catch((error) => {
      // Handle errors for sign up.
    });
};

const loginWithEmail = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      // Handle the signed-in user info.
    })
    .catch((error) => {
      // Handle errors.
    });
};

const FirebaseAuth = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginTab, setIsLoginTab] = useState(true); // true for login, false for sign up

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

  const renderModalContent = () => (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center gap-4 w-">
        <button
          className={`px-4 py-2 ${
            !isLoginTab ? "bg-transparent" : "bg-gray-300"
          } focus:outline-none`}
          onClick={() => setIsLoginTab(true)}
        >
          Sign Up
        </button>
        <button
          className={`px-4 py-2 ${
            isLoginTab ? "bg-transparent" : "bg-gray-300"
          } focus:outline-none`}
          onClick={() => setIsLoginTab(false)}
        >
          Login
        </button>
      </div>
      <input
        className="px-4 py-2 border border-gray-300 rounded"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="px-4 py-2 border border-gray-300 rounded"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {isLoginTab ? (
        <>
          <button
            onClick={() => signUpWithEmail(email, password)}
            className="px-4 py-2 bg-volt rounded font-semibold text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 inline-block mr-2"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
            Sign Up
          </button>
          <hr className="mt-4"/>
          <button
            onClick={signInWithGoogle}
            className="mt-4 px-4 py-2 bg-volt rounded font-semibold text-sm"
          >
            Sign Up with Google
          </button>
        </>
      ) : (
        <>
          {" "}
          <button
            onClick={() => loginWithEmail(email, password)}
            className="px-4 py-2 bg-volt rounded font-semibold text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 inline-block mr-2"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
            Login
          </button>
          <hr className="mt-4"/>
          <button
            onClick={signInWithGoogle}
            className="mt-4 px-4 py-2 bg-volt rounded font-semibold text-sm"
          >
            Login with Google
          </button>
        </>
      )}
    </div>
  );

  return (
    <div>
      {user ? (
        <>
          <div className="flex justify-center items-center gap-6">
            <div className="">
              <button className="font-bold">
                Signed In as User
                {/* {user.email} */}
              </button>
            </div>
            <div>
              <NearWallet />
            </div>
            <div>
              <button onClick={logout} className="">
                {/* Logout Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 mt-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setModalOpen(true)}
            className="firebaseAuth-btn"
          >
            Sign Up / Log In
          </button>
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
            <h2 className="text-lg font-semibold text-center my-6">Authentication</h2>
            {renderModalContent()}
          </Modal>
        </>
      )}
    </div>
  );
};

export default FirebaseAuth;
