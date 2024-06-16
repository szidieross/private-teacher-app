import md5 from "md5";

export const hashPassword = (password: string): string => {
  const hashedPassword = md5(password);
  return hashedPassword;
};

export const isStrongPassword = (password: string): boolean => {
  const minLength = password.length >= 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialCharacter = /[$&+,:;=?@#|'<>.^*()%!-]/.test(password);

  return (
    minLength &&
    hasLowercase &&
    hasUppercase &&
    hasNumber &&
    hasSpecialCharacter
  );
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^\d{10,}$/;
  return phoneRegex.test(phoneNumber);
};

export const formatDate = (date: string | Date): string => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  
  const formattedDate = parsedDate.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = parsedDate.toLocaleTimeString("hu-HU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate}, ${formattedTime}`;
};

