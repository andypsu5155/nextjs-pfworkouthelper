"use client";
import DashboardNavigation from "@/components/dashboardNavigation";
import React from "react";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AddExerciseComponent from "@/components/addExerciseComponent";

function AddExercise() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/"); // Redirect only when user is NOT logged in
    }
  }, [user, router]);

  // If user is null, prevent the page from rendering
  if (!user) {
    return null; // This ensures nothing renders while redirecting
  }
  return (
    <div>
      <DashboardNavigation />
      <AddExerciseComponent />
    </div>
  );
}

export default AddExercise;
