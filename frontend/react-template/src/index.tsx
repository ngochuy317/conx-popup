import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { PhoneInfo } from "./components/PhoneInfo";
import { AddressInfo } from "./components/AddressInfo";
import { ContactInfo } from "./components/ContactInfo";
import { PaymentInfo } from "./components/PaymentInfo";
import { ProductInfo } from "./components/ProductInfo";
import { UserInfo } from "./components/UserInfo";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<App />}>
          <Route path="home" element={<Home />} />
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
