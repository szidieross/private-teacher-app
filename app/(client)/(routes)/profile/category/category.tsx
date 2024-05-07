// "use client";

// import { useState } from "react";
// import { Button, TextField, Grid } from "@mui/material";
// import useCategoriesService from "@/app/(client)/services/category.service";

// const NewCategoryForm: React.FC = () => {
//   const {} = useCategoriesService();
//   const [categoryName, setCategoryName] = useState<string>("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await createCategory(categoryName); // Assuming createCategory is a function that sends a request to your API to create a new category
//       // Optionally, you can add a success message or perform any other actions upon successful creation
//       alert("Category created successfully!");
//       setCategoryName("");
//     } catch (error) {
//       console.error("Error creating category:", error);
//       // Optionally, you can handle errors here (e.g., display an error message)
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <TextField
//             label="Category Name"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             fullWidth
//             required
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button type="submit" variant="contained" color="primary">
//             Add Category
//           </Button>
//         </Grid>
//       </Grid>
//     </form>
//   );
// };

// export default NewCategoryForm;
