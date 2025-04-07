import React from 'react';
import { WorkoutInput } from './WorkoutList';

interface WorkoutInputFormProps {
  workout: WorkoutInput;
  setWorkout: React.Dispatch<React.SetStateAction<WorkoutInput | null>>;
  onConfirm: () => void;
}

const WorkoutInputForm: React.FC<WorkoutInputFormProps> = ({ workout, setWorkout, onConfirm }) => {
  const handleChange = (field: keyof WorkoutInput, value: string) => {
    if (field === 'weight' || field === 'sets' || field === 'reps') {
      setWorkout({ ...workout, [field]: Number(value) });
    } else {
      setWorkout({ ...workout, [field]: value });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Exercise Name"
        value={workout.exercise}
        onChange={(exercise) => handleChange('exercise', exercise.target.value)}
      />
      <input
        type="number"
        placeholder="Weight (lbs)"
        value={workout.weight || ''}
        onChange={(exercise) => handleChange('weight', exercise.target.value)}
      />
      <input
        type="number"
        placeholder="Sets"
        value={workout.sets || ''}
        onChange={(exercise) => handleChange('sets', exercise.target.value)}
      />
      <input
        type="number"
        placeholder="Reps"
        value={workout.reps || ''}
        onChange={(exercise) => handleChange('reps', exercise.target.value)}
      />
      <button onClick={onConfirm}>
        Confirm
      </button>
    </div>
  );
};

export default WorkoutInputForm;