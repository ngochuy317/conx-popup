import React from "react";
import { FormField, FormValues } from "../models/FormField";
import * as Yup from "yup";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Formik } from "formik";
import { CommonFormWrapper } from "./CommonFormWrapper";
import { CustomDateInput } from "./CustomDateInput";
import { CustomDropdownInput } from "./CustomDropdownInput";
import { CustomTextInput } from "./CustomTextInput";

export const PaymentInfo = () => {
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
      label: "First Paid Date",
      type: "date",
      name: "firstPaidDate",
      defaultValue: "DD/MM/YYYY",
    },
    {
      label: "Số tài khoản",
      type: "text",
      name: "accountNumber",
      defaultValue: "139489028",
    },
    {
      label: "Số tiền thanh toán gần nhất",
      type: "text",
      name: "latestPaymentAmount",
      defaultValue: "19,000,000",
    },
    {
      label: "Ngày thanh toán gần nhất",
      type: "date",
      name: "latestPaymentDate",
      defaultValue: "MM/DD/YYYY",
    },
    {
      label: "Disbursement Date",
      type: "text",
      name: "disbursementDate",
      defaultValue: "43416",
    },
    { label: "cif", type: "text", name: "cif", defaultValue: "" },
    {
      label: "Due Date Overdue",
      type: "date",
      name: "dueDateOverdue",
      defaultValue: "MM/DD/YYYY",
    },
    {
      label: "Ngày đến hạn chu kỳ tiếp theo",
      type: "date",
      name: "nextCycleDueDate",
      defaultValue: "MM/DD/YYYY",
    },
    {
      label: "Số tiền phải đóng trong chu kỳ tiếp theo",
      type: "text",
      name: "nextCyclePayment",
      defaultValue: "",
    },
    {
      label: "Future PRIN AMT",
      type: "text",
      name: "futurePrincipalAmount",
      defaultValue: "",
    },
    {
      label: "Remain PRIN",
      type: "text",
      name: "remainingPrincipal",
      defaultValue: "",
    },
    {
      label: "POS BOM",
      type: "text",
      name: "posBom",
      defaultValue: "13,817,660",
    },
  ];
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
  const initialValues: FormValues = formFields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue;
    return acc;
  }, {} as FormValues);
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
            <div className="">
              {formFields.map((field, index) => (
                <div
                  key={field.name}
                  className={`mb-4`}
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
