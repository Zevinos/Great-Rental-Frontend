import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAuth from "../../context/useAuth";
import myApi from "../../api/myApi";

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

  const isHost = user._id === place.hostName;

  return (
    <div className="placeContainer">
      <p>{place.name}</p>
      <img src={place.img} alt="" />
      {isHost && (
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default SinglePlacePage;
