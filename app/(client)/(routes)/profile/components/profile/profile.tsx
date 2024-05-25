"use client";

import { FC, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Avatar,
  Paper,
  Grid,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import {
  AccountCircle,
  Settings as SettingsIcon,
  PhotoCameraRounded as PhotoCameraRoundedIcon,
  AlternateEmailOutlined as AlternateEmailOutlinedIcon,
  EmailRounded as EmailRoundedIcon,
  LocalPhoneRounded as LocalPhoneRoundedIcon,
  CalendarMonthTwoTone as CalendarMonthTwoToneIcon,
  ExitToAppRounded as ExitToAppRoundedIcon,
  LogoutRounded as LogoutRoundedIcon,
} from "@mui/icons-material";
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { UserModel } from "@/app/api/models/user.model";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import useUsersService from "@/app/(client)/services/user.service";
import CustomModal from "../upload-form/upload-form";
import AddAppointment from "../add-appointment/add-appointment";
import AddLesson from "../add-lesson/add-lesson";
import useTeachersService from "@/app/(client)/services/teacher.service";
import { TeacherModel } from "@/app/api/models/teacher.model";
import useNavigation from "@/app/(client)/hooks/navigation.hook";
import { colors } from "@/app/(client)/constants/color.constant";
import "./profile.scss";
import { logout } from "@/app/actions";

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
  const { userInfo, setUserInfo } = useUserContext();
  const { to } = useNavigation();

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
            if (user.createdAt) {
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
  }, [getUserById, userId, getTeacherByUserId]);

  if (!user) return <>Loading...</>;

  return (
    <Container maxWidth="md">
      <Paper
        sx={{
          padding: 4,
          marginBottom: 4,
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: colors.background,
        }}
      >
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} md={3} display="flex" justifyContent="center">
            <Button
              onClick={handleOpen}
              className="avatar-button"
              disableRipple
              disableElevation
            >
              <Avatar className="avatar">
                {userInfo.userImg ? (
                  <img
                    className="avatar-img"
                    src={`/images/uploads/${userInfo.userImg}`}
                    alt="Profile"
                  />
                ) : (
                  <AccountCircle className="avatar-circle" />
                )}
                <Box className="avatar-box">
                  <PhotoCameraRoundedIcon className="avatar-icon" />
                </Box>
              </Avatar>
            </Button>
          </Grid>
          <Grid item xs={12} md={9} position="relative">
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <IconButton
                onClick={() => to("/profile/appointments")}
                title="My Appointments"
              >
                <CalendarMonthTwoToneIcon sx={{ color: colors.darkPurple }} />
              </IconButton>
              <IconButton
                onClick={() => to("/profile/settings")}
                title="Settings"
              >
                <SettingsIcon sx={{ color: colors.darkPurple }} />
              </IconButton>
              <IconButton onClick={() => logout()} title="Logout">
                <LogoutRoundedIcon sx={{ color: colors.darkPurple }} />
              </IconButton>
            </Box>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: colors.secondary }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <AlternateEmailOutlinedIcon
                sx={{ mr: 1, color: colors.darkPurple }}
              />
              <Typography variant="subtitle1">{user.username}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <EmailRoundedIcon sx={{ mr: 1, color: colors.darkPurple }} />
              <Typography variant="subtitle1">{user.email}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <LocalPhoneRoundedIcon sx={{ mr: 1, color: colors.darkPurple }} />
              <Typography variant="subtitle1">{user.phone}</Typography>
            </Box>
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
        <Box mt={4}>
          <AddLesson teacherId={teacher.teacherId} />
          <AddAppointment teacherId={teacher.teacherId} />
        </Box>
      )}
    </Container>
  );
};

export default Profile;
