import { Container, Grid, List } from "@mui/material";
// import { useStoreContext } from "@/app/(client)/hooks/context.hook";

const Desktop = () => {
  // const { navbarSettings } = useStoreContext();

  return (
    <Container className="desktop-wrapper" sx={{ marginTop: 0 }}>
      <Grid container>
        <Grid item className="desktop--grid-item">
          {/* {navbarSettings.title} */}
          Private Teacher App
        </Grid>
        <Grid item xs className="desktop--grid-item">
          <List className="desktop--list">
            {/* <MenuItems /> */}
            {/* {navbarSettings.visibilities.search && <SearchBar />} */}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Desktop;
