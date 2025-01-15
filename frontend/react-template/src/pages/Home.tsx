import { useState } from "react";
import { CommonFormWrapper } from "../components/CommonFormWrapper";
import { TabBarProps } from "../components/TabBar";
import { UserInfo } from "../components/UserInfo";
import { ContactInfo } from "../components/ContactInfo";
import { PaymentInfo } from "../components/PaymentInfo";
import { ProductInfo } from "../components/ProductInfo";
import { AddressInfo } from "../components/AddressInfo";
import { PhoneInfo } from "../components/PhoneInfo";

export const Home = () => {
  const [activeTab, setActiveTab] = useState("user-info");
  const tabItems = [
    { value: "user-info", label: "Customer Info", component: <UserInfo /> },
    {
      value: "contact-info",
      label: "Contact Info",
      component: <ContactInfo />,
    },
    {
      value: "payment-info",
      label: "Payment Info",
      component: <PaymentInfo />,
    },
    {
      value: "product-info",
      label: "Product Info",
      component: <ProductInfo />,
    },
    {
      value: "address-info",
      label: "Address Info",
      component: <AddressInfo />,
    },
    { value: "phone-info", label: "Phone Info", component: <PhoneInfo /> },
  ];

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
    <CommonFormWrapper tabBar={tabBarProps} title="THÔNG TIN KHÁCH HÀNG">
      {renderActiveComponent()}

      <CommonFormWrapper title="HIDDEN FOR NORMAL USER"></CommonFormWrapper>
    </CommonFormWrapper>
  );
};
