import { Box, Container, TextField } from "@mui/material";
import { FC, useCallback } from "react";
import { useSearchContext } from "../../hooks/context.hook";

const SearchBar: FC = () => {
  const { allTeachers, filteredTeachers, setAllTeachers, setFilteredTeachers } =
    useSearchContext();

  const filterBySearch = useCallback(
    (searchQuery: string) => {
      let lowerCaseQuery = searchQuery.toLowerCase();
      let filteredData = allTeachers.filter(
        (data) =>
          data.userData.firstName.toLowerCase().includes(lowerCaseQuery) ||
          data.userData.lastName.toLowerCase().includes(lowerCaseQuery)
      );
      return filteredData;
    },
    [allTeachers]
  );

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.length < 1) {
      setFilteredTeachers([...allTeachers]);
    } else {
      const updatedNewsItems = filterBySearch(searchQuery);
      setFilteredTeachers(updatedNewsItems);
    }
  };

  return (
    <Container>
      <Box className="searchbar--box">
        <TextField
          variant="standard"
          placeholder="Search..."
          onKeyUp={(event) => {
            handleSearch((event.target as HTMLTextAreaElement).value);
          }}
          autoComplete="off"
          InputProps={{
            disableUnderline: true,
          }}
        ></TextField>
      </Box>
    </Container>
  );
};

export default SearchBar;
