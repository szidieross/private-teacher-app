"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Snackbar,
  Paper,
  Box,
} from "@mui/material";
import "./signup.scss";
import useUsersService from "@/app/(client)/services/user.service";
import { isValidEmail, isValidPhoneNumber } from "@/app/api/utils/user.util";
import { colors } from "@/app/(client)/constants/color.constant";
import { UserModel } from "@/app/api/models/user.model";

export interface ContactUsRequest {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  role: string;
  price: number | string;
  bio: string;
  qualification: string;
  location: string;
}

const initContactForm: ContactUsRequest = {
  username: "",
  firstName: "",
  lastName: "",
  password: "",
  email: "",
  phone: "",
  role: "",
  price: 0,
  bio: "",
  qualification: "",
  location: "",
};

const Signup = () => {
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const { createUser, getUsers } = useUsersService();
  const [form, setContactForm] = useState<ContactUsRequest | null>(null);
  const [errors, setErrors] = useState<Partial<ContactUsRequest>>({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleToggeleButtonChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: boolean
  ) => {
    setIsTeacher(newType);
    handleContactFormChange("role", newType ? "teacher" : "user");
  };

  const handleContactFormChange = (
    property: keyof ContactUsRequest,
    value: string
  ) => {
    setContactForm((prevState) => {
      if (!prevState) {
        const initialState: ContactUsRequest = initContactForm;
        return {
          ...initialState,
          [property]: value,
        };
      } else {
        return {
          ...prevState,
          [property]: value,
        };
      }
    });
  };

  const validateForm = () => {
    const newErrors: Partial<ContactUsRequest> = {};
    if (!form) return false;

    if (!form.firstName) {
      newErrors.firstName = "Firstname is required.";
    }
    if (!form.lastName) {
      newErrors.lastName = "Lastname is required.";
    }
    if (!form.username) {
      newErrors.username = "Username is required.";
    }
    if (!form.password) {
      newErrors.password = "Password is required.";
    }
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!isValidPhoneNumber(form.phone)) {
      newErrors.phone = "Phone number is invalid.";
    }

    if (isTeacher && form.price && +form.price <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    try {
      const users: UserModel[] = await getUsers();
      const usernameExists = users.some(
        (user) => user.username === form?.username
      );
      const emailExists = users.some((user) => user.email === form?.email);
      if (usernameExists) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "Username already exists, please choose another one",
        }));
        return;
      }
      if (emailExists) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email already exists.",
        }));
        return;
      }

      // const users: UserModel[] = await getUsers();
      // console.log("userssssss", users);
      // const usernameExists = users.filter(
      //   (user) => user.username === form?.username
      // );
      // const emailExists = users.filter((user) => user.email === form?.email);
      // if (usernameExists) {
      //   setErrors({
      //     username: "Username already exists, please chose another one",
      //   });
      //   return;
      // }
      // if (emailExists) {
      //   setErrors({
      //     email: "Email already exists.",
      //   });
      //   return;
      // }

      let result = null;

      if (!form) return;
      if (isTeacher) {
        result = await createUser(
          form.username,
          form.password,
          form.email,
          form.phone,
          form.firstName,
          form.lastName,
          isTeacher ? "teacher" : "user",
          +form.price,
          form.bio,
          form.qualification,
          form.location
        );
      } else {
        result = await createUser(
          form.username,
          form.password,
          form.email,
          form.phone,
          form.firstName,
          form.lastName,
          isTeacher ? "teacher" : "user",
          0,
          "",
          "",
          ""
        );
      }

      setContactForm(initContactForm);

      setOpenSnackbar(true);
      setSnackbarMessage("Registration successful!");
    } catch (error) {
      setOpenSnackbar(true);
      setSnackbarMessage("Registration failed. Please try again.");
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box
              sx={{ bgcolor: colors.background, borderRadius: 5 }}
              p={2}
              m={3}
            >
              <ToggleButtonGroup
                value={isTeacher}
                exclusive
                onChange={handleToggeleButtonChange}
                aria-label="user-type"
                sx={{
                  width: "fit-content",
                  maxHeight: "fit-content",
                }}
              >
                <ToggleButton
                  value={false}
                  aria-label="left aligned"
                  disableRipple
                  sx={{
                    "&.Mui-selected": {
                      bgcolor: colors.primary,
                      color: "#fff",
                    },
                    "&:hover": {
                      bgcolor: colors.mediumPurple,
                    },
                  }}
                >
                  User
                </ToggleButton>
                <ToggleButton
                  value={true}
                  aria-label="centered"
                  disableRipple
                  sx={{
                    "&.Mui-selected": {
                      bgcolor: colors.primary,
                      color: "#fff",
                    },
                    "&:hover": {
                      bgcolor: colors.mediumPurple,
                    },
                  }}
                >
                  Teacher
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Grid>
        </Grid>
        <Paper>
          <Box p={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="First Name*"
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  error={!!errors.firstName}
                  value={form?.firstName}
                  onChange={(e) =>
                    handleContactFormChange("firstName", e.target.value)
                  }
                />{" "}
                {errors.firstName && (
                  <Typography className="error-message">
                    {errors.firstName}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Last Name*"
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  error={!!errors.lastName}
                  value={form?.lastName}
                  onChange={(e) =>
                    handleContactFormChange("lastName", e.target.value)
                  }
                />{" "}
                {errors.lastName && (
                  <Typography className="error-message">
                    {errors.lastName}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Username*"
                  variant="outlined"
                  fullWidth
                  name="username"
                  error={!!errors.username}
                  value={form?.username}
                  onChange={(e) =>
                    handleContactFormChange("username", e.target.value)
                  }
                />
                {errors.username && (
                  <Typography className="error-message">
                    {errors.username}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  label="Password*"
                  variant="outlined"
                  name="password"
                  fullWidth
                  error={!!errors.password}
                  value={form?.password}
                  onChange={(e) =>
                    handleContactFormChange("password", e.target.value)
                  }
                />
                {errors.password && (
                  <Typography className="error-message">
                    {errors.password}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  label="Email*"
                  variant="outlined"
                  name="email"
                  fullWidth
                  value={form?.email}
                  error={!!errors.email}
                  onChange={(e) =>
                    handleContactFormChange("email", e.target.value)
                  }
                />{" "}
                {errors.email && (
                  <Typography className="error-message">
                    {errors.email}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone*"
                  variant="outlined"
                  fullWidth
                  name="phone"
                  error={!!errors.phone}
                  value={form?.phone}
                  onChange={(e) =>
                    handleContactFormChange("phone", e.target.value)
                  }
                />{" "}
                {errors.phone && (
                  <Typography className="error-message">
                    {errors.phone}
                  </Typography>
                )}
              </Grid>
              {isTeacher && (
                <>
                  <Grid item xs={6}>
                    <TextField
                      label="Location"
                      variant="outlined"
                      fullWidth
                      name="location"
                      value={form?.location}
                      onChange={(e) =>
                        handleContactFormChange("location", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="number"
                      label="Price"
                      variant="outlined"
                      name="price"
                      fullWidth
                      error={!!errors.price}
                      value={form?.price}
                      onChange={(e) =>
                        handleContactFormChange("price", e.target.value)
                      }
                    />{" "}
                    {errors.price && (
                      <Typography className="error-message">
                        {errors.price}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Qualification"
                      variant="outlined"
                      fullWidth
                      name="qualification"
                      value={form?.qualification}
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
                      value={form?.bio}
                      name="bio"
                      onChange={(e) =>
                        handleContactFormChange("bio", e.target.value)
                      }
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    bgcolor: colors.primary,
                    "&:hover": {
                      bgcolor: colors.mediumPurple,
                    },
                  }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default Signup;
