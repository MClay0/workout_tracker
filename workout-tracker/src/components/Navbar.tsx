import HomeButton from "./HomeButton";
import AddButton from "./AddButton";
import RecordButton from "./RecordButton";

const bgColor = 'rgb(111,111,111)';

function Navbar(){
    return (
        <div className='btn-group d-flex' role='group' style={{backgroundColor:bgColor}}>
            <AddButton />
            <SettingsButton />
        </div>
    )
}

export default Navbar;
