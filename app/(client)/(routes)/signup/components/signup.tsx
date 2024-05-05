"use client";

import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import "./signup.scss";
import useUsersService from "@/app/(client)/services/user.service";
import { UserModel } from "@/app/api/models/user.model";
import { TeacherModel } from "@/app/api/models/teacher.model";

export interface ContactUsRequest {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  profilePicture: string;
  role: string;
  price?: number;
  bio?: string;
  qualification?: string;
  location?: string;
}

const Signup = () => {
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const { createUser } = useUsersService();

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newType: boolean
  ) => {
    setIsTeacher(newType);
  };
  const [loading, setLoading] = useState<boolean>(false);

  const [form, setContactForm] = useState<ContactUsRequest | null>(null);

  //   const handleContactFormChange = (
  //     property: keyof ContactUsRequest,
  //     value: string
  //   ) => {
  //     setContactForm((prevState) => ({
  //       ...prevState,
  //       [property]: value,
  //     }));
  //   };

  //   const handleContactFormChange = (
  //     property: keyof ContactUsRequest,
  //     value: string
  //   ): void => {
  //     setContactForm((prevState) => {
  //     //   if (!prevState) return null; // Handling null case
  //       return {
  //         ...prevState,
  //         [property]: value,
  //       };
  //     });
  //     console.log(form)
  //   };

  const handleContactFormChange = (
    property: keyof ContactUsRequest,
    value: string
  ) => {
    setContactForm((prevState) => {
      if (!prevState) {
        // If previous state is null, initialize a new ContactUsRequest object
        const initialState: ContactUsRequest = {
          username: "",
          firstName: "",
          lastName: "",
          password: "",
          email: "",
          phone: "",
          profilePicture: "",
          role: "",
        };
        return {
          ...initialState,
          [property]: value,
        };
      } else {
        // If previous state is not null, update it normally
        return {
          ...prevState,
          [property]: value,
        };
      }
    });
    console.log(form)
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // if (!form) return;

    console.log("HEYYYYY");
    try {
      setLoading(true);
      const result = await createUser(
        form!.username,
        form!.password,
        form!.email,
        form!.phone,
        form!.profilePicture,
        form!.firstName,
        form!.lastName,
        form!.role
      );
      if (result) {
        // Optionally, handle successful registration (e.g., redirect user)
        console.log("User registered successfully:", result);
      } else {
        console.error("Error registering user:", result);
        // Optionally, handle registration error (e.g., display error message)
      }
    } catch (error) {
      console.error("Error registering user:", error);
      // Optionally, handle registration error (e.g., display error message)
    } finally {
      setLoading(false);
    }
  };

  //   const handleSubmit = async (e: React.FormEvent): Promise<void> => {
  //     setLoading(true);
  //     e.preventDefault();

  //     setLoading(false);
  //   };
  //////////////////////////////////////////////////////////////////////

  //   con

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={isTeacher}
              exclusive
              onChange={handleAlignment}
              aria-label="user-type"
            >
              <ToggleButton
                value={false}
                aria-label="left aligned"
                disableRipple
              >
                User
              </ToggleButton>
              <ToggleButton value={true} aria-label="centered" disableRipple>
                Teacher
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              required
              name="firstName"
              onChange={(e) =>
                handleContactFormChange("firstName", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              required
              name="lastName"
              onChange={(e) =>
                handleContactFormChange("lastName", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              name="username"
              required
              onChange={(e) =>
                handleContactFormChange("username", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              name="password"
              fullWidth
              required
              onChange={(e) =>
                handleContactFormChange("password", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              name="email"
              fullWidth
              required
              onChange={(e) => handleContactFormChange("email", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              name="phone"
              onChange={(e) => handleContactFormChange("phone", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="file"
              label="Profile Picture"
              variant="outlined"
              name="profilePicture"
              fullWidth
              onChange={(e) =>
                handleContactFormChange("profilePicture", e.target.value)
              }
            />
          </Grid>
          {isTeacher && (
            <>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  label="Price"
                  variant="outlined"
                  name="price"
                  fullWidth
                  onChange={(e) =>
                    handleContactFormChange("price", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Qualification"
                  variant="outlined"
                  fullWidth
                  name="qualification"
                  onChange={(e) =>
                    handleContactFormChange("qualification", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Bio"
                  variant="outlined"
                  fullWidth
                  multiline
                  name="bio"
                  onChange={(e) =>
                    handleContactFormChange("bio", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Location"
                  variant="outlined"
                  fullWidth
                  name="location"
                  onChange={(e) =>
                    handleContactFormChange("location", e.target.value)
                  }
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Signup;

// ("use client");
// import React, { FC, useEffect, useState } from "react";
// import {
//   TextField,
//   FormControl,
//   Select,
//   MenuItem,
//   Link,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import Typography from "../typography/typography.component";
// import StyledWrapper from "./contact-us.style";
// import useMailService from "../../services/mail.service";
// import { usePopupContext } from "../../hooks/context.hook";
// import { Options } from "../../contexts/popup.context";
// import { emailValidation, isValid } from "../../utils/validation.util";

// const defaultSubjects = [
//   "General Enquiry",
//   "Launch Community",
//   "Partnership",
//   "Engines",
// ];

// const initFormContact = {
//   name: "",
//   email: "",
//   subject: defaultSubjects[0],
//   message: "",
// };

// export interface ContactUsRequest {
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
// }

// type Props = {
//   subjects?: string[];
//   customSubject?: string;
// };

// const ContactUs: FC<Props> = ({ subjects, customSubject }) => {
//   const { sendEmail } = useMailService();
//   const { setOptions } = usePopupContext();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [sendable, setSendable] = useState<boolean>(false);

//   const [contactForm, setContactForm] =
//     useState<ContactUsRequest>(initFormContact);

//   useEffect(() => {
//     const valid = isValid(
//       initFormContact,
//       contactForm,
//       ["name", "email", "subject", "message"],
//       () => emailValidation(contactForm.email)
//     );

//     setSendable(valid);
//   }, [contactForm, customSubject]);

//   const handleContactFormChange = (
//     property: keyof ContactUsRequest,
//     value: string
//   ) => {
//     setContactForm((prevState) => ({
//       ...prevState,
//       [property]: value,
//     }));
//   };

//   const getCaptchaToken = (): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       try {
//         window.grecaptcha.ready(() => {
//           window.grecaptcha
//             .execute("6LfAjcYeAAAAAJTxnTgx_JVndCSmQgU1gqzEIwoL", {
//               action: "submit",
//             })
//             .then((token) => {
//               resolve(token);
//             });
//         });
//       } catch (error) {
//         reject(error);
//       }
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent): Promise<void> => {
//     setLoading(true);
//     e.preventDefault();

//     const formData = { ...contactForm, token: await getCaptchaToken() };

//     const result = await sendEmail(formData);
//     if (result === "success") {
//       setContactForm(initFormContact);
//       setOptions({} as Options);
//     }
//     setLoading(false);
//   };

//   return (
//     <StyledWrapper>
//       <form onSubmit={handleSubmit} className="contact-us--form">
//         <TextField
//           className="contact-us--textfield"
//           fullWidth
//           label={
//             <Typography
//               className="contact-us--textfield-typography"
//               variant="main"
//             >
//               NAME
//             </Typography>
//           }
//           name="name"
//           variant="outlined"
//           onChange={(e) => handleContactFormChange("name", e.target.value)}
//           required
//           inputProps={{ maxLength: 37 }}
//         />
//         <TextField
//           className="contact-us--textfield"
//           fullWidth
//           label={
//             <Typography
//               className="contact-us--textfield-typography"
//               variant="main"
//             >
//               EMAIL
//             </Typography>
//           }
//           name="email"
//           variant="outlined"
//           onChange={(e) => handleContactFormChange("email", e.target.value)}
//           required
//           type="email"
//           inputProps={{ maxLength: 37 }}
//         />
//         <FormControl fullWidth variant="outlined">
//           <Select
//             className="contact-us--textfield"
//             onChange={(e) => handleContactFormChange("subject", e.target.value)}
//             required
//             displayEmpty
//             inputProps={{ "aria-label": "Without label" }}
//             defaultValue={
//               customSubject ? customSubject : (subjects ?? defaultSubjects)[0]
//             }
//           >
//             {(subjects ?? defaultSubjects).map((subject, index) => (
//               <MenuItem key={index} value={subject}>
//                 {subject}
//               </MenuItem>
//             ))}
//             {customSubject && (
//               <MenuItem value={customSubject}>{customSubject}</MenuItem>
//             )}
//           </Select>
//         </FormControl>
//         <TextField
//           fullWidth
//           className="contact-us--textfield contact-us--text-area"
//           label={
//             <Typography
//               className="contact-us--textfield-typography"
//               variant="main"
//             >
//               MESSAGE
//             </Typography>
//           }
//           name="message"
//           onChange={(e) => handleContactFormChange("message", e.target.value)}
//           multiline
//           variant="outlined"
//           required
//         />
//         <Typography className="contact-us--typography-protected" variant="main">
//           This site is protected by reCAPTCHA and the Google{" "}
//           <Link
//             href="https://policies.google.com/privacy"
//             target="_blank"
//             className="contact-us--link"
//           >
//             Privacy Policy
//           </Link>{" "}
//           and{" "}
//           <Link
//             href="https://policies.google.com/terms"
//             target="_blank"
//             className="contact-us--link"
//           >
//             Terms of Service
//           </Link>{" "}
//           apply.
//         </Typography>
//         {loading ? (
//           <CircularProgress />
//         ) : (
//           <Button
//             type="submit"
//             className={
//               sendable
//                 ? "contact-us--button"
//                 : "contact-us--button contact-us--button-disabled"
//             }
//             disabled={!sendable}
//           >
//             <Typography
//               variant="mainSemiBold"
//               className="contact-us--button-typography"
//             >
//               Send message
//             </Typography>
//           </Button>
//         )}
//       </form>
//     </StyledWrapper>
//   );
// };

// export default ContactUs;
