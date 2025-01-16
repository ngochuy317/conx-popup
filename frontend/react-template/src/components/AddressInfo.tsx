import React, { useEffect, useState } from "react";
import { FormField, FormValues } from "../models/FormField";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Formik } from "formik";
import { CommonFormWrapper } from "./CommonFormWrapper";
import { CustomDateInput } from "./CustomDateInput";
import { CustomDropdownInput } from "./CustomDropdownInput";
import { CustomTextInput } from "./CustomTextInput";
import * as Yup from "yup";
import { ADDRESS_API_PATH, BASE_SERVICE_API_URL } from "../consts/Constance";
import { AddressInfoModel } from "../models/AddressInfoModel";

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
      name: "province",
      defaultValue: "",
    },
    {
      label: "Quận/Huyện",
      type: "text",
      name: "district",
      defaultValue: "",
    },
  ];

  const [defaultValue, setDefaultValue] = useState({} as AddressInfoModel);
  useEffect(() => {
    fetch(BASE_SERVICE_API_URL + ADDRESS_API_PATH).then(async (res) => {
      const data: AddressInfoModel = await res.json();
      setDefaultValue(data);
    });
  }, []);

  if (!defaultValue) {
    return <div>Loading...</div>;
  }

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
    <CommonFormWrapper title="Address Info">
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          fetch(BASE_SERVICE_API_URL + ADDRESS_API_PATH, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((res) => res.json())
            .then((data: AddressInfoModel) => {
              setDefaultValue(data);
            })
            .catch((error) => console.error("Failed to update data:", error))
            .finally(() => setSubmitting(false));
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
                      value={values[field.name as keyof AddressInfoModel]}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  )}
                  {field.type === "date" && (
                    <CustomDateInput
                      required={field.required}
                      label={field.label}
                      name={field.name}
                      value={dayjs(
                        values[field.name as keyof AddressInfoModel]
                      )}
                      handleBlur={handleBlur}
                    />
                  )}
                  {field.type === "dropdown" && (
                    <CustomDropdownInput
                      required={field.required}
                      label={field.label}
                      name={field.name}
                      value={values[field.name as keyof AddressInfoModel]}
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
