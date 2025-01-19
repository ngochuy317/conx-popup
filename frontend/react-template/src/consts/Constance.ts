// Declare process.env to avoid TypeScript errors
declare var process: {
    env: {
      REACT_APP_ENV: string;
      REACT_APP_API_URL: string;
    };
  };


export const API_PORT = 28000;
export const BASE_SERVICE_API_URL = `http://localhost:${API_PORT}/customer/api/`;
export const CUSTOMER_API_PATH = "customer_info_api";
export const PAYMENT_API_PATH = "payment_info_api";
export const PRODUCT_API_PATH = "product_info_api";
export const CONTACT_API_PATH = "contact_info_api";
export const ADDRESS_API_PATH = "address_info_api";
export const PHONE_API_PATH = "phone_info_api";
export const CALL_OUTCOME_API_PATH = "call_outcome_api";
