"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import DashboardNavigation from "@/components/dashboardNavigation";

function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/"); // Redirect only when user is NOT logged in
    }
  }, [user, router]);

  // If user is null, prevent the dashboard from rendering
  if (!user) {
    return null; // This ensures nothing renders while redirecting
  }

  return (
    <div className="flex flex-col items-center p-4">
      <DashboardNavigation />
      <h1>Welcome, {user.email}</h1>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 mt-2">
        Log Out
      </button>
      <p>
        Maybe at some point I will add a feature to add in workout goals and
        display them on the dashboard. Or display a couple fun widgets like a
        progress counter for days spent at the gym this week, year, etc.
      </p>
    </div>
  );
}

export default Dashboard;
