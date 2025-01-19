import {
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import { useField } from "formik";
import React from "react";

interface CustomDropdownInputProps {
  handleChange?: (e: SelectChangeEvent<any>) => void;
  handleBlur?: (e: React.FocusEvent<any>) => void;
  defaultValue?: string;
  value: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}
export const CustomDropdownInput = ({
  handleChange,
  handleBlur,
  value,
  name,
  defaultValue = "",
  label,
  placeholder,
  required = false,
  options,
}: CustomDropdownInputProps) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  const onChange = (e: SelectChangeEvent<any>) => {
    setValue?.(e.target.value);
  };

  const onBlur = (e: React.FocusEvent<any>) => {
    handleBlur?.(e);
  };
  return (
    <div className="w-full">
      <div className="flex items-center">
        {label && (
          <div className="w-32 align-center">
            <p className="text-left flex-end text-md">
              {label}
              {required && <span className="text-red-500">{"*"}</span>}
            </p>
          </div>
        )}
        <FormControl style={{ width: "17rem" }} fullWidth sx={{ ml: 2 }}>
          <Select
            fullWidth
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            defaultValue={defaultValue}
            value={value}
          >
            {options?.length &&
              options.map((option) => (
                <MenuItem value={option}>{option}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
