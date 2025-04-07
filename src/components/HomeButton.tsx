function HomeButton(){

    // @ts-ignore: Unused interface
    interface HomeButtonProps {
        onClick: () => void;
    }
    return (
        <button className="HomeButton btn btn-secondary"><img src="./src/assets/icons8-home-button.svg" className="HomeButton"></img></button>
    )
}
export default HomeButton;
