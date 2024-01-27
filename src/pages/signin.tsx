import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import FirebaseAuthForm from "../components/FirebaseAuthForm";

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Sign In Basketball Pick&apos;em Powered by TENAMINT</title>
      </Head>
      <main>
        <div className="flex min-h-screen flex-1">
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                {/* <img
                  className="h-10 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                /> */}
                <Link href="/" className="">
                  <span className="sr-only">Basketball Pick&apos;em Powered by TENAMINT</span>
                  <Image
                    src="/images/basketball-logo.png"
                    width={164}
                    height={28}
                    alt="logo"
                    className="mx-auto"
                  />
                </Link>
                <h2 className="mt-8 text-xl font-bold leading-9 tracking-tight text-gray-900">
                  {/* Sign up / Log in to your account */}
                  Select how you would like to continue
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  We’d like to send you marketing communications including but
                  not limited to: releases, offers, and information, from
                  TENAMINT to the email provided. We’ll always treat your
                  personal details with care and never sell it to other
                  companies.
                </p>
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-xs leading-6 text-gray-700"
                  >
                    Yes I would like to receive marketing communications
                  </label>
                </div>
              </div>
              <FirebaseAuthForm />
            </div>
          </div>
          <div className="relative hidden w-0 flex-1 lg:block">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="/images/background.jpg"
              alt="Background Image"
            />
          </div>
        </div>
      </main>
    </>
  );
}
