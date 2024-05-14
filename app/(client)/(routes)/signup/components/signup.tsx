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
} from "@mui/material";
import "./signup.scss";
import useUsersService from "@/app/(client)/services/user.service";
import { isValidEmail, isValidPhoneNumber } from "@/app/api/utils/user.util";

export interface ContactUsRequest {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  //   profilePicture: string;
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
  //   profilePicture: "",
  role: "",
  price: 0,
  bio: "",
  qualification: "",
  location: "",
};

const Signup = () => {
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const { createUser } = useUsersService();
  const [form, setContactForm] = useState<ContactUsRequest | null>(null);
  const [errors, setErrors] = useState<Partial<ContactUsRequest>>({});

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
    });  };

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
      let result = null;
      if (form?.price && form?.bio && form?.qualification && form?.location) {
        result = await createUser(
          form.username,
          form.password,
          form.email,
          form.phone,
          // form.profilePicture,
          form.firstName,
          form.lastName,
          isTeacher ? "teacher" : "user",
          +form.price,
          form.bio,
          form.qualification,
          form.location
        );
      } else {
        if (!form) return;
        result = await createUser(
          form.username,
          form.password,
          form.email,
          form.phone,
          // form.profilePicture,
          form.firstName,
          form.lastName,
          isTeacher ? "teacher" : "user",
          0,
          "",
          "",
          ""
        );
      }
      console.log("User registered successfully:", result);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  console.log("Errors:", errors);

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={isTeacher}
              exclusive
              onChange={handleToggeleButtonChange}
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
          <Grid item xs={12}>
            <TextField
              label="First Name*"
              variant="outlined"
              fullWidth
              // required
              name="firstName"
              error={!!errors.lastName}
              onChange={(e) =>
                handleContactFormChange("firstName", e.target.value)
              }
            /> {errors.firstName && <Typography className="error-message">{errors.firstName}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name*"
              variant="outlined"
              fullWidth
              // required
              name="lastName"
              error={!!errors.lastName}
              onChange={(e) =>
                handleContactFormChange("lastName", e.target.value)
              }
            /> {errors.lastName && <Typography className="error-message">{errors.lastName}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Username*"
              variant="outlined"
              fullWidth
              name="username"
              error={!!errors.username}
              // required
              onChange={(e) =>
                handleContactFormChange("username", e.target.value)
              }
            />
            {errors.username && <Typography className="error-message">{errors.username}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Password*"
              variant="outlined"
              name="password"
              fullWidth
              error={!!errors.password}
              // required
              onChange={(e) =>
                handleContactFormChange("password", e.target.value)
              }
            />
            {errors.password && <Typography className="error-message">{errors.password}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              label="Email*"
              variant="outlined"
              name="email"
              fullWidth
              error={!!errors.email}
              // required
              onChange={(e) => handleContactFormChange("email", e.target.value)}
            /> {errors.email && <Typography className="error-message">{errors.email}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone*"
              variant="outlined"
              fullWidth
              name="phone"
              error={!!errors.phone}
              onChange={(e) => handleContactFormChange("phone", e.target.value)}
            /> {errors.phone && <Typography className="error-message">{errors.phone}</Typography>}
          </Grid>
          {/* <Grid item xs={12}>
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
          </Grid> */}
          {isTeacher && (
            <>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <TextField
                  type="number"
                  label="Price"
                  variant="outlined"
                  name="price"
                  fullWidth
                  error={!!errors.price}
                  onChange={(e) =>
                    handleContactFormChange("price", e.target.value)
                  }
                /> {errors.price && <Typography className="error-message">{errors.price}</Typography>}
              </Grid>
              <Grid item xs={12}>
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
            </>
          )}
          {/* Hibaüzenetek */}
          {/* <Grid item xs={12}>
            {!!Object.keys(errors).length && (
              <div>
                {Object.entries(errors).map(([key, value]) => (
                  <span key={key}>{value}</span>
                ))}
              </div>
            )}
          </Grid> */}
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
