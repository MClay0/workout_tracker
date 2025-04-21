
interface AddWorkoutButtonProps {
  onClick: () => void;
}

const AddWorkoutButton: React.FC<AddWorkoutButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} style={{position:'absolute',bottom:100, width:'100%', height:'50px', backgroundColor:'#4CAF50', color:'white', border:'none', borderRadius:'5px', fontSize:'24px'}}>
      <strong>+</strong>
    </button>
  );
};

export default AddWorkoutButton;
