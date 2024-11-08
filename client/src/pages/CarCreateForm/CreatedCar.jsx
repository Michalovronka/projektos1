import React from 'react'
import { useParams, Link } from 'react-router-dom'

export default function CreatedCar() {
    const { id } = useParams();
    return (
        <>
            <div>CreatedCar : {id}</div>
            <Link to={`./${id}`}>
                <p>View car</p>
            </Link>
        </>
    )
}
