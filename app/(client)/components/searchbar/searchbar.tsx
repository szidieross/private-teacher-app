import { Box, Container, TextField } from "@mui/material";
import { FC, useCallback } from "react";
import { useSearchContext } from "../../hooks/context.hook";

const SearchBar: FC = () => {
  const { filteredTeachers, setFilteredTeachers, allTeachers, setAllTeachers } =
    useSearchContext();

  // const filterBySearch = useCallback(
  //   (searchQuery: string) => {
  //     let lowerCaseQuery = searchQuery.toLowerCase();
  //     let filteredData = filteredTeachers.filter(
  //       (data) =>
  //         data.userData.firstName.toLowerCase().includes(lowerCaseQuery) ||
  //         data.userData.lastName.toLowerCase().includes(lowerCaseQuery)
  //     );
  //     return filteredData;
  //   },
  //   [filteredTeachers]
  // );

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

  // const handleSearch = (searchQuery: string) => {
  //   if (searchQuery.length < 1) {
  //     setFilteredTeachers([...filteredTeachers]);
  //   } else {
  //     const updatedNewsItems = filterBySearch(searchQuery);
  //     setFilteredTeachers(updatedNewsItems);
  //   }
  // };

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.length < 1) {
      setFilteredTeachers([...allTeachers]);
    } else {
      const updatedNewsItems = filterBySearch(searchQuery);
      setFilteredTeachers(updatedNewsItems);
    }
  };

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
      <TextField
        variant="outlined"
        placeholder="Search..."
        onKeyUp={(event) => {
          handleSearch((event.target as HTMLTextAreaElement).value);
        }}
        autoComplete="off"
        InputProps={{
          style: { backgroundColor: "#f0f0f0", borderRadius: 8 },
          endAdornment: (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: 1,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6b6b6b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </Box>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
