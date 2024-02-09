import { useState, useEffect } from "react";
import myApi from "../../api/myApi";

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
      <p>homepage</p>
      <ul>
        {places.map((place) => {
          return (
            <li>
              <p>{place.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default HomePage;
