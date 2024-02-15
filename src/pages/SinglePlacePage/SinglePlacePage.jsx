import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAuth from "../../context/useAuth";
import myApi from "../../api/myApi";
import "./SinglePlacePage.css";

const SinglePlacePage = () => {
  const token = localStorage.getItem("token");
  const { user } = useAuth();
  const [place, setPlace] = useState();
  const { placeId } = useParams();
  const navigate = useNavigate();

  const fetchOnePlace = async () => {
    try {
      const response = await myApi.get(`/places/${placeId}`);
      console.log(response);

      setPlace(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOnePlace();
  }, []);

  async function handleDelete() {
    try {
      const response = await myApi.delete(`/places/${placeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  if (!place) {
    return <p>No place here</p>;
  }

  const isHost = user && user._id === place.hostName;

  return (
    <div className="placeContainer">
      <img src={place.img} alt="" className="PlacePic" />
      <div className="Wrapper">
        <p className="placeName">{place.name}</p>
        <p className="placePrice">{place.price}$ per nigth</p>
      </div>
      {isHost && (
        <div>
          <button onClick={handleDelete}>Delete</button>
          <Link to={`/places/modify/${placeId}`}>Edit place</Link>
        </div>
      )}
      <p className="placeDescription">{place.description}</p>
    </div>
  );
};

export default SinglePlacePage;
