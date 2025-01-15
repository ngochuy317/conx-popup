import { DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useField } from "formik";
import React from "react";

export interface CustomDateInputProps {
  setValue?: (value:any) => void;
  handleBlur?: (e: React.FocusEvent<any>) => void;
  defaultValue?: string;
  value: Dayjs;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export const CustomDateInput = ({
  label,
  required,
  defaultValue,
  value,
  name,
  handleBlur
}: CustomDateInputProps) => {

    const [field, meta, helpers] = useField(name);
    const { setValue } = helpers;

    const onChange = (e: Dayjs | null) => {
        setValue?.(e);
    };
  
    const onBlur = (e: React.FocusEvent<any>) => {
      handleBlur?.(e);
    };

    
  return (
    <div className="flex items-center w-full">
      {label && (
        <div className="w-56 align-center">
          <p className="text-left text-md">
            {label}
            {required && <span className="text-red-500">{"*"}</span>}
          </p>
        </div>
      )}
      <DateField
        fullWidth
        label="Date"
        defaultValue={dayjs(defaultValue)}
        onChange={onChange}
        onBlur={onBlur}
        required
        value={value}
      />

      {/* <TextField
          placeholder={placeholder}
          fullWidth
          required={required}
          type="text"
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={defaultValue}
          value={value}
          error={!!(meta.touched && meta.error)}
          helperText={meta.error}
        /> */}
    </div>
  );
};
