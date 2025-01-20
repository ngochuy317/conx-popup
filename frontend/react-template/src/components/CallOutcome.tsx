import React, { useEffect, useState } from "react";
import { CommonFormWrapper } from "./CommonFormWrapper";
import { FormField } from "../models/FormField";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Formik } from "formik";
import {
  BASE_SERVICE_API_URL,
  CALL_OUTCOME_API_PATH,
} from "../consts/Constance";
import { CallOutcomeInfoModel } from "../models/CallOutcomeInfoModel";
import { CustomDateInput } from "./CustomDateInput";
import { CustomDropdownInput } from "./CustomDropdownInput";
import { CustomTextInput } from "./CustomTextInput";
import * as Yup from "yup";
import { CustomCheckbox } from "./CustomCheckbox";
import { CustomTextAreaInput } from "./CustomTextAreaInput";

export const CallOutcome = () => {
  const formFields: FormField[] = [
    {
      label: "Trả PDS",
      type: "checkbox",
      name: "pds",
      defaultValue: false,
    },
    {
      label: "Final",
      type: "checkbox",
      name: "final",
      defaultValue: false,
    },
    {
      label: "CONTACTED PERSON",
      type: "dropdown",
      name: "contactedPerson",
      options: ["Nam"], // Replace with actual options
      defaultValue: "",
      required: true,
    },
    {
      label: "ACTION CODE",
      type: "dropdown",
      name: "actionCode",
      options: ["Action A", "Action B", "Action C", "ACC"], // Replace with actual options
      defaultValue: "",
      required: true,
    },
    {
      label: "Reason Code",
      type: "dropdown",
      name: "reasonCode",
      options: ["Reason A", "Reason B", "Reason C", "TTA"], // Replace with actual options
      defaultValue: "",
      required: true,
    },
    {
      label: "Ghi chú",
      type: "textarea",
      name: "note",
      defaultValue: "",
    },
    {
      label: "Ngày hứa thanh toán",
      type: "date",
      name: "paymentDate",
      defaultValue: "",
    },
    {
      label: "Số tiền hứa thanh toán",
      type: "text",
      name: "paymentAmount",
      defaultValue: "",
    },
  ];
  const [defaultValue, setDefaultValue] = useState({} as CallOutcomeInfoModel);
  useEffect(() => {
    fetch(BASE_SERVICE_API_URL + CALL_OUTCOME_API_PATH).then(async (res) => {
      const data: CallOutcomeInfoModel = await res.json();
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
    <CommonFormWrapper title="Call Outcome">
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          fetch(BASE_SERVICE_API_URL + CALL_OUTCOME_API_PATH, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((res) => res.json())
            .then((data: CallOutcomeInfoModel) => {
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
                <div key={field.name} className={`mb-4 ml-10`}>
                  {field.type === "text" && (
                    <CustomTextInput
                      required={field.required}
                      label={field.label}
                      name={field.name}
                      value={values[field.name as keyof CallOutcomeInfoModel]}
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
                        values[field.name as keyof CallOutcomeInfoModel]
                      )}
                      handleBlur={handleBlur}
                    />
                  )}
                  {field.type === "dropdown" && (
                    <CustomDropdownInput
                      required={field.required}
                      label={field.label}
                      name={field.name}
                      value={values[field.name as keyof CallOutcomeInfoModel]}
                      handleBlur={handleBlur}
                      defaultValue={
                        defaultValue[
                          field.name as keyof CallOutcomeInfoModel
                        ] ?? field.options?.[0]
                      }
                      options={field.options}
                    />
                  )}
                  {field.type === "checkbox" && (
                    <div style={{ width: "26rem" }}>
                      <CustomCheckbox
                        checked={Boolean(
                          values[field.name as keyof CallOutcomeInfoModel]
                        )}
                        name={field.name}
                        defaultValue={field?.defaultValue as boolean}
                        label={field.label}
                      />
                    </div>
                  )}
                  {field.type === "textarea" && (
                    <CustomTextAreaInput
                      name={field.name}
                      defaultValue={field?.defaultValue as string}
                      label={field.label}
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
