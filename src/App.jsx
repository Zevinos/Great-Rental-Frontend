import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import SinglePlacePage from "./pages/SinglePlacePage/SinglePlacePage";
import NewPlacePage from "./pages/NewPlacePage/NewPlacePage";

import "./App.css";

function App() {
  return (
    <section>
      <div>
        <Navbar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/places/:placeId" element={<SinglePlacePage />} />
          <Route path="/new-place" element={<NewPlacePage />} />
          {/*
          <Route path="/favorite" element={<FavoritePage />} />*/}
        </Routes>
      </div>
    </section>
  );
}

export default App;
