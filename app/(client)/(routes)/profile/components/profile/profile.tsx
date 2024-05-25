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
  LogoutRounded as LogoutRoundedIcon,
} from "@mui/icons-material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import MoneyRoundedIcon from "@mui/icons-material/MoneyRounded";
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
import { LessonModel } from "@/app/api/models/lesson.model";
import { formatDate } from "@/app/api/utils/user.util";

type Props = {
  userId?: number;
};

const Profile: FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [teacher, setTeacher] = useState<TeacherModel | null>(null);
  const [open, setOpen] = useState(false);
  const { getUserById } = useUsersService();
  const { getTeacherByUserId } = useTeachersService();
  const { userInfo } = useUserContext();
  const { to } = useNavigation();
  const [lessons, setLessons] = useState<LessonModel[] | null>(null);
  const [showAddAppointment, setShowAddAppointment] = useState<boolean>(false);

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

  const handleLessonsUpdate = (updatedLessons: LessonModel[] | null) => {
    setLessons(updatedLessons);
    setShowAddAppointment(updatedLessons !== null && updatedLessons.length > 0);
  };

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
            {teacher && (
              <>
                <Box display="flex" alignItems="center" mb={1}>
                  <LocationOnRoundedIcon
                    sx={{ marginRight: 1, color: colors.darkPurple }}
                  />
                  <Typography variant="body1" color={colors.secondary}>
                    {`${teacher.houseNumber ? teacher.houseNumber + " " : ""}
                    ${teacher.street ? teacher.street + ", " : ""}
                    ${teacher.location}`}
                  </Typography>{" "}
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <SchoolRoundedIcon
                    sx={{ marginRight: 1, color: colors.darkPurple }}
                  />
                  <Typography variant="body1">
                    {teacher.qualification}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <MoneyRoundedIcon sx={{ mr: 1, color: colors.darkPurple }} />
                  <Typography variant="subtitle1">{teacher.price}</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography variant="subtitle1">{teacher.bio}</Typography>
                </Box>
              </>
            )}
            {user.createdAt && (
              <Typography variant="subtitle2" color="textSecondary">
                Member since: {formatDate(user.createdAt)}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>

      <CustomModal open={open} onClose={handleClose} />
      {teacher && (
        <Box mt={4}>
          <AddLesson
            teacherId={teacher.teacherId}
            onLessonsUpdate={handleLessonsUpdate}
          />
          {showAddAppointment && (
            <AddAppointment teacherId={teacher.teacherId} />
          )}
        </Box>
      )}
    </Container>
  );
};

export default Profile;
