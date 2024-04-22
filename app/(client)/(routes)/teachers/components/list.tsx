import React from 'react'
import Item from './item';

const List = () => {
    return (
        <>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/></>
    )
}

export default List;

// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import Item from "./item";
// import productsService from "@/app/services.tsx/products.service";
// import { Typography, Grid, Box, Button } from "@mui/material";
// import ProductModel from "@/app/models/product.model";
// import SearchContext from "@/app/context/search.context";
// import SearchBar from "./search-bar";
// import SelectListComponent from "./select-list-component";
// import CategoryContext from "@/app/context/category.context";
// import Sort from "@/app/(routes)/components/sort";

// const List = () => {
//   const { term, setTerm } = useContext(SearchContext);
//   const { category } = useContext(CategoryContext);

//   const [products, setProducts] = useState<ProductModel[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
//   const [ascending, setAscending] = useState<boolean>(true);
//   const [allCategories, setAllCategories] = useState<string[]>([]);
  
//   const [order, setOrder] = useState<string>("");

//   const { getProducts } = productsService();

//   //getting all products data
//   useEffect(() => {
//     (async () => {
//       const products = await getProducts();
//       if (products) {
//         setProducts(products);
//         setFilteredProducts(products);

//         const categories = getAllCategories(products);
//         setAllCategories(categories);
//       }
//     })();
//   }, []);

//   // setting filtered data
//   useEffect(() => {
//     filterProducts(term);
//   }, [term]);

//   // filtering products by categorys
//   useEffect(() => {
//     filterProductsBycategory(category);
//   }, [category]);

//   const filterProducts = (term: string) => {
//     setFilteredProducts(
//       products.filter((product) =>
//         product.name.toLowerCase().includes(term.toLowerCase())
//       )
//     );
//   };

//   const getAllCategories = (products: ProductModel[]) => {
//     const allCategories = products
//       .map((product) => product.categories)
//       .flat()
//       .filter((category, index, self) => self.indexOf(category) === index);
//     return allCategories;
//   };

//   const filterProductsBycategory = (category: string) => {
//     setFilteredProducts(products);
//     if (category != "categories") {
//       setFilteredProducts((prevProducts) =>
//         prevProducts.filter((product) => product.categories.includes(category))
//       );
//     }
//   };

//   const sortByPrice = (ascending: boolean) => {
//     if (ascending) {
//       const sortedProducts = [...filteredProducts].sort(
//         (a, b) => a.price - b.price
//       );
//       setFilteredProducts(sortedProducts);
//     } else {
//       const sortedProducts = [...filteredProducts].sort(
//         (a, b) => b.price - a.price
//       );
//       setFilteredProducts(sortedProducts);
//     }
//     setAscending((prev) => !prev);
//     return ascending;
//   };

//   const sortByRatings = () => {
//     const highestRated = [...filteredProducts].sort(
//       (a, b) => b.ratings - a.ratings
//     );
//     setFilteredProducts(highestRated);
//   };

//   return (
//     <div className="listContainer">
//       <SearchBar />
//       <Box display={"flex"} paddingTop={6}>
//         <Button
//           onClick={() => sortByPrice(ascending)}
//           variant="outlined"
//           disabled={filteredProducts.length <= 0}
//           sx={{ margin: 1 }}
//         >
//           Sort by price ({ascending ? "ascending" : "descending"})
//         </Button>

//         <Button
//           onClick={sortByRatings}
//           variant="outlined"
//           disabled={filteredProducts.length <= 0}
//           sx={{ margin: 1 }}
//         >
//           Highest Rated
//         </Button>

//         <SelectListComponent
//           categories={allCategories}
//           label="Categories"
//           defaultValue="categories"
//           defaultText="All Categories"
//         />
//       </Box>

//       <Grid container spacing={4} paddingTop={6} maxWidth={"1000px"}>
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product, index) => (
//             <Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={4}>
//               <Item product={product} />
//             </Grid>
//           ))
//         ) : (
//           <Box padding={6}>
//             <Typography>No items found.</Typography>
//           </Box>
//         )}
//       </Grid>
//     </div>
//   );
// };

// export default List;
