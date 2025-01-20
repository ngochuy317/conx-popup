import React, { useContext } from "react";
import { CommonFormWrapper } from "./CommonFormWrapper";
import { CustomTextInput } from "./CustomTextInput";
import { Formik } from "formik";
import { ToastTypeEnum } from "../enum/ToastTypeEnum";
import { ErrorContext } from "../context/ErrorContext";

export const ProductInfo = () => {
  const { setErrorMessage } = useContext(ErrorContext);

  return (
    <CommonFormWrapper title="Product Info">
      <Formik
        initialValues={{ productUrl: "google.com" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setErrorMessage({
              message: "Success",
              type: ToastTypeEnum.SUCCESS,
            });

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <CustomTextInput
            label={"Product"}
            name={"productUrl"}
            value={values.productUrl}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        )}
      </Formik>
    </CommonFormWrapper>
  );
};
