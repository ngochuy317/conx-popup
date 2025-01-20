import React, { useContext, useEffect, useState } from "react";
import { ErrorContext } from "../context/ErrorContext";
import { ToastTypeEnum } from "../enum/ToastTypeEnum";

export const ErrorBanner = () => {
  const [message, setMessage] = useState("");
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);

  useEffect(() => {
    setMessage(errorMessage.message);

    setTimeout(
      () => setErrorMessage({ message: "", type: ToastTypeEnum.WARNING }),
      3000
    );
    return;
  }, [errorMessage.message]);

  if (!message) {
    return <></>;
  }

  const backgroundColor = (): string => {
    switch (errorMessage.type) {
      case ToastTypeEnum.FALIED:
        return "red";
      case ToastTypeEnum.SUCCESS:
        return "green";

      default:
        return "";
    }
  };


  return (
    <div
      className={`shadow-md ${"bg-" + backgroundColor() + "-100"} w-full flex`}
    >
      <div
        style={{ width: "5px" }}
        className={`h-full ${"bg-" + backgroundColor() + "-600"}`}
      ></div>
      <div
        className={`p-5 ${
          "text-" + backgroundColor() + "-600"
        } font-bold text-md`}
      >
        {message}
      </div>
    </div>
  );
};
