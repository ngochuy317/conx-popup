import React, { useContext, useEffect, useState } from "react";
import { ErrorContext } from "../context/ErrorContext";
import { ToastTypeEnum } from "../enum/ToastTypeEnum";

export const ErrorBanner = () => {
  const [message, setMessage] = useState("");
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);

  useEffect(() => {
    if (errorMessage.message) {
      setMessage(errorMessage.message);

      const timer = setTimeout(() => {
        setErrorMessage({ message: "", type: ToastTypeEnum.WARNING });
        setMessage("");
      }, 3000);

      // Cleanup timeout on component unmount or errorMessage change
      return () => clearTimeout(timer);
    }
  }, [errorMessage, setErrorMessage]);

  if (!message) {
    return null;
  }

  const backgroundColor = (): string => {
    switch (errorMessage.type) {
      case ToastTypeEnum.FAILED:
        return "red";
      case ToastTypeEnum.SUCCESS:
        return "green";
      default:
        return "gray"; // Default color if type is not matched
    }
  };

  console.log(backgroundColor());

  return (
    <div
      className={`shadow-md ${
        backgroundColor() === "green" ? "bg-green-100" : "bg-red-100"
      } w-full flex`}
    >
      <div
        style={{ width: "5px" }}
        className={`h-full ${
          backgroundColor() === "green" ? "bg-green-600" : "bg-red-600"
        }`}
      ></div>
      <div
        className={`p-5 ${
          backgroundColor() === "green" ? "text-green-600" : "text-red-600"
        } font-bold text-md`}
      >
        {message}
      </div>
    </div>
  );
};
