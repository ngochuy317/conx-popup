import React from "react";
import { TabBar, TabBarProps } from "./TabBar";

interface CommonFormWrapperProps {
  title: string;
  tabBar?: TabBarProps;
  children?: React.ReactNode;
}
export const CommonFormWrapper = ({
  title,
  tabBar,
  children,
}: CommonFormWrapperProps) => {
  const { items, onActiveTab } = tabBar ?? {};

  return (
    <div>
      <div className="p-2 bg-gray-100 border-2">
        <h5 className="text-md font-semibold">{title}</h5>
      </div>
      {items && items.length && (
        <TabBar onActiveTab={onActiveTab} items={items} />
      )}
      <div className="mt-3">
        {children}
      </div>
    </div>
  );
};
