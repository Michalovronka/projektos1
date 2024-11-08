import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
import { getAllCars } from "../../models/Car"
import CarLink from "./CarLink";

export default function CarList() {

    const [cars,setCars] = useState();
    const[isLoaded, setLoaded] = useState(false);
    const load = async () =>{
        const data = await getAllCars();
        if(data.status === 404 || data.status === 500) return setLoaded(null);
        if(data.status === 200){
            setCars(data.payload);
            setLoaded(true);
        }
    }

    useEffect(()=>{
        load();
    }, [])

    if(isLoaded === null){
        return(
            <>cars not found</>
        )
    }

    if(!isLoaded){
        return(<>
        Loading...
        </>)
    }



    return (

    <>
    <h1>Car List</h1>

      {cars.map((car,index) =>(
        <CarLink key={index} {...car}/>
      ))}
      <Link to={"/"}>
        <p>Go Home</p>
      </Link>
    </>

    )


}
