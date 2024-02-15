import { useState, useEffect, useContext } from "react";
import myApi from "../../api/myApi";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";

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

  if (!places) return <h1>Please signup or login to display places</h1>;

  return (
    <div>
      <div className="Container">
        <ul className="PlacesWrapper">
          {places.map((place) => {
            const isFavorited = favorites.includes(place._id);

            return (
              <li className="Card">
                <div className="CardContent">
                  <Link to={`/places/${place._id}`}>
                    <img src={place.img} alt="" className="PlaceImg" />
                  </Link>
                  <div className="PlaceInfo">
                    <p className="PlaceName">{place.name}</p>
                    <p className="PlacePrice">{place.price}$</p>
                  </div>
                  {isFavorited ? (
                    <HiHeart
                      onClick={() => removeFromFavorites(place._id)}
                      className="Button"
                    />
                  ) : (
                    <HiOutlineHeart
                      onClick={() => addToFavorite(place._id)}
                      className="Button"
                    />
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
