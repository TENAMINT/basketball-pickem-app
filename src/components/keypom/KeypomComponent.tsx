import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import KeypomForm from "./KeypomForm";
import Messages from "./Messages";

// Define an interface for guestBook and wallet if needed
interface GuestBook {
  getMessages: () => Promise<any[]>;
  addMessage: (message: string, donation: string) => Promise<void>;
}

interface Wallet {
  signIn: () => void;
  signOut: () => void;
  accountId: string;
}

// Define the interface for the component props
interface KeypomComponentProps {
  isSignedIn: boolean;
  guestBook: GuestBook;
  wallet: Wallet;
}

const KeypomComponent: React.FC<KeypomComponentProps> = ({
  isSignedIn,
  guestBook,
  wallet,
}) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    guestBook.getMessages().then(setMessages);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const fieldset = form.elements.namedItem("fieldset") as HTMLFieldSetElement;
    const message = form.elements.namedItem("message") as HTMLInputElement;
    const donation = form.elements.namedItem("donation") as HTMLInputElement;

    fieldset.disabled = true;

    await guestBook.addMessage(message.value, donation.value);
    const messages = await guestBook.getMessages();

    setMessages(messages);
    message.value = "";
    donation.value = "0";
    fieldset.disabled = false;
    message.focus();
  };

  const signIn = () => {
    wallet.signIn();
  };

  const signOut = () => {
    wallet.signOut();
  };

  return (
    <>
      <main>
        <div>
          <div>
            {/* <div>
                      <h1 className="mt-8">📖 NEAR Guest Book</h1>
                    </div> */}
            <div>
              {isSignedIn ? (
                <button className="firebaseAuth-btn" onClick={signOut}>
                  Log out
                </button>
              ) : (
                <button className="firebaseAuth-btn my-6" onClick={signIn}>
                  Log in
                </button>
              )}
            </div>
          </div>
        </div>

        <hr />
        {isSignedIn ? (
          <KeypomForm onSubmit={onSubmit} currentAccountId={wallet.accountId} />
        ) : (
          <>
          <p className="my-8">Not Signed In</p>
          </>
        )}

        <hr />

        {!!messages.length && <Messages messages={messages} />}
      </main>
    </>
  );
};

export default KeypomComponent;
