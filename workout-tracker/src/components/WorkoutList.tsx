import React, { useState } from 'react';
import AddWorkoutButton from './AddWorkoutButton';
import WorkoutInputForm from './WorkoutInputForm';

export interface Workout {
  exercise: string;
  weight: number;
  sets: number;
  reps: number;
  remainingSets: number;
}

export interface WorkoutInput {
  exercise: string;
  weight: number;
  sets: number;
  reps: number;
}

const WorkoutList: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [pendingWorkout, setPendingWorkout] = useState<WorkoutInput | null>(null);

  const handleAddWorkout = () => {
    setPendingWorkout({ exercise: '', weight: 0, sets: 0, reps: 0 });
  };

  const handleConfirmWorkout = () => {
    if (pendingWorkout) {
      const confirmedWorkout: Workout = {
        ...pendingWorkout,
        remainingSets: pendingWorkout.sets,
      };
      setWorkouts([...workouts, confirmedWorkout]);
      setPendingWorkout(null);
    }
  };

  // Identify the current exercise as the first workout with remaining sets
  const currentWorkoutIndex = workouts.findIndex(
    (workout) => workout.remainingSets > 0
  );

  const handleCompleteSet = (index: number) => {
    setWorkouts(
      workouts.map((workout, i) => {
        if (i === index && workout.remainingSets > 0) {
          return { ...workout, remainingSets: workout.remainingSets - 1 };
        }
        return workout;
      })
    );
  };

  return (
    <div>
      <h2>Workout Tracker</h2>
      <div>
        {workouts.length === 0 && !pendingWorkout && (
          <p>Add workouts to get started</p>
        )}

        {workouts.map((workout, index) => {
          const isActive = index === currentWorkoutIndex;
          return (
            <div key={index} className={isActive ? 'active' : ''}>
              <strong>{workout.exercise}</strong> – {workout.weight} lbs, {workout.sets} sets, {workout.reps} reps
              {isActive && (
                <>
                  <br />
                  <small>{workout.remainingSets} sets remaining</small>
                  {workout.remainingSets > 0 && (
                    <button onClick={() => handleCompleteSet(index)}>
                      Complete Set
                    </button>
                  )}
                </>
              )}
            </div>
          );
        })}

        {pendingWorkout && (
          <WorkoutInputForm
            workout={pendingWorkout}
            setWorkout={setPendingWorkout}
            onConfirm={handleConfirmWorkout}
          />
        )}
      </div>
      {<AddWorkoutButton onClick={handleAddWorkout}/>}
    </div>
  );
};

export default WorkoutList;
