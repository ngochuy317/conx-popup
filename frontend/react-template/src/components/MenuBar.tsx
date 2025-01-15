import React from "react";
import { NavLink } from "react-router";

export interface MenuItemProps {
  path: string;
  label: string;
}

export interface MenuBarProps {
  items: MenuItemProps[];
  orientation?: "vertical" | "horizontal";
}

const baseStyles = {
  vertical: "w-80 flex flex-col",
  horizontal: "w-full flex flex-row justify-around",
};

export const MenuBar = ({ items, orientation = "vertical" }: MenuBarProps) => {
  return (
    <nav className={baseStyles[orientation]}>
      {items.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) => (isActive ? "bg-blue-200" : "")}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};
