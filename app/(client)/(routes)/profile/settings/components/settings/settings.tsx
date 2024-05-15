"use client";

import { FC, useState, useEffect } from "react";
import useUsersService from "@/app/(client)/services/user.service";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { UserModel } from "@/app/api/models/user.model";
import useTeachersService from "@/app/(client)/services/teacher.service";
import { TeacherModel } from "@/app/api/models/teacher.model";
import { isValidEmail, isValidPhoneNumber } from "@/app/api/utils/user.util";
import "./settings.scss";

type Props = {
  userId?: number;
  teacherId?: number;
};

export interface ContactUsRequest {
  // userId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  price?: number | string;
  qualification?: string;
  bio?: string;
  location?: string;
}

const initContactForm: ContactUsRequest = {
  // userId: 0,
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  price: undefined,
  qualification: "",
  bio: "",
  location: "",
};

const Settings: FC<Props> = ({ userId, teacherId }) => {
  const { getUserById, updateUserData } = useUsersService();
  const { getTeacherByUserId } = useTeachersService();
  const [form, setContactForm] = useState<ContactUsRequest | null>(null);
  const [user, setUser] = useState<UserModel | null>(null);
  const [teacher, setTeacher] = useState<TeacherModel | null>(null);
  const [errors, setErrors] = useState<Partial<ContactUsRequest>>({});

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
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!isValidPhoneNumber(form.phone)) {
      newErrors.phone = "Phone number is invalid.";
    }

    if (teacherId && form.price && +form.price <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const userData = await getUserById(userId);
          if (userData) {
            setUser(userData);
            setContactForm({
              username: userData.username,
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              phone: userData.phone,
            });
          }
          if (teacherId) {
            console.log("Hello teacher");
            const teacherData = await getTeacherByUserId(userId);
            console.log(teacherData);
            if (teacherData) {
              setTeacher(teacherData);
              setContactForm((prevForm: ContactUsRequest | null) => ({
                ...(prevForm || initContactForm),
                price: teacherData.price,
                qualification: teacherData.qualification,
                bio: teacherData.bio,
                location: teacherData.location,
              }));
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, [getUserById, userId]);

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

    console.log("FORMMMMM", form);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!userId) return;
    if (!form) return;

    const isValid = validateForm();

    if (!isValid) return;

    try {
      let result = null;
      if (!form) return;
      result = await updateUserData(
        // userId,
        form.username,
        form.firstName,
        form.lastName,
        form.email,
        form.phone,
        +form.price!,
        form.qualification,
        form.bio,
        form.location
      );

      if (result) {
        console.log("User updated successfully:", result);
      } else {
        console.error("Error updating user:", result);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {" "}
            <Typography className="input-label">First Name</Typography>
            <TextField
              // label="First Name"
              defaultValue={user?.firstName}
              variant="outlined"
              fullWidth
              // required
              name="firstName"
              onChange={(e) =>
                handleContactFormChange("firstName", e.target.value)
              }
            />
            {errors.firstName && (
              <Typography className="error-message">
                {errors.firstName}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            {" "}
            <Typography className="input-label">Last Name</Typography>
            <TextField
              // label="Last Name"
              defaultValue={user?.lastName}
              variant="outlined"
              fullWidth
              // required
              name="lastName"
              onChange={(e) =>
                handleContactFormChange("lastName", e.target.value)
              }
            />
            {errors.lastName && (
              <Typography className="error-message">
                {errors.lastName}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography className="input-label">Username</Typography>
            <TextField
              defaultValue={user?.username || ""}
              // label="Username"
              variant="outlined"
              fullWidth
              name="username"
              // required
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
            <Typography className="input-label">Email</Typography>
            <TextField
              defaultValue={user?.email}
              type="email"
              // label="Email"
              variant="outlined"
              name="email"
              fullWidth
              // required
              onChange={(e) => handleContactFormChange("email", e.target.value)}
            />
            {errors.phone && (
              <Typography className="error-message">{errors.phone}</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            {" "}
            <Typography className="input-label">Phone</Typography>
            <TextField
              defaultValue={user?.phone}
              // label="Phone"
              variant="outlined"
              fullWidth
              name="phone"
              onChange={(e) => handleContactFormChange("phone", e.target.value)}
            />
          </Grid>
          {teacherId && (
            <>
              <Grid item xs={6}>
                <Typography className="input-label">Price</Typography>
                <TextField
                  defaultValue={teacher?.price}
                  type="number"
                  // label="Price"
                  variant="outlined"
                  name="price"
                  fullWidth
                  onChange={(e) =>
                    handleContactFormChange("price", e.target.value)
                  }
                />
                {errors.price && (
                  <Typography className="error-message">
                    {errors.price}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography className="input-label">Qualification</Typography>
                <TextField
                  defaultValue={teacher?.qualification}
                  // label="Qualification"
                  variant="outlined"
                  fullWidth
                  name="qualification"
                  onChange={(e) =>
                    handleContactFormChange("qualification", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography className="input-label">Bio</Typography>
                <TextField
                  defaultValue={teacher?.bio}
                  // label="Bio"
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
                <Typography className="input-label">Location</Typography>
                <TextField
                  defaultValue={teacher?.location}
                  // label="Location"
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
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Settings;
