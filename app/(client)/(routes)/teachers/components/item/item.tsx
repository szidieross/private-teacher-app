// import { TeacherModel } from "@/app/api/models/teacher.model";
// import { Typography, Card, CardContent, CardMedia } from "@mui/material";
// import React, { FC, useState } from "react";
// import "./item.scss";

// type Props = {
//   teacher: TeacherModel;
// };

// const Item: FC<Props> = ({ teacher }) => {
//   const [imagee, setImage] = useState<string | null>(null);
//   setImage(`/images/${teacher.userData.profilePicture}`);
//   let imggg = ``;
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {teacher.userData.firstName} {teacher.userData.lastName}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Qualification: {teacher.qualification}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Location: {teacher.location}
//         </Typography>
//       </CardContent>
//       {teacher.userData.profilePicture && (
//         <CardMedia
//           component="img"
//           height="360"
//           // width="360"
//           width="100%"
//           // image="/images/test-image.jpg"
//           image={imagee}
//           alt="Profile"
//         />
//       )}
//     </Card>
//   );
// };

// export default Item;

import { TeacherModel } from "@/app/api/models/teacher.model";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import "./item.scss";

type Props = {
  teacher: TeacherModel;
};

const Item: FC<Props> = ({ teacher }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (teacher.userData.profilePicture) {
      setImage(`/images/${teacher.userData.profilePicture}`);
    }
  }, [teacher.userData.profilePicture]);

  return (
    <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
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
      {image && (
        <CardMedia
          component="img"
          height="360"
          width="100%"
          image={image}
          alt="Profile"
        />
      )}
    </Card>
  );
};

export default Item;
