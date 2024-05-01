import { UserModel } from "@/app/api/models/user.model";
import { Box, Typography } from "@mui/material";
import React, { FC } from "react";

type Props = {
  user: UserModel;
};

const Item: FC<Props> = ({ user }) => {
  return (
    <Box>
      <Typography>
        {user.firstName} {user.lastName}
        {user.profilePicture && (
          <img
            src="/images/test-image.jpg"
            alt="Profile"
            className="profile-img"
          />
        )}
      </Typography>
    </Box>
  );
};

export default Item;
