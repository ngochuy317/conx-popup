import { useContext, useEffect, useState } from "react";
import { CommonFormWrapper } from "./CommonFormWrapper";
import * as Yup from "yup";
import { FormField } from "../models/FormField";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Formik } from "formik";
import { CustomDateInput } from "./CustomDateInput";
import { CustomDropdownInput } from "./CustomDropdownInput";
import { CustomTextInput } from "./CustomTextInput";
import { BASE_SERVICE_API_URL, CONTACT_API_PATH } from "../consts/Constance";
import { ContactInfoModel } from "../models/ContactInfoModel";
import { ErrorContext } from "../context/ErrorContext";
import { ToastTypeEnum } from "../enum/ToastTypeEnum";

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
    { label: "OBS Due No", type: "text", name: "obsDueNo", defaultValue: "" },
    {
      label: "Ngày đề nghị thanh toán",
      type: "date",
      name: "paymentRequestDate",
      defaultValue: "",
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
      defaultValue: "",
    },
    {
      label: "Số tiền phát phát sinh",
      type: "text",
      name: "penaltyAmount",
      defaultValue: "",
    },
    {
      label: "Số tiền lãi phát sinh",
      type: "text",
      name: "interestAmount",
      defaultValue: "",
    },
    {
      label: "Số tiền nợ gốc đã phát sinh",
      type: "text",
      name: "principalAmount",
      defaultValue: "",
    },
    {
      label: "POS Assign",
      type: "text",
      name: "posAssign",
      defaultValue: "",
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

  const [defaultValue, setDefaultValue] = useState({} as ContactInfoModel);
  const { setErrorMessage } = useContext(ErrorContext);

  useEffect(() => {
    fetch(BASE_SERVICE_API_URL + CONTACT_API_PATH).then(async (res) => {
      const data: ContactInfoModel = await res.json();
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
    <CommonFormWrapper title="Contact Info">
      <Formik
        initialValues={defaultValue}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          fetch(BASE_SERVICE_API_URL + CONTACT_API_PATH, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((res) => res.json())
            .then((data: ContactInfoModel) => {
              setErrorMessage({
                message: "Success",
                type: ToastTypeEnum.SUCCESS,
              });
              setDefaultValue(data);
            })
            .catch((error) => {
              setErrorMessage({
                message: "Failed to submit!",
                type: ToastTypeEnum.FAILED,
              });
              console.error("Failed to update data:", error);
            })
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
                      value={values[field.name as keyof ContactInfoModel]}
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
                        values[field.name as keyof ContactInfoModel]
                      )}
                      handleBlur={handleBlur}
                    />
                  )}
                  {field.type === "dropdown" && (
                    <CustomDropdownInput
                      required={field.required}
                      label={field.label}
                      name={field.name}
                      value={values[field.name as keyof ContactInfoModel]}
                      handleBlur={handleBlur}
                      defaultValue={
                        defaultValue[field.name as keyof ContactInfoModel]
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
