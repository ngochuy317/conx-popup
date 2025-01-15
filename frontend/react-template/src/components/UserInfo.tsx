import { CommonFormWrapper } from "./CommonFormWrapper";
import { Formik } from "formik";
import * as Yup from "yup";
import { CustomTextInput } from "./CustomTextInput";
import { Button } from "@mui/material";
import { CustomDateInput } from "./CustomDateInput";
import dayjs from "dayjs";
import { CustomDropdownInput } from "./CustomDropdownInput";
import { FormField, FormValues } from "../models/FormField";

const formFields: FormField[] = [
  {
    label: "Tên KH",
    type: "text",
    name: "customerName",
    defaultValue: "TRUONG CONG THANH",
    required: true,
  },
  {
    label: "Giới tính",
    type: "dropdown",
    name: "gender",
    options: ["Male", "Female"],
    defaultValue: "Male",
  },
  { label: "CMND", type: "text", name: "cmnd", defaultValue: "19172382" },
  { label: "Ngày sinh", type: "date", name: "dob", defaultValue: "1981-03-23" },
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
    defaultValue: "LD48811600487",
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
    name: "companyCity",
    defaultValue: "",
  },
  { label: "Group", type: "text", name: "group", defaultValue: "" },
];

export const UserInfo = () => {
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
