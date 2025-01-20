import { createContext } from "react";
import { ToastTypeEnum } from "../enum/ToastTypeEnum";

export interface ToastMessageProps {
  type: ToastTypeEnum;
  message: string;
}

export interface ErrorContextType {
  errorMessage: ToastMessageProps;
  setErrorMessage: React.Dispatch<React.SetStateAction<ToastMessageProps>>;
}

export const ErrorContext = createContext<ErrorContextType>({
  errorMessage: {
    type: ToastTypeEnum.FAILED,
    message: "",
  } as ToastMessageProps,
  setErrorMessage: () => {}, // Default placeholder function
});
