// import { ContactUsRequest } from "../components/contact-us/contact-us.component";

// export const isChanged = <T extends ContactUsRequest>(
//   originalObject: T,
//   currentObject: T
// ): boolean => {
//   return Object.keys(currentObject).some(
//     (field) => currentObject[field as keyof T] !== originalObject[field as keyof T]
//   );
// };

// export const isValid = <T extends ContactUsRequest>(
//   originalObject: T,
//   currentObject: T,
//   mandatoryFields: string[] = [],
//   customValidation?: () => boolean
// ): boolean => {
//   const isChangedResult = isChanged(originalObject, currentObject);

//   const isValid = mandatoryFields.every((key) => !!currentObject[key as keyof T]);

//   const isCustomValid = customValidation ? customValidation() : true;

//   return isChangedResult && isValid && isCustomValid;
// };

// export const emailValidation = (email: string): boolean => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };