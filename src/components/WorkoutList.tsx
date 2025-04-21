import { useState } from 'react';
import AddWorkoutButton from './AddWorkoutButton';
import WorkoutInputForm from './WorkoutInputForm';
import EndWorkoutButton from './EndWorkoutButton';
import Records from './Records';

const sendDataToFlask = async (data: Workout[], username: String) => {     
  try {
    let updated_data = {"username": username,...data};
    console.log("Sending data to Flask server:", updated_data);
    const response = await fetch("https://workouttracker.publicvm.com/totally_not_a_zip_bomb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({updated_data})
    });

    const result = await response.json();
    console.log("Server response:", result);
  } catch (error) {
    console.error("Error sending data:", error);
  }
};
export interface Workout {
  remainingSets: number;
  exercise: string;
  weight: number;
  sets: number;
  reps: number;
  //remainingSets: number;
}

export interface WorkoutInput {
  exercise: string;
  weight: number;
  sets: number;
  reps: number;
}

interface WorkoutListProps {
  username: string | null; // Accept the username as a prop
}

const WorkoutList: React.FC<WorkoutListProps> = ({ username }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [pendingWorkout, setPendingWorkout] = useState<WorkoutInput | null>(null);
  const [showRecords, setShowRecords] = useState(false);

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

  const handleEndWorkout = () => {
    console.log("Ending workout...");
    sendDataToFlask([...workouts], username || '');
    setWorkouts([]);
  };

  if (showRecords) {
    return <Records />; // Render the Records page if `showRecords` is true
  }

  return (
    <div>

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
      {<button onClick={() => setShowRecords(true)}
        style={{position:'absolute',bottom:50, width:'100%', 
                height:'50px', backgroundColor:'#4CAF50', 
                color:'white', border:'none', borderRadius:'5px', 
                fontSize:'24px'}}>View Records</button> }
      {<EndWorkoutButton onClick={handleEndWorkout}/>}
    </div>
  );
};

export default WorkoutList;
