import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

import "./App.css";

function App() {
  return (
    <section>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/*<Route path="/places/:placeId" element={<OnePlacePage />} />
          <Route path="/new-place" element={<NewPlacePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/favorite" element={<FavoritePage />} />*/}
        </Routes>
      </div>
    </section>
  );
}

export default App;
