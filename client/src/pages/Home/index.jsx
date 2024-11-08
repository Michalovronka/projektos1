import { Link } from "react-router-dom";


export default function Home(){
    return(
        <>
            <Link to={"/add-car"}>
              <p>Add Car</p>
            </Link>
            <Link to={"/view-cars"}>
                <p>Vier caer</p>
            </Link>
            <Link to={"/"}></Link>
        </>
    )
}