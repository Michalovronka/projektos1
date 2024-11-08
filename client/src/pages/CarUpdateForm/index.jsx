import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateCar, getCarByID } from "../../models/Car";

export default function CarUpdateForm() {
  const { id } = useParams();

  const [car, setCar] = useState();
  const [isLoaded, setLoaded] = useState(false);
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

  const updateForm = async () => {
    const data = await updateCar(id, formData);
    if (data.status === 200) return navigate(`/car/${id}`);
    setInfo(data.message);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateForm();
  };

  if (isLoaded === null) {
    return <>cars not found</>;
  }

  if (!isLoaded) {
    return <>Loading...</>;
  }

  return (
    <>
      <h1>Car Update</h1>
      <input
        type="text"
        name="name"
        required
        placeholder="Enter name"
        onChange={handleChange}
        defaultValue={car.name}
      />
      <input
        type="text"
        name="brand"
        required
        placeholder="Enter brand"
        onChange={handleChange}
        defaultValue={car.brand}
      />
      <input
        type="text"
        name="color"
        required
        placeholder="Enter color"
        onChange={handleChange}
        defaultValue={car.color}
      />
      <input
        type="number"
        name="price"
        required
        placeholder="Enter price"
        onChange={handleChange}
        defaultValue={car.price}
      />

      <button onClick={handleUpdate}>Update pls</button>
      <p>Go Home</p>
    </>
  );
}
