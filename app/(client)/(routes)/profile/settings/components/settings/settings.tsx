"use client";

import { FC, useState, useEffect } from "react";
import useUsersService from "@/app/(client)/services/user.service";
import {
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Paper,
} from "@mui/material";
import { UserModel } from "@/app/api/models/user.model";
import useTeachersService from "@/app/(client)/services/teacher.service";
import { TeacherModel } from "@/app/api/models/teacher.model";
import { isValidEmail, isValidPhoneNumber } from "@/app/api/utils/user.util";
import "./settings.scss";
import useAppointmentsService from "@/app/(client)/services/appointment.service";
import { logout } from "@/app/actions";
import { colors } from "@/app/(client)/constants/color.constant";

type Props = {
  userId?: number;
  teacherId?: number;
};

export interface ContactUsRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  price?: number | string;
  qualification?: string;
  bio?: string;
  location?: string;
  street?: string;
  houseNumber?: string;
}

const initContactForm: ContactUsRequest = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  price: undefined,
  qualification: "",
  bio: "",
  location: "",
  street: "",
  houseNumber: "",
};

const Settings: FC<Props> = ({ userId, teacherId }) => {
  const { getUserById, updateUserData, deleteUserById } = useUsersService();
  const { getTeacherByUserId, deleteTeacherById } = useTeachersService();
  const [form, setContactForm] = useState<ContactUsRequest | null>(null);
  const [user, setUser] = useState<UserModel | null>(null);
  const [teacher, setTeacher] = useState<TeacherModel | null>(null);
  const [errors, setErrors] = useState<Partial<ContactUsRequest>>({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUserById(userId);
      logout();
    } catch (error) {
      console.error("Failed deleting user", error);
    }
  };

  const handleDeleteTeacher = async (userId: number, teacherId: number) => {
    try {
      await deleteTeacherById(teacherId);
      logout();
    } catch (error) {
      console.error("Failed deleting teacher", error);
    }
  };

  const openDeleteDialog = () => {
    setOpenDeleteModal(true);
  };

  const closeDeleteDialog = () => {
    setOpenDeleteModal(false);
  };

  const confirmDelete = () => {
    if (userId && !teacherId) {
      handleDeleteUser(userId);
    } else if (userId && teacherId) {
      handleDeleteTeacher(userId, teacherId);
    }
    closeDeleteDialog();
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
              qualification: "",
              bio: "",
              location: "",
              street: "",
              houseNumber: "",
            });
          }
          if (teacherId) {
            const teacherData = await getTeacherByUserId(userId);
            if (teacherData) {
              setTeacher(teacherData);
              setContactForm((prevForm: ContactUsRequest | null) => ({
                ...(prevForm || initContactForm),
                price: teacherData.price,
                qualification: teacherData.qualification,
                bio: teacherData.bio,
                location: teacherData.location,
                street: teacherData.street,
                houseNumber: teacherData.houseNumber,
              }));
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, [getUserById, userId, getTeacherByUserId, teacherId]);

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

    const isValid = validateForm();

    if (!isValid) return;

    try {
      let result = null;
      if (!form) return;
      result = await updateUserData(
        form.username,
        form.firstName,
        form.lastName,
        form.email,
        form.phone,
        +form.price!,
        form.qualification,
        form.bio,
        form.location,
        form.street,
        form.houseNumber
      );

      if (result) {
        setOpenSnackbar(true);
        setSnackbarMessage("User data updated!");
      }
    } catch (error) {
      setOpenSnackbar(true);
      setSnackbarMessage("User data update failed.");
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" className="settings-container">
      <Box pt={3}>
        <Button
          onClick={openDeleteDialog}
          variant="outlined"
          color="secondary"
          sx={{ fontSize: 12 }}
        >
          Delete account
        </Button>
      </Box>

      <Dialog
        open={openDeleteModal}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeDeleteDialog}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            sx={{
              backgroundColor: colors.primary,
              "&:hover": {
                backgroundColor: colors.mediumPurple,
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Paper sx={{ backgroundColor: colors.background }}>
        <Box p={3} m={3}>
          <form onSubmit={handleSubmit} className="settings-form">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography className="input-label">First Name</Typography>
                <TextField
                  defaultValue={user?.firstName}
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  error={!!errors.firstName}
                  className="text-field"
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
                <Typography className="input-label">Last Name</Typography>
                <TextField
                  defaultValue={user?.lastName}
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  className="text-field"
                  error={!!errors.lastName}
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
                  variant="outlined"
                  fullWidth
                  name="username"
                  className="text-field"
                  error={!!errors.username}
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
                  variant="outlined"
                  name="email"
                  fullWidth
                  className="text-field"
                  error={!!errors.email}
                  onChange={(e) =>
                    handleContactFormChange("email", e.target.value)
                  }
                />
                {errors.email && (
                  <Typography className="error-message">
                    {errors.email}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography className="input-label">Phone</Typography>
                <TextField
                  defaultValue={user?.phone}
                  variant="outlined"
                  fullWidth
                  name="phone"
                  className="text-field"
                  error={!!errors.phone}
                  onChange={(e) =>
                    handleContactFormChange("phone", e.target.value)
                  }
                />
                {errors.phone && (
                  <Typography className="error-message">
                    {errors.phone}
                  </Typography>
                )}
              </Grid>
              {teacherId && (
                <>
                  <Grid item xs={6}>
                    <Typography className="input-label">Price</Typography>
                    <TextField
                      defaultValue={teacher?.price}
                      type="number"
                      variant="outlined"
                      name="price"
                      fullWidth
                      className="text-field"
                      error={!!errors.price}
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
                    <Typography className="input-label">
                      Qualification
                    </Typography>
                    <TextField
                      defaultValue={teacher?.qualification}
                      variant="outlined"
                      fullWidth
                      className="text-field"
                      name="qualification"
                      onChange={(e) =>
                        handleContactFormChange("qualification", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="input-label">Bio</Typography>
                    <TextField
                      placeholder="Tell us about yourself..."
                      defaultValue={teacher?.bio}
                      variant="outlined"
                      fullWidth
                      multiline
                      className="text-field"
                      name="bio"
                      rows={8}
                      onChange={(e) =>
                        handleContactFormChange("bio", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="input-label">Location</Typography>
                    <TextField
                      defaultValue={teacher?.location}
                      variant="outlined"
                      fullWidth
                      name="location"
                      className="text-field"
                      onChange={(e) =>
                        handleContactFormChange("location", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography className="input-label">Street</Typography>
                    <TextField
                      defaultValue={teacher?.street}
                      variant="outlined"
                      fullWidth
                      name="location"
                      className="text-field"
                      onChange={(e) =>
                        handleContactFormChange("street", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className="input-label">Nr.</Typography>
                    <TextField
                      defaultValue={teacher?.houseNumber}
                      variant="outlined"
                      fullWidth
                      name="location"
                      className="text-field"
                      onChange={(e) =>
                        handleContactFormChange("houseNumber", e.target.value)
                      }
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: colors.primary,
                    "&:hover": {
                      bgcolor: colors.mediumPurple,
                    },
                  }}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default Settings;
