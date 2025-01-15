import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<App />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="telesale-v2" element={<Home />} />
            <Route path="activities" element={<Home />} />
            <Route path="telesale-manager" element={<Home />} />
            <Route path="call-history" element={<Home />} />
            <Route path="settings" element={<Home />} />
            <Route path="voice-blaster" element={<Home />} />
            <Route path="masking-phone" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  </React.StrictMode>
);

reportWebVitals();
