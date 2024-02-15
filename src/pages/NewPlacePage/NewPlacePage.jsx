import { useState } from "react";
import myApi from "../../api/myApi";
import { Link, useNavigate } from "react-router-dom";
import "./NewPlacePage.css";

function NewPlacePage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const token = localStorage.getItem("token");
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await myApi.post("/places", formState, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      navigate(`/places/${response.data.id}`);
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
      <form onSubmit={handleSubmit} className="NewPlaceForm">
        <h3>Create your rental</h3>
        <div className="CountryInput">
          <label htmlFor="country">
            <input
              type="text"
              value={formState.country}
              onChange={handleChange}
              id="country"
              placeholder="Country"
            />
          </label>
        </div>
        <div className="CityInput">
          <label htmlFor="city"></label>
          <input
            type="text"
            value={formState.city}
            onChange={handleChange}
            id="city"
            placeholder="City"
          />
        </div>
        <div className="NameInput">
          <label htmlFor="name"></label>
          <input
            type="text"
            value={formState.name}
            onChange={handleChange}
            id="name"
            placeholder="Name"
          />
        </div>
        <div className="DescInput">
          <label htmlFor="description"></label>
          <textarea
            type="text"
            value={formState.description}
            onChange={handleChange}
            id="description"
            placeholder="Description"
          />
        </div>
        <div className="NumberWrapper">
          <div className="CapInput">
            <label htmlFor="capacity"> </label>
            <input
              type="number"
              min="0"
              value={formState.capacity}
              onChange={handleChange}
              id="capacity"
              placeholder="Capacity"
            />
          </div>
          <div className="BathInput">
            <label htmlFor="bathrooms"></label>
            <input
              type="number"
              min="0"
              value={formState.bathrooms}
              onChange={handleChange}
              id="bathrooms"
              placeholder="Bathrooms"
            />
          </div>
          <div className="BedInput">
            <label htmlFor="bedrooms"></label>
            <input
              type="number"
              min="0"
              value={formState.bedrooms}
              onChange={handleChange}
              id="bedrooms"
              placeholder="Bedrooms"
            />
          </div>
          <div className="PriceInput">
            <label htmlFor="price"></label>
            <input
              type="number"
              min="0"
              value={formState.price}
              onChange={handleChange}
              id="price"
              placeholder="Price"
            />
          </div>
        </div>
        <div className="ImgInput">
          <label htmlFor="img"></label>
          <input
            type="url"
            value={formState.img}
            onChange={handleChange}
            id="img"
            placeholder="URL"
          />
        </div>
        <button className="CreatingButton">Create your place</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
}

export default NewPlacePage;
