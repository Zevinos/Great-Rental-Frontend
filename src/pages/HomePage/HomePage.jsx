import { useState, useEffect } from "react";
import myApi from "../../api/myApi";
import { Link } from "react-router-dom";

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
      setFavorites(favoritesResponse.data.map((oneFav) => oneFav.place));
      setPlaces(response.data);
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
      <div className="card">
        <ul>
          {places.map((place) => {
            const isFavorited = favorites.includes(place._id);

            return (
              <li>
                <Link to={`/places/${place._id}`}>
                  <p>{place.name}</p>
                </Link>
                {isFavorited ? (
                  <button onClick={() => removeFromFavorites(place._id)}>
                    ❤️
                  </button>
                ) : (
                  <button onClick={() => addToFavorite(place._id)}>💔</button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default HomePage;
