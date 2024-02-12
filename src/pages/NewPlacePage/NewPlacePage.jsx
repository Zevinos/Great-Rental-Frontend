import { useState } from "react";
import myApi from "../../api/myApi";
import { Link, useNavigate } from "react-router-dom";

function NewPlacePage() {
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
      const response = await myApi.post("/places", formState);
      console.log(response);
      navigate(`/places/${response.data.id}`);
    } catch (error) {
      console.log(error);
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
        <button>Create your place</button>
      </form>
    </>
  );
}

export default NewPlacePage;
