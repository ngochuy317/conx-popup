export interface FormField {
  label: string;
  type: "text" | "dropdown" | "date";
  name: string;
  defaultValue: string;
  options?: string[];
  required?: boolean;
}

export interface FormValues {
  [key: string | number]: string;
}
