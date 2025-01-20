import React, { useEffect, useState } from "react";
import { CommonFormWrapper } from "./CommonFormWrapper";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import * as Yup from "yup";
import { Formik } from "formik";
import { BASE_SERVICE_API_URL, PHONE_API_PATH } from "../consts/Constance";
import { CustomDateInput } from "./CustomDateInput";
import { CustomDropdownInput } from "./CustomDropdownInput";
import { CustomTextInput } from "./CustomTextInput";
import { FormField } from "../models/FormField";
import { PhoneInfoModel } from "../models/PhoneInfoModel";

export const PhoneInfo = () => {
  const formFields: FormField[] = [
    {
      label: "Tên Vợ/Chồng",
      type: "text",
      name: "spouseName",
      defaultValue: "",
    },
    {
      label: "Tên liên hệ thứ 1",
      type: "text",
      name: "contactName1",
      defaultValue: "",
    },
    {
      label: "Mối quan hệ của SDT thứ 1",
      type: "text",
      name: "contactRelationship1",
      defaultValue: "",
    },
    {
      label: "SDT thứ 1",
      type: "text",
      name: "contactPhone1",
      defaultValue: "",
    },
    {
      label: "Tên liên hệ thứ 2",
      type: "text",
      name: "contactName2",
      defaultValue: "",
    },
    {
      label: "Mối quan hệ của SDT thứ 2",
      type: "text",
      name: "contactRelationship2",
      defaultValue: "",
    },
    {
      label: "SDT thứ 2",
      type: "text",
      name: "contactPhone2",
      defaultValue: "",
    },
    {
      label: "Family Book",
      type: "text",
      name: "familyBook",
      defaultValue: "Thanhsmartphone01@Gmail.Com",
    },
    {
      label: "Tên liên hệ khác",
      type: "text",
      name: "otherContactName1",
      defaultValue: "",
    },
    {
      label: "Số điện thoại SDT khác 1",
      type: "text",
      name: "otherContactPhone1",
      defaultValue: "",
    },
    {
      label: "Tên liên hệ khác 2",
      type: "text",
      name: "otherContactName2",
      defaultValue: "",
    },
    {
      label: "Số điện thoại SDT khác 2",
      type: "text",
      name: "otherContactPhone2",
      defaultValue: "",
    },
  ];
  

  const [defaultValue, setDefaultValue] = useState({} as PhoneInfoModel);
  useEffect(() => {
    fetch(BASE_SERVICE_API_URL + PHONE_API_PATH).then(async (res) => {
      const data: PhoneInfoModel = await res.json();
      setDefaultValue(data);
    });
  }, []);


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

  if (!defaultValue) {
    return <div>Loading...</div>;
  }
  
  return (
    <CommonFormWrapper title="Phone Info">
      <Formik
        initialValues={defaultValue}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          fetch(BASE_SERVICE_API_URL + PHONE_API_PATH, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((res) => res.json())
            .then((data: PhoneInfoModel) => {
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
                  className={`mb-4 ml-10`}
                >
                  {field.type === "text" && (
                    <CustomTextInput
                      required={field.required}
                      label={field.label}
                      name={field.name}
                      value={values[field.name as keyof PhoneInfoModel]}
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
                        values[field.name as keyof PhoneInfoModel]
                      )}
                      handleBlur={handleBlur}
                    />
                  )}
                  {field.type === "dropdown" && (
                    <CustomDropdownInput
                      required={field.required}
                      label={field.label}
                      name={field.name}
                      value={values[field.name as keyof PhoneInfoModel]}
                      handleBlur={handleBlur}
                      defaultValue={
                        defaultValue[field.name as keyof PhoneInfoModel]
                      }
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
