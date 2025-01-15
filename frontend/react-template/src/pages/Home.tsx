import { useState } from "react";
import { CommonFormWrapper } from "../components/CommonFormWrapper";
import { TabBarProps } from "../components/TabBar";
import { UserInfo } from "../components/UserInfo";
import { ContactInfo } from "../components/ContactInfo";
import { PaymentInfo } from "../components/PaymentInfo";
import { ProductInfo } from "../components/ProductInfo";
import { AddressInfo } from "../components/AddressInfo";
import { PhoneInfo } from "../components/PhoneInfo";
import { MultiTabsDashboard } from "../components/MultiTabsDashboard";

export const Home = () => {
  const [activeTab, setActiveTab] = useState("user-info");
  const customerTabItems = [
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

  const sectionTabItems = [
    {
      value: "call-outcome",
      label: "Call Outcome",
      component: <ContactInfo />,
    },
    {
      value: "history-all",
      label: "History all",
      component: <ContactInfo />,
    },
    {
      value: "history-limit",
      label: "History limit",
      component: <ContactInfo />,
    },
  ];
  const tabBarProps: TabBarProps = {
    items: customerTabItems,
    onActiveTab: setActiveTab,
  };

  const renderActiveComponent = () => {
    return customerTabItems.find((tab) => {
      return tab.value === activeTab;
    })?.component;
  };

  return (
    <div className="flex gap-5">
      <div className="flex-1">
        <MultiTabsDashboard
          title="Thông Tin Khách Hàng"
          tabItems={customerTabItems}
        />
        <div className="mt-5">
          <CommonFormWrapper title="HIDDEN FOR NORMAL USER"></CommonFormWrapper>
        </div>
      </div>
      <div className="flex-1">
        <MultiTabsDashboard title="Section" tabItems={sectionTabItems} />
      </div>
    </div>
  );
};
