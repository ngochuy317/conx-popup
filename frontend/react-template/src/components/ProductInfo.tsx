import React from "react";
import { CommonFormWrapper } from "./CommonFormWrapper";
import { CustomTextInput } from "./CustomTextInput";
import { Formik } from "formik";

export const ProductInfo = () => {
  return (
    <CommonFormWrapper title="Product Info">
      <Formik
        initialValues={{ productUrl: "google.com" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
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
