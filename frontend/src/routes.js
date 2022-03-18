import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Movies from "./components/Movies";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Movies />} />
    </Routes>
  </Router>
);

export default AppRoutes;
