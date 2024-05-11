"use client";

import { FC, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Avatar,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { UserModel } from "@/app/api/models/user.model";
import {
  useStoreContext,
  useUserContext,
} from "@/app/(client)/hooks/context.hook";
import useUsersService from "@/app/(client)/services/user.service";
import CustomModal from "../custom-modal/custom-modal";
import AddAppointment from "../add-appointment/add-appointment";
import AddLesson from "../add-lesson/add-lesson";
import useTeachersService from "@/app/(client)/services/teacher.service";
import { TeacherModel } from "@/app/api/models/teacher.model";

type Props = {
  userId?: number;
};

const Profile: FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [teacher, setTeacher] = useState<TeacherModel | null>(null);
  const [open, setOpen] = useState(false);
  const { getUserById } = useUsersService();
  const { getTeacherByUserId } = useTeachersService();
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const { setNavbarSettings } = useStoreContext();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const user = await getUserById(userId);
          if (user) {
            setUser(user);
            if (user && user.createdAt) {
              const date = new Date(user.createdAt);
              setFormattedDate(
                date.toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              );
            }
            if (user.role === "teacher" && user.userId) {
              const teacher = await getTeacherByUserId(user.userId);
              if (teacher) {
                setTeacher(teacher);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, [getUserById, userId]);

  if (!user) return <>Loading...</>;

  return (
    <Container maxWidth="md">
      <Paper sx={{ padding: 2, marginBottom: 4 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={3} container justifyContent="center">
            <Button onClick={handleOpen}>
              <Avatar sx={{ width: 120, height: 120 }}>
                {user.profilePicture ? (
                  <img
                    src={`/images/uploads/${user.profilePicture}`}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <AccountCircle sx={{ width: "100%", height: "100%" }} />
                )}
              </Avatar>
            </Button>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h4" gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Username: {user.username}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Email: {user.email}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Phone: {user.phone}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Role: {user.role}
            </Typography>
            {formattedDate && (
              <Typography variant="subtitle2" color="textSecondary">
                Member since: {formattedDate}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
      <CustomModal open={open} onClose={handleClose} />
      {teacher && (
        <>
          <AddLesson teacherId={teacher.teacherId} />
          <AddAppointment teacherId={teacher.teacherId} />
        </>
      )}
    </Container>
  );
};

export default Profile;
