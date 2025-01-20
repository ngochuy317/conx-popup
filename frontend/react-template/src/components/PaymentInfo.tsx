import { useContext, useEffect, useState } from "react";
import { FormField } from "../models/FormField";
import * as Yup from "yup";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Formik } from "formik";
import { CommonFormWrapper } from "./CommonFormWrapper";
import { CustomDateInput } from "./CustomDateInput";
import { CustomDropdownInput } from "./CustomDropdownInput";
import { CustomTextInput } from "./CustomTextInput";
import { PaymentInfoModel } from "../models/PaymentInfoModel";
import { BASE_SERVICE_API_URL, PAYMENT_API_PATH } from "../consts/Constance";
import { ErrorContext } from "../context/ErrorContext";
import { ToastTypeEnum } from "../enum/ToastTypeEnum";

export const PaymentInfo = () => {
  const [defaultValue, setDefaultValue] = useState({} as PaymentInfoModel);
  const { setErrorMessage } = useContext(ErrorContext);

  useEffect(() => {
    fetch(BASE_SERVICE_API_URL + PAYMENT_API_PATH).then(async (res) => {
      const data: PaymentInfoModel = await res.json();
      setDefaultValue(data);
    });
  }, []);

  const formFields: FormField[] = [
    {
      label: "First Paid Date",
      type: "date",
      name: "firstPaidDate",
      defaultValue: "",
    },
    {
      label: "Số tài khoản",
      type: "text",
      name: "accountNumber",
      defaultValue: "",
    },
    {
      label: "Số tiền thanh toán gần nhất",
      type: "text",
      name: "largestAmount",
      defaultValue: "",
    },
    {
      label: "Ngày thanh toán gần nhất",
      type: "date",
      name: "lastPaymentDate",
      defaultValue: "",
    },
    {
      label: "Disbursement Date",
      type: "text",
      name: "disbursementDate",
      defaultValue: "",
    },
    { label: "cif", type: "text", name: "cif", defaultValue: "" },
    {
      label: "Due Date Overdue",
      type: "date",
      name: "dueDateOverdue",
      defaultValue: "",
    },
    {
      label: "Ngày đến hạn chu kỳ tiếp theo",
      type: "date",
      name: "nextDueDate",
      defaultValue: "",
    },
    {
      label: "Số tiền phải đóng trong chu kỳ tiếp theo",
      type: "text",
      name: "nextDueAmount",
      defaultValue: "",
    },
    {
      label: "Future PRIN AMT",
      type: "text",
      name: "futurePrinAmt",
      defaultValue: "",
    },
    {
      label: "Remain PRIN",
      type: "text",
      name: "remainPrin",
      defaultValue: "",
    },
    {
      label: "POS BOM",
      type: "text",
      name: "posBom",
      defaultValue: "dsadasd",
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

  if (!defaultValue) {
    return <div>Loading...</div>;
  }

  return (
    <CommonFormWrapper title="Contact Info">
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          fetch(BASE_SERVICE_API_URL + PAYMENT_API_PATH, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((res) => res.json())
            .then((data: PaymentInfoModel) => {
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
            <div className="">
              {formFields.map((field) => (
                <div key={field.name} className={`mb-4 ml-10`}>
                  {field.type === "text" && (
                    <CustomTextInput
                      required={field.required}
                      label={field.label}
                      name={field.name as keyof PaymentInfoModel}
                      value={values[field.name as keyof PaymentInfoModel]}
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
                        values[field.name as keyof PaymentInfoModel]
                      )}
                      handleBlur={handleBlur}
                    />
                  )}
                  {field.type === "dropdown" && (
                    <CustomDropdownInput
                      required={field.required}
                      label={field.label}
                      name={field.name}
                      value={values[field.name as keyof PaymentInfoModel]}
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
