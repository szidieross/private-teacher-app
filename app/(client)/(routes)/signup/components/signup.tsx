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
import { getUserById } from "@/app/api/services/user.service";

export interface ContactUsRequest {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  //   profilePicture: string;
  role: string;
  price: number;
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

  useEffect(() => {
    console.log(form);
  }, [form]);

  const handleToggeleButtonChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: boolean
  ) => {
    setIsTeacher(newType);
    handleContactFormChange("role", newType ? "teacher" : "user");
  };

  // const handleAlignment = (
  //   event: React.MouseEvent<HTMLElement>,
  //   newType: boolean
  // ) => {
  //   setIsTeacher(newType);
  // };

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
    console.log(form);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!form) return;

    try {
      let result = null;
      if (form.price && form.bio && form.qualification && form.location) {
        result = await createUser(
          form.username,
          form.password,
          form.email,
          form.phone,
          // form.profilePicture,
          form.firstName,
          form.lastName,
          isTeacher ? "teacher" : "user",
          form.price,
          form.bio,
          form.qualification,
          form.location
        );
      } else {
        const result = await createUser(
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
      if (result) {
        console.log("User registered successfully:", result);
      } else {
        console.error("Error registering user:", result);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={isTeacher}
              exclusive
              onChange={handleToggeleButtonChange}
              // onChange={(e) =>
              //   handleContactFormChange("firstName", e.target.value)
              // }
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
