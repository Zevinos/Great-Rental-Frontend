import { useState, useEffect } from "react";
import myApi from "../../api/myApi";
import { Link } from "react-router-dom";

function HomePage() {
  const [places, setPlaces] = useState(null);
  async function fetchPlaces() {
    try {
      const response = await myApi.get("/places");
      setPlaces(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPlaces();
  }, []);
  if (!places) return <p>Waiting for places to load</p>;

  return (
    <div>
      <h1>homepage</h1>
      <div className="card">
        <ul>
          {places.map((place) => {
            return (
              <li>
                <Link to={`/places/${place._id}`}>
                  <p>{place.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default HomePage;
