import React from "react";
import "./App.css";
import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { MenuBar } from "./components/MenuBar";


function App() {
  const navItems = [
    { path: "/home", label: "Home" },
    { path: "/dashboard", label: "Dashboard Autocall" },
    { path: "/telesale-v2", label: "Telesales v2" },
    { path: "/activities", label: "Activities" },
    { path: "/telesale-manager", label: "Manage Telesales" },
    { path: "/call-history", label: "Lịch sử cuộc gọi" },
    { path: "/settings", label: "Setting" },
    { path: "/voice-blaster", label: "Voice Blaster" },
    { path: "/masking-phone", label: "Masking phone" },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex">
        <MenuBar items={navItems}/>
        <div className="p-5 w-full border-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
