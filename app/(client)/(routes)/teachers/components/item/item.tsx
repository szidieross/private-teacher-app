import { TeacherModel } from "@/app/api/models/teacher.model";
import { UserModel } from "@/app/api/models/user.model";
import { Box, Typography } from "@mui/material";
import React, { FC } from "react";

type Props = {
  // user: UserModel;
  teacher: TeacherModel;
};

const Item: FC<Props> = ({ teacher }) => {
  return (
    <Box>
      <Typography>
        {teacher.userData.firstName} {teacher.userData.lastName} {teacher.location}
      </Typography>
      {teacher.userData.profilePicture && (
        <img
          src="/images/test-image.jpg"
          alt="Profile"
          className="profile-img"
        />
      )}
    </Box>
  );
};

export default Item;
