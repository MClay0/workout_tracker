interface EndWorkoutButtonProps {
  onClick: () => void;
}

export const EndWorkoutButton: React.FC<EndWorkoutButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick} // Attach the onClick handler here
      style={{
        position: 'absolute',
        bottom: 50,
        width: '100%',
        height: '50px',
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '24px',
      }}
    >
      <strong>End Workout</strong>
    </button>
  );
};

export default EndWorkoutButton;