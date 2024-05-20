import { Grid, Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const SkeletonList = () => {
  const skeletonData = [
    { height: 400 },
    { height: 400 },
    { height: 400 },
    { height: 400 },
    { height: 400 },
    { height: 400 },
  ];

  return (
    <Grid container spacing={2} mt={2}>
      {skeletonData.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
          <Box>
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={item.height}
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonList;
