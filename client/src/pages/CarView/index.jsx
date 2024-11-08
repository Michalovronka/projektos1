import { Link, useParams, useNavigate } from "react-router-dom";
import { getCarByID, deleteCar } from "../../models/Car";
import { useState, useEffect } from "react";

export default function CarView() {
  const { id } = useParams();

  const [car, setCar] = useState();
  const [isLoaded, setLoaded] = useState();
  const [info, setInfo] = useState();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getCarByID(id);
    if (data.status === 404 || data.status === 500) return setLoaded(null);
    if (data.status === 200) {
      setCar(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Car not Found</p>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  const handleChange = (e) => setFormData(e.target.value);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (car.name === formData) {
      const data = await deleteCar(id);
      if (data.status === 200) {
        navigate(`/`);
      } else {
        setInfo(data.message);
      }
    } else {
      setInfo("Bad name");
    }
  };

  return (
    <>
      <h1>Car View</h1>
      <p>{id}</p>
      <p>Name: {car.name}</p>
      <p>Brand: {car.brand}</p>
      <p>Color: {car.color}</p>
      <p>Price: {car.price}</p>

      <form>
        <input type="text" placeholder={car.name} onChange={handleChange} />
        <button onClick={handleDelete}>Delete Car</button>
      </form>
      <p>{info}</p>

      <Link to={`/update-car/${id}`}>
        <p>Aktualizace auta</p>
      </Link>
      <Link to={`/`}>
        <p>Home</p>
      </Link>
    </>
  );
}
