import React from "react";

function HomePageNotLoggedIn() {
  return (
    <div>
      <h1 className="text-center font-bold">Welcome to PFWorkout Helper</h1>
      <p className="text-center">
        This is an app that I am working on developing to help users track their
        workout progress at the gym by selecting a muscle group, choosing a
        machine, and logging their sets.
      </p>
      <p className="text-center">
        Eventually I will add pages to show charts of your progress for any
        given exercise and maybe even incorporate ai to give workout
        suggestions.
      </p>
    </div>
  );
}

export default HomePageNotLoggedIn;
