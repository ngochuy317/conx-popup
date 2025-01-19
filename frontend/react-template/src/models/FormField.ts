export interface FormField {
  label: string;
  type: "text" | "dropdown" | "date" | "checkbox" | "textarea";
  name: string;
  defaultValue: string | boolean;
  options?: string[];
  required?: boolean;
}

export interface FormValues {
  [key: string | number]: string;
}
