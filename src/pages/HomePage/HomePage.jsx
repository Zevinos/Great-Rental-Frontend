import { useState, useEffect } from "react";
import myApi from "../../api/myApi";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [places, setPlaces] = useState(null);
  const [favorites, setFavorites] = useState(null);
  const token = localStorage.getItem("token");

  async function fetchPlacesAndFavorites() {
    try {
      const response = await myApi.get("/places");
      const favoritesResponse = await myApi.get("/favorite", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlaces(response.data);
      setFavorites(favoritesResponse.data.map((oneFav) => oneFav.place));
    } catch (error) {
      console.log(error);
    }
  }

  const addToFavorite = async (id) => {
    try {
      const response = await myApi.post(
        `/favorite/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFavorites = async (id) => {
    try {
      const response = await myApi.delete(`/favorite/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPlacesAndFavorites();
  }, []);

  if (!places) return <p>Waiting for places to load</p>;

  return (
    <div>
      <h1>homepage</h1>
      <div className="Container">
        <ul>
          {places.map((place) => {
            const isFavorited = favorites.includes(place._id);

            return (
              <li className="Card">
                <div className="CardContent">
                  <Link to={`/places/${place._id}`}>
                    <img src={place.img} alt="" className="placeImg" />
                    <div className="placeInfo">
                      <p className="placeName">{place.name}</p>
                      <p className="placePrice">{place.price}$</p>
                    </div>
                  </Link>
                  {isFavorited ? (
                    <button onClick={() => removeFromFavorites(place._id)}>
                      ❤️
                    </button>
                  ) : (
                    <button onClick={() => addToFavorite(place._id)}>💔</button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default HomePage;
