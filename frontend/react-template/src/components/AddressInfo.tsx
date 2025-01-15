import React from "react";
import { FormField, FormValues } from "../models/FormField";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Formik } from "formik";
import { CommonFormWrapper } from "./CommonFormWrapper";
import { CustomDateInput } from "./CustomDateInput";
import { CustomDropdownInput } from "./CustomDropdownInput";
import { CustomTextInput } from "./CustomTextInput";
import * as Yup from "yup";

export const AddressInfo = () => {
  const formFields: FormField[] = [
    {
      label: "Địa chỉ thường trú",
      type: "text",
      name: "permanentAddress",
      defaultValue: "TỔ 6 KV3 PHƯỜNG HƯƠNG S",
    },
    { label: "Vùng", type: "text", name: "region", defaultValue: "" },
    {
      label: "Địa chỉ tạm trú",
      type: "text",
      name: "temporaryAddress",
      defaultValue: "TO 6 KV3 HUONG SO HUE HUE",
    },
    {
      label: "Tỉnh/Thành phố",
      type: "text",
      name: "temporaryProvinceCity",
      defaultValue: "",
    },
    {
      label: "Quận/Huyện",
      type: "text",
      name: "temporaryDistrict",
      defaultValue: "",
    },
  ];

  const initialValues: FormValues = formFields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue;
    return acc;
  }, {} as FormValues);

  const validationSchema = Yup.object(
    formFields.reduce((schema, field) => {
      if (field.required) {
        schema[field.name] = Yup.string().required(
          `${field.label} is required`
        );
      } else {
        schema[field.name] = Yup.string();
      }
      return schema;
    }, {} as { [key: string]: any })
  );

  return (
    <CommonFormWrapper title="Customer Info">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
              {formFields.map((field, index) => (
                <div
                  key={field.name}
                  className={`mb-4 ${index !== 1 ? "mr-10" : ""}`}
                >
                  {field.type === "text" && (
                    <CustomTextInput
                      required={field.required}
                      label={field.label}
                      name={field.name}
                      value={values[field.name]}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  )}
                  {field.type === "date" && (
                    <CustomDateInput
                      required={field.required}
                      label={field.label}
                      name={field.name}
                      value={dayjs(values[field.name])}
                      handleBlur={handleBlur}
                    />
                  )}
                  {field.type === "dropdown" && (
                    <CustomDropdownInput
                      required={field.required}
                      label={field.label}
                      name={field.name}
                      value={values[field.name]}
                      handleBlur={handleBlur}
                      defaultValue={field.defaultValue}
                      options={field.options}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="p-5 mt-10 flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                size="large"
              >
                Save
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </CommonFormWrapper>
  );
};
