import HomeButton from "./HomeButton";
import WorkoutButton from "./WorkoutButton";
import RecordButton from "./RecordButton";

const bgColor = 'rgb(111,111,111)';

function Navbar(){
    return (
        <div className='btn-group d-flex' role='group' style={{backgroundColor:bgColor}}>
            <HomeButton />
            <WorkoutButton />
            <RecordButton />
        </div>
    )
}

export default Navbar;
