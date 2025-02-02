"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig"; // Import the Firestore db instance

export default function AddExerciseComponent() {
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedMachine, setSelectedMachine] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  const isCardio = selectedGroup === "cardio";

  type MachineGroups = {
    [key: string]: string[];
  };

  const machines: MachineGroups = {
    "upper-body": [
      "Chest Press",
      "Shoulder Press",
      "Bicep Curl",
      "Lat Pulldown",
    ],
    "lower-body": ["Leg Press", "Leg Extension", "Calf Raise", "Glute Machine"],
    core: ["Ab Crunch", "Torso Rotation", "Hanging Leg Raise"],
    cardio: ["Treadmill", "Elliptical", "Rowing Machine", "Stationary Bike"],
  };
  const muscleGroups = Object.keys(machines);

  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to log workouts.");
      return;
    }

    if (
      !selectedMachine ||
      (isCardio && !duration) ||
      (!isCardio && (!weight || !reps))
    ) {
      alert("Please complete all fields");
      return;
    }

    const workoutData = {
      muscleGroup: selectedGroup,
      machine: selectedMachine,
      weight: isCardio ? null : weight,
      reps: isCardio ? null : reps,
      duration: isCardio ? duration : null,
      timestamp: new Date(),
    };

    try {
      // Store in the user's personal workoutLogs collection
      const userWorkoutCollection = collection(
        db,
        `workoutLogs/${user.uid}/logs`
      );
      await addDoc(userWorkoutCollection, workoutData);

      alert("Workout logged successfully!");
    } catch (error) {
      console.error("Error logging workout:", error);
      alert("Failed to log workout.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-center font-bold">PFWorkout Helper</h1>
      <p className="text-center max-w-md">
        Track your workout progress by selecting a muscle group, choosing a
        machine, and logging your sets.
      </p>

      {/* Muscle Group Selection */}
      <div className="mt-4">
        <Select
          onValueChange={(value) => {
            setSelectedGroup(value);
            setSelectedMachine(""); // Reset machine selection when changing muscle group
          }}
        >
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select Muscle Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Muscle Groups</SelectLabel>
              {muscleGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group
                    .replace("-", " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Machine Selection (Appears after muscle group is selected) */}
      {selectedGroup && (
        <div className="mt-4">
          <Select onValueChange={setSelectedMachine}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select Machine" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Machines</SelectLabel>
                {machines[selectedGroup]?.map((machine) => (
                  <SelectItem key={machine} value={machine}>
                    {machine}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Weight & Reps Input (Appears after machine is selected) */}
      {/* Inputs for Strength Machines (Weight & Reps) */}
      {selectedMachine && !isCardio && (
        <div className="mt-4 flex flex-col gap-3">
          <h2 className="text-lg font-semibold">{selectedMachine}</h2>

          <p className="text-sm">Enter the weight for your set:</p>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Weight (lbs)"
              value={weight}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setWeight(value && parseInt(value) > 0 ? value : "");
              }}
              className="w-[150px] text-center"
            />
            <p>lbs</p>
          </div>

          <p className="text-sm">Enter the number of reps you completed:</p>
          <Input
            type="number"
            placeholder="Reps"
            value={reps}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setReps(value && parseInt(value) > 0 ? value : "");
            }}
            className="w-[200px] text-center"
          />
        </div>
      )}

      {/* Input for Cardio Machines (Duration) */}
      {selectedMachine && isCardio && (
        <div className="mt-4 flex flex-col gap-3">
          <h2 className="text-lg font-semibold">{selectedMachine}</h2>

          <p className="text-sm">Enter the duration of your workout:</p>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Minutes"
              value={duration}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setDuration(value && parseInt(value) > 0 ? value : "");
              }}
              className="w-[150px] text-center"
            />
            <p>mins</p>
          </div>
        </div>
      )}

      <Button className="mt-5" onClick={handleSubmit}>
        Log Workout
      </Button>
    </div>
  );
}
