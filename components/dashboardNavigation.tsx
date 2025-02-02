import React from "react";
import Link from "next/link";

function DashboardNavigation() {
  return (
    <nav className="flex w-full">
      <ul className="flex w-[50%] mx-auto rounded-xl mt-5 justify-center items-center gap-5 bg-blue-300">
        <li className="flex">
          <Link
            href="/dashboard"
            className="p-2 hover:bg-blue-500 transition-all"
          >
            Dashboard
          </Link>
        </li>
        <li className="flex">
          <Link
            href="/addExercise"
            className="p-2 hover:bg-blue-500 transition-all"
          >
            Add Exercise
          </Link>
        </li>
        <li className="flex">
          <Link
            href="/viewLogs"
            className="p-2 hover:bg-blue-500 transition-all"
          >
            View Logs
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default DashboardNavigation;
