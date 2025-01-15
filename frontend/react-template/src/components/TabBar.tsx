import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

export interface TabBarItemProps {
  value: string;
  label: string;
  children?: React.ReactNode;
}

export interface TabBarProps {
  items: TabBarItemProps[];
  onActiveTab?: (value: string) => void;
}

export const TabBar = ({ items, onActiveTab }: TabBarProps) => {
  const [value, setValue] = React.useState(items[0].value);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    onActiveTab?.(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        {items &&
          items.length &&
          items.map((item) => <Tab value={item.value} label={item.label} />)}
      </Tabs>
    </Box>
  );
};
