import React from "react";
import { CommonFormWrapper } from "./CommonFormWrapper";
import * as Yup from "yup";
import { FormField, FormValues } from "../models/FormField";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Formik } from "formik";
import { CustomDateInput } from "./CustomDateInput";
import { CustomDropdownInput } from "./CustomDropdownInput";
import { CustomTextInput } from "./CustomTextInput";

export const ContactInfo = () => {
  const formFields: FormField[] = [
    {
      label: "Loan ID",
      type: "text",
      name: "loanId",
      defaultValue: "Nhắc ông Trịnh Phương Nam về",
    },
    {
      label: "Số hợp đồng",
      type: "text",
      name: "contractNumber",
      defaultValue: "LD1831600497",
    },
    {
      label: "Contract Date",
      type: "date",
      name: "contractDate",
      defaultValue: "12/11/2018",
    },
    {
      label: "Current Account",
      type: "text",
      name: "currentAccount",
      defaultValue: "",
    },
    {
      label: "DPD Current",
      type: "text",
      name: "dpdCurrent",
      defaultValue: "1785",
    },
    {
      label: "DPD Assign",
      type: "text",
      name: "dpdAssign",
      defaultValue: "1785",
    },
    { label: "MOB", type: "text", name: "mob", defaultValue: "" },
    {
      label: "Số tiền vay",
      type: "text",
      name: "loanAmount",
      defaultValue: "",
    },
    {
      label: "Số kỳ hạn vay",
      type: "text",
      name: "loanTerm",
      defaultValue: "",
    },
    { label: "OBS Due No", type: "text", name: "obsDueNo", defaultValue: "0" },
    {
      label: "Ngày đề nghị thanh toán",
      type: "date",
      name: "paymentProposalDate",
      defaultValue: "0",
    },
    {
      label: "Số ngày trễ hạn",
      type: "text",
      name: "lateDays",
      defaultValue: "",
    },
    {
      label: "Số tiền phải đóng hàng tháng",
      type: "text",
      name: "monthlyPayment",
      defaultValue: "",
    },
    {
      label: "Assign Invalid Date",
      type: "date",
      name: "assignInvalidDate",
      defaultValue: "MM/DD/YYYY",
    },
    {
      label: "Số tiền phát phát sinh",
      type: "text",
      name: "arisingAmount",
      defaultValue: "0",
    },
    {
      label: "Số tiền lãi phát sinh",
      type: "text",
      name: "interestArising",
      defaultValue: "25,494,693",
    },
    {
      label: "Số tiền nợ gốc đã phát sinh",
      type: "text",
      name: "principalArising",
      defaultValue: "13,817,660",
    },
    {
      label: "POS Assign",
      type: "text",
      name: "posAssign",
      defaultValue: "13,817,660",
    },
    {
      label: "Tổng số tiền thanh toán",
      type: "text",
      name: "totalPayment",
      defaultValue: "25,494,693",
    },
    {
      label: "Last Result Final",
      type: "text",
      name: "lastResultFinal",
      defaultValue: "",
    },
    {
      label: "Total_Amount",
      type: "text",
      name: "totalAmount",
      defaultValue: "",
    },
    { label: "Date Start", type: "date", name: "dateStart", defaultValue: "" },
    { label: "Date End", type: "date", name: "dateEnd", defaultValue: "" },
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
    <CommonFormWrapper title="Contact Info">
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
