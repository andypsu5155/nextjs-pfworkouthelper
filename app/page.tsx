"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import HomePageNotLoggedIn from "@/components/homePageNotLoggedIn";
import HomePageLoggedIn from "@/components/homePageLoggedIn";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center p-4">
      {user ? (
        <>
          <h1>Welcome, {user.email}</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 mt-2"
          >
            Log Out
          </button>
          <HomePageLoggedIn />
        </>
      ) : (
        <>
          <HomePageNotLoggedIn />
          <Link href="/auth" className="text-blue-500">
            Login Here!
          </Link>
          .
        </>
      )}
    </div>
  );
}
