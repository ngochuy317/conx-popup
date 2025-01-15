import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

export interface CustomTextInputProps {
  handleChange?: (e: string | React.ChangeEvent<any>) => void;
  handleBlur?: (e: React.FocusEvent<any>) => void;
  defaultValue?: string;
  value: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}
export const CustomTextInput = ({
  handleChange,
  handleBlur,
  value,
  name,
  defaultValue = "",
  label,
  placeholder,
  required = false,
}: CustomTextInputProps) => {

  const [field, meta] = useField(name);
  
  const onChange = (e: React.ChangeEvent<any>) => {
    handleChange?.(e);
  };

  const onBlur = (e: React.FocusEvent<any>) => {
    handleBlur?.(e);
  };

  return (
    <div>
      <div className="flex items-center">
        {label && (
          <div className="w-56 align-center">
            <p className="text-left flex-end text-md">
              {label}
              {required && <span className="text-red-500">{"*"}</span>}
            </p>
          </div>
        )}
        <TextField
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
        />
      </div>
    </div>
  );
};
