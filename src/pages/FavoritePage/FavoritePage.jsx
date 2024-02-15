import { useState, useEffect } from "react";
import myApi from "../../api/myApi";
import { Link, useParams } from "react-router-dom";
import "./FavoritePage.css";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";

function FavoritePage() {
  const [places, setPlaces] = useState();
  const token = localStorage.getItem("token");
  async function fetchFavorite() {
    try {
      const response = await myApi.get(`/favorite`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
        <h1>Here are displayed all your favorite rentals !</h1>
        <div className="FavContainer">
          <ul className="FavWrapper">
            {places &&
              places.map((place) => {
                return (
                  <li className="FavCard">
                    <div className="CardContents">
                      {console.log(place)}
                      <Link to={`/places/${place.place._id}`}>
                        <img
                          src={place.place.img}
                          alt=""
                          className="FavPlaceImg"
                        />
                      </Link>
                      <div className="FavPlaceInfo">
                        <p className="FavPlaceName">{place.place.name}</p>
                        <p className="FavPlacePrice">{place.place.price}$</p>
                      </div>
                    </div>
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
