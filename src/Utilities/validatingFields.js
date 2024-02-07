import { checkFieldEmpty } from "./checkFieldEmpty";

export const validatingInputs = (formData) => {
  if (formData?.firstName && !checkFieldEmpty(formData?.firstName)) {
    return "Name cannot be empty";
  } else if (!checkFieldEmpty(formData?.email)) {
    return "Email cannot be empty";
  } else if (!checkFieldEmpty(formData?.password)) {
    return "Password cannot be empty";
  }
  return "";
};
