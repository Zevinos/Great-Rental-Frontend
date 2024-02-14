import logo from "../../assets/Group 50.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "./Navbar.css";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { handleLogout, isLoggedIn } = useContext(AuthContext);
  return (
    <header className="NavBar">
      <Link to="/">
        <img src={logo} alt="" className="Logo" />
      </Link>
      <div className="Buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to={"/new-place"}>Rent your place</Link>
            {/* <Link to="/profile">Profile</Link> */}
            <Link to={"/favorite"}>Liked places</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
};
export default Navbar;
