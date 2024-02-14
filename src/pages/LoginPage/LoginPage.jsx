import { useContext, useState } from "react";
import myApi from "../../api/myApi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const existUser = {
        email: email,
        password: password,
      };
      const response = await myApi.post(`/auth/login`, existUser);
      console.log(response);
      localStorage.setItem("token", response.data.authToken);
      await authenticateUser();

      navigate(`/`);
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="LoginForm">
        <h3>Connect to your account</h3>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" value={email} onChange={handleEmail} id="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            id="password"
          />
        </div>

        <button className="LoginButton">Login</button>
        <p>
          Wait you dont have an account yet ?! click{" "}
          <Link to={"/signup"}>here</Link>
        </p>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
}

export default LoginPage;
