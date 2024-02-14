import { useState } from "react";
import myApi from "../../api/myApi";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";

function SignupPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleUserName = (e) => setUserName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const newUser = {
        userName: userName,
        email: email,
        password: password,
      };
      const response = await myApi.post(`/auth/signup`, newUser);
      console.log(response);
      navigate(`/`);
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="SignupForm">
        <h3> Create your account</h3>
        <div className="FormUsername">
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            value={userName}
            onChange={handleUserName}
            id="userName"
          />
        </div>
        <div className="FormEmail">
          <label htmlFor="email">Email:</label>
          <input type="email" value={email} onChange={handleEmail} id="email" />
        </div>
        <div className="FormPassword">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            id="password"
          />
        </div>

        <button className="SignupButton">Signup</button>
        <p>
          You already have an account ? click <Link to={"/login"}>here</Link>
        </p>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
}

export default SignupPage;
