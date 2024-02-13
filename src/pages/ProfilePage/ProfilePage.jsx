import { useState, useEffect } from "react";
import myApi from "../../api/myApi";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");
  async function fetchProfile() {
    try {
      const response = await myApi.get(`/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return <div>ProfilePage</div>;
}

export default ProfilePage;
