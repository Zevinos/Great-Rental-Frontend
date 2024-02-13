import { useState, useEffect } from "react";
import myApi from "../../api/myApi";
import { Link, useParams } from "react-router-dom";

function FavoritePage() {
  const [places, setPlaces] = useState();
  const token = localStorage.getItem("token");
  async function fetchFavorite() {
    try {
      const response = await myApi.get(`/favorite`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      setPlaces(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchFavorite();
  }, []);

  return (
    <>
      <div>
        <h1>Fav page</h1>
        <div className="FavContainer">
          <ul>
            {places &&
              places.map((place) => {
                return (
                  <li>
                    <Link to={`/places/${place.place._id}`}>
                      <h2>{place.place.name}</h2>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default FavoritePage;
