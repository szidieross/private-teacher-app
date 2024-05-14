import md5 from "md5";

export const hashPassword = (password: string): string => {
  const hashedPassword = md5(password);
  return hashedPassword;
};