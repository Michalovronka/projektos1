import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
import { getAllCars } from "../../models/Car"

export default function CarLink(props) {
    return(
        <>
            <Link to={`/car/${props._id}`}>
                <p>{props.name}</p>
            </Link>
        </>
    )

}
