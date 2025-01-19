import { Checkbox } from "@mui/material";
import { useField } from "formik";
import React from "react";

export interface CustomCheckboxProps {
  defaultValue?: boolean;
  checked?: boolean;
  handleChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  name: string;
  label: string;
}
export const CustomCheckbox = ({
  defaultValue = false,
  handleChange,
  checked,
  name,
  label,
}: CustomCheckboxProps) => {
  const [, , helpers] = useField(name);
  const { setValue } = helpers;

  const handleClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setValue(checked);
    handleChange?.(e, checked);
  };
  return (
    <div className="w-full">
      <div className="">
        {label && (
          <div className="w-20">
            <p className="text-left flex-end text-md">{label}</p>
          </div>
        )}
        <Checkbox
          name={name}
          checked={checked}
          defaultChecked={defaultValue}
          onChange={handleClick}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
    </div>
  );
};
