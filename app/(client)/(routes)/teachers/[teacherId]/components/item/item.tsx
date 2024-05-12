"use client";

import { TeacherModel } from "@/app/api/models/teacher.model";
import React, { FC, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Modal,
  Box, // Import Modal from @mui/material
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useTeachersService from "@/app/(client)/services/teacher.service";
import useLessonsService from "@/app/(client)/services/lesson.service";
import { LessonModel } from "@/app/api/models/lesson.model";
import AppointmentsTable from "../appointments-table/appointments-table";

type Props = {
  teacherId: number;
};

const Item: FC<Props> = ({ teacherId }) => {
  const { getTeacherById } = useTeachersService();
  const { getLessonsByTeacherId } = useLessonsService();
  const [teacher, setTeacher] = useState<TeacherModel | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [lessons, setLessons] = useState<LessonModel[] | null>(null);

  // State to manage modal open/close
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to keep track of selected lesson
  const [selectedLesson, setSelectedLesson] = useState<{
    lesson: LessonModel | null;
    categoryId: number | null;
  }>({ lesson: null, categoryId: null });

  useEffect(() => {
    if (teacher && teacher.userData.profilePicture) {
      setImage(`/images/uploads/${teacher.userData.profilePicture}`);
    }
  }, [teacher]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTeacher = await getTeacherById(teacherId);
        setTeacher(fetchedTeacher);

        const fetchedLessons = await getLessonsByTeacherId(teacherId);
        setLessons(fetchedLessons);
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    };

    fetchData();
  }, [getTeacherById, teacherId]);

  // Function to open the modal
  const handleOpenModal = (lesson: LessonModel) => {
    setSelectedLesson({ lesson, categoryId: lesson.categoryId });
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {teacher && (
        <>
          <Grid item xs={12} sm={6}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="360"
                width="auto"
                image={image}
                alt="Profile"
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {teacher.userData.firstName} {teacher.userData.lastName}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Location: {teacher.location}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Price: {teacher.price}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Bio: {teacher.bio}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Qualification: {teacher.qualification}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Subject: {lessons?.map((item, index) => item.categoryName)}
                </Typography>
                <a
                  href={`mailto:${teacher.userData.email}`}
                  title="Send an email"
                >
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    Email: {teacher.userData.email}
                  </Typography>
                </a>
                <a href={`tel:${teacher.userData.phone}`} title="Make a call">
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    Phone: {teacher.userData.phone}
                  </Typography>
                </a>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12}>
            Book appointment for
            {lessons?.map((item, index) => (
              <Button
                variant="outlined"
                onClick={() => handleOpenModal(item)}
                key={index}
              >
                {item.categoryName}
              </Button>
            ))}
            {/* <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {`${teacher.userData.firstName} ${teacher.userData.lastName}'s Appointments`}
              </AccordionSummary>
              <AccordionDetails>
                <AppointmentsTable teacherId={teacherId} />
              </AccordionDetails>
            </Accordion> */}
          </Grid>
        </>
      )}

      {/* Modal Component */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          {/* Your modal content goes here */}
          {selectedLesson && selectedLesson.lesson?.lessonId && (
            <div>
              <AppointmentsTable
                teacherId={teacherId}
                lessonId={selectedLesson.lesson?.lessonId}
              />
              <h2>{selectedLesson.lesson?.categoryName} Appointment</h2>
              {/* Add more details about the appointment */}
              <Button onClick={handleCloseModal}>Close Modal</Button>
            </div>
          )}
        </div>
      </Modal>
    </Grid>
  );
};

export default Item;
