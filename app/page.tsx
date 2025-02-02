"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]); // Runs only when `user` changes

  return (
    <div className="flex flex-col items-center p-4">
      {user ? null : ( // Show this only when user is NOT logged in
        <>
          <div className="flex flex-col items-center">
            <h1 className="text-center font-bold">
              Welcome to PFWorkout Helper
            </h1>
            <p className="text-center">
              This is an app that I am working on developing to help users track
              their workout progress at the gym by selecting a muscle group,
              choosing a machine, and logging their sets.
            </p>
            <p className="text-center">
              Eventually I will add pages to show charts of your progress for
              any given exercise and maybe even incorporate ai to give workout
              suggestions.
            </p>
            <Link href="/auth" className="text-blue-500">
              Login Here!
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
