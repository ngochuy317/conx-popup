import React, { useState } from "react";
import { TabBarItemProps, TabBarProps } from "./TabBar";
import { CommonFormWrapper } from "./CommonFormWrapper";

interface MultiTabsDashboardProps {
  tabItems: TabBarItemProps[];
  title: string;
}
export const MultiTabsDashboard = ({ tabItems,title }: MultiTabsDashboardProps) => {
  const [activeTab, setActiveTab] = useState(tabItems[0].value ?? "");

  const tabBarProps: TabBarProps = {
    items: tabItems,
    onActiveTab: setActiveTab,
  };

  const renderActiveComponent = () => {
    return tabItems.find((tab) => {
      return tab.value === activeTab;
    })?.component;
  };

  return (
    <CommonFormWrapper tabBar={tabBarProps} title={title}>
      {renderActiveComponent()}
    </CommonFormWrapper>
  );
};
