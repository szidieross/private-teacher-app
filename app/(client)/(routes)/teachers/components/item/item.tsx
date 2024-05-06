import { TeacherModel } from "@/app/api/models/teacher.model";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import React, { FC } from "react";
import "./item.scss";

type Props = {
  teacher: TeacherModel;
};

const Item: FC<Props> = ({ teacher }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {teacher.userData.firstName} {teacher.userData.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Qualification: {teacher.qualification}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {teacher.location}
        </Typography>
      </CardContent>
      {teacher.userData.profilePicture && (
        <CardMedia
          component="img"
          height="360"
          // width="360"
          width="100%"
          image="/images/test-image.jpg"
          alt="Profile"
        />
      )}
    </Card>
  );
};

export default Item;
