"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import DashboardNavigation from "@/components/dashboardNavigation";

export default function ViewLogs() {
  const { user } = useAuth(); // Get logged-in user
  const [logs, setLogs] = useState<{ [date: string]: any[] }>({});

  useEffect(() => {
    if (!user) return;

    const fetchLogs = async () => {
      const logsRef = collection(db, "workoutLogs", user.uid, "logs");
      const q = query(logsRef, orderBy("timestamp", "desc"));

      try {
        const querySnapshot = await getDocs(q);
        const groupedLogs: { [date: string]: any[] } = {};

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const date = new Date(data.timestamp.toDate()).toLocaleDateString();

          if (!groupedLogs[date]) {
            groupedLogs[date] = [];
          }
          groupedLogs[date].push(data);
        });

        setLogs(groupedLogs);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, [user]);

  if (!user) {
    return (
      <p className="text-center mt-10">Please log in to view your logs.</p>
    );
  }

  return (
    <div className="p-4">
      <DashboardNavigation />
      <h1 className="text-xl font-bold text-center">Your Workout Logs</h1>
      {Object.keys(logs).length === 0 ? (
        <p className="text-center mt-4">No workout logs found.</p>
      ) : (
        Object.entries(logs).map(([date, exercises]) => (
          <div key={date} className="mt-6 p-4 border rounded-lg shadow">
            <h2 className="text-lg font-semibold">{date}</h2>
            <ul className="mt-2 space-y-2">
              {exercises.map((log, index) => (
                <li key={index} className="p-2 bg-gray-100 rounded">
                  <p>
                    <strong>Machine:</strong> {log.machine}
                  </p>
                  {log.weight && (
                    <p>
                      <strong>Weight:</strong> {log.weight} lbs
                    </p>
                  )}
                  {log.reps && (
                    <p>
                      <strong>Reps:</strong> {log.reps}
                    </p>
                  )}
                  {log.duration && (
                    <p>
                      <strong>Duration:</strong> {log.duration} mins
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
