import { useState, useEffect } from "react";
import myApi from "../../api/myApi";
import { useNavigate, useParams, Link } from "react-router-dom";

function ModifyPlacePage() {
  const [formState, setFormState] = useState({
    country: "",
    city: "",
    name: "",
    description: "",
    capacity: "",
    bathrooms: "",
    bedrooms: "",
    price: "",
    img: "",
  });
  const { placeId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const fetchOnePlace = async () => {
    try {
      const res = await myApi.get(`places/${placeId}`);
      setFormState({
        country: res.data.country,
        city: res.data.city,
        name: res.data.name,
        description: res.data.description,
        capacity: res.data.capacity,
        bathrooms: res.data.bathrooms,
        bedrooms: res.data.bedrooms,
        price: res.data.price,
        img: res.data.img,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOnePlace();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await myApi.put("/places/" + placeId, formState, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      navigate(`/places/${response.data._id}`);
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  const handleChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    setFormState({ ...formState, [key]: value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            value={formState.country}
            onChange={handleChange}
            id="country"
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            value={formState.city}
            onChange={handleChange}
            id="city"
          />
        </div>
        <div>
          <label htmlFor="name">name:</label>
          <input
            type="text"
            value={formState.name}
            onChange={handleChange}
            id="name"
          />
        </div>
        <div>
          <label htmlFor="description">description:</label>
          <input
            type="text"
            value={formState.description}
            onChange={handleChange}
            id="description"
          />
        </div>
        <div>
          <label htmlFor="capacity">capacity:</label>
          <input
            type="number"
            min="0"
            value={formState.capacity}
            onChange={handleChange}
            id="capacity"
          />
        </div>
        <div>
          <label htmlFor="bathrooms">bathrooms:</label>
          <input
            type="number"
            min="0"
            value={formState.bathrooms}
            onChange={handleChange}
            id="bathrooms"
          />
        </div>
        <div>
          <label htmlFor="bedrooms">Bedrooms:</label>
          <input
            type="number"
            min="0"
            value={formState.bedrooms}
            onChange={handleChange}
            id="bedrooms"
          />
        </div>
        <div>
          <label htmlFor="price">Price per nigth:</label>
          <input
            type="number"
            min="0"
            value={formState.price}
            onChange={handleChange}
            id="price"
          />
        </div>
        <div>
          <label htmlFor="img">Image:</label>
          <input
            type="url"
            value={formState.img}
            onChange={handleChange}
            id="img"
          />
        </div>
        <Link to={`/places/${placeId}`}> return</Link>
        <button>Save changes</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
}

export default ModifyPlacePage;
