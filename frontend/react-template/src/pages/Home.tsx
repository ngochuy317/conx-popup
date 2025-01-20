import { CommonFormWrapper } from "../components/CommonFormWrapper";
import { UserInfo } from "../components/UserInfo";
import { ContactInfo } from "../components/ContactInfo";
import { PaymentInfo } from "../components/PaymentInfo";
import { ProductInfo } from "../components/ProductInfo";
import { AddressInfo } from "../components/AddressInfo";
import { PhoneInfo } from "../components/PhoneInfo";
import { MultiTabsDashboard } from "../components/MultiTabsDashboard";
import { CallOutcome } from "../components/CallOutcome";
import { HistoryLimit } from "../components/HistoryLimit";
import { HistoryAll } from "../components/HistoryAll";
import { ErrorBanner } from "../components/ErrorBanner";
import { ErrorContext, ToastMessageProps } from "../context/ErrorContext";
import { useState } from "react";
import { ToastTypeEnum } from "../enum/ToastTypeEnum";

export const Home = () => {
  const [errorMessage, setErrorMessage] = useState({} as ToastMessageProps);

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
      component: <CallOutcome />,
    },
    {
      value: "history-all",
      label: "History all",
      component: <HistoryAll />,
    },
    {
      value: "history-limit",
      label: "History limit",
      component: <HistoryLimit />,
    },
  ];

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      <div className="flex gap-5 flex-wrap">
        <ErrorBanner />
        <div>
          <MultiTabsDashboard
            title="Thông Tin Khách Hàng"
            tabItems={customerTabItems}
          />
          <div className="mt-5">
            <CommonFormWrapper title="HIDDEN FOR NORMAL USER"></CommonFormWrapper>
          </div>
        </div>
        <div>
          <MultiTabsDashboard title="Section" tabItems={sectionTabItems} />
        </div>
      </div>
    </ErrorContext.Provider>
  );
};
