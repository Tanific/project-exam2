import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import defaultTheme from "./themes/default";
import HomePage from "./pages";
import LoginPage from "./pages/auth/loginPage";
import RegisterPage from "./pages/auth/registerPage";
import VenuesPage from "./pages/venues/allVenuesPage"
import "./index.css";
import SingleVenuePage from "./pages/venues/singleVenuePage";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/venues/:venueId" element={<SingleVenuePage />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
