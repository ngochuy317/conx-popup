import { CommonFormWrapper } from "./CommonFormWrapper";
import { Formik } from "formik";
import * as Yup from "yup";
import { CustomTextInput } from "./CustomTextInput";
import { Button } from "@mui/material";
import { CustomDateInput } from "./CustomDateInput";
import dayjs from "dayjs";
import { CustomDropdownInput } from "./CustomDropdownInput";
import { FormField } from "../models/FormField";
import { useState, useEffect } from "react";
import { CustomerInfoModel } from "../models/CustomerInfoModel";
import { BASE_SERVICE_API_URL, CUSTOMER_API_PATH } from "../consts/Constance";

const formFields: FormField[] = [
  {
    label: "Tên KH",
    type: "text",
    name: "name",
    defaultValue: "",
    required: true,
  },
  {
    label: "Giới tính",
    type: "dropdown",
    name: "gender",
    options: ["Male", "Female"],
    defaultValue: "",
  },
  { label: "CMND", type: "text", name: "idNumber", defaultValue: "19172382" },
  {
    label: "Ngày sinh",
    type: "date",
    name: "dayOfBirth",
    defaultValue: "",
  },
  {
    label: "Family Relation",
    type: "text",
    name: "familyRelation",
    defaultValue: "",
  },
  { label: "Agency", type: "text", name: "agency", defaultValue: "CNX" },
  {
    label: "Số hợp đồng",
    type: "text",
    name: "contractNumber",
    defaultValue: "",
  },
  { label: "Tên công ty", type: "text", name: "companyName", defaultValue: "" },
  {
    label: "Địa chỉ công ty",
    type: "text",
    name: "companyAddress",
    defaultValue: "",
  },
  {
    label: "Địa chỉ công ty - Quận/Huyện",
    type: "text",
    name: "companyDistrict",
    defaultValue: "",
  },
  {
    label: "Địa chỉ công ty - Tỉnh/TP",
    type: "text",
    name: "companyProvince",
    defaultValue: "",
  },
  { label: "Group", type: "text", name: "group", defaultValue: "" },
];

export const UserInfo = () => {
  const [defaultValue, setDefaultValue] = useState({} as CustomerInfoModel);
  useEffect(() => {
    fetch(BASE_SERVICE_API_URL + CUSTOMER_API_PATH).then(async (res) => {
      const data: CustomerInfoModel = await res.json();
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
    <CommonFormWrapper title="Customer Info">
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          fetch(BASE_SERVICE_API_URL + CUSTOMER_API_PATH, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((res) => res.json())
            .then((data: CustomerInfoModel) => {
              setDefaultValue(data);
            })
            .catch((error) => console.error("Failed to update data:", error))
            .finally(() => setSubmitting(false));
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
              {formFields.map((field) => (
                <div
                  key={field.name}
                  className={`mb-4 ml-10`}
                >
                  {field.type === "text" && (
                    <CustomTextInput
                      required={field.required}
                      label={field.label}
                      name={field.name}
                      value={values[field.name as keyof CustomerInfoModel]}
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
                        values[field.name as keyof CustomerInfoModel]
                      )}
                      handleBlur={handleBlur}
                    />
                  )}
                  {field.type === "dropdown" && (
                    <CustomDropdownInput
                      defaultValue={
                        defaultValue[field.name as keyof CustomerInfoModel] ?? "Male"
                      }
                      required={field.required}
                      label={field.label}
                      name={field.name}
                      value={values[field.name as keyof CustomerInfoModel]}
                      handleBlur={handleBlur}
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
