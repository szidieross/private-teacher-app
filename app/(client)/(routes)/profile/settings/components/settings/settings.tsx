"use client";

import { FC, useState, useEffect } from "react";
import useUsersService from "@/app/(client)/services/user.service";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { UserContext } from "@/app/(client)/contexts/user.context";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import { UserModel } from "@/app/api/models/user.model";
import { TeacherModel } from "@/app/api/models/teacher.model";
import useTeachersService from "@/app/(client)/services/teacher.service";

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  profile_picture: string;
  created_at: string;
  role: "user" | "teacher";
}

interface Teacher {
  teacher_id: number;
  user_id: number;
  price: number;
  bio: string;
  qualification: string;
  location: string;
}

type Props = {
  userId?: number;
};

export interface ContactUsRequest {
  // userId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const initContactForm: ContactUsRequest = {
  // userId: 0,
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const Settings: FC<Props> = ({ userId }) => {
  const { createUser, getUserById, updateUserData } = useUsersService();
  const [form, setContactForm] = useState<ContactUsRequest | null>(null);
  const { userType } = useUserContext();
  const [user, setUser] = useState<UserModel | null>(null);
  const [teacher, setTeacher] = useState<TeacherModel | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const user = await getUserById(userId);
          if (user) {
            setUser(user);
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
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!userId) return;
    if (!form) return;

    try {
      let result = null;
      result = await updateUserData(
        // userId,
        form.username,
        form.firstName,
        form.lastName,
        form.email,
        form.phone
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
              required
              name="firstName"
              onChange={(e) =>
                handleContactFormChange("firstName", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={6}>
            {" "}
            <Typography className="input-label">Last Name</Typography>
            <TextField
              // label="Last Name"
              defaultValue={user?.lastName}
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
            <Typography className="input-label">Username</Typography>
            <TextField
              defaultValue={user?.username || ""}
              // label="Username"
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
            <Typography className="input-label">Email</Typography>
            <TextField
              defaultValue={user?.email}
              type="email"
              // label="Email"
              variant="outlined"
              name="email"
              fullWidth
              required
              onChange={(e) => handleContactFormChange("email", e.target.value)}
            />
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
          {/* {userType === "teacher" && teacher && (
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
          )} */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    // <div>
    //   <h1>User Profile</h1>
    //   <p>First Name: {user.first_name}</p>
    //   <p>Last Name: {user.last_name}</p>
    //   <p>Username: {user.username}</p>
    //   <p>Email: {user.email}</p>
    //   <p>Phone: {user.phone}</p>
    //   <p>Role: {user.role}</p>
    //   {user.role === "teacher" && (
    //     <div>
    //       <h2>Teacher Information</h2>
    //       <p>Price: {teacher?.price}</p>
    //       <p>Bio: {teacher?.bio}</p>
    //       <p>Qualification: {teacher?.qualification}</p>
    //       <p>Location: {teacher?.location}</p>
    //     </div>
    //   )}
    //   <button onClick={updateUser}>Update User</button>
    //   {user.role === "teacher" && (
    //     <button onClick={updateTeacher}>Update Teacher</button>
    //   )}
    // </div>
  );
};

export default Settings;
