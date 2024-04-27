import React from 'react'

const Item = () => {
  console.log("hello")
  return (
    <div>Item</div>
  )
}

export default Item


// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FC } from "react";
// import { Card, CardContent, Box } from "@mui/material";
// import ProductModel from "@/app/models/product.model";
// import InfoBox from "./info-box";
// import HeartIcon from "./heart-icon";
// import "@/app/globals.css";

// type ItemProps = {
//   product: ProductModel;
// };

// const Item: FC<ItemProps> = ({ product }) => {
//   const router = useRouter();

//   const [isHovered, setIsHovered] = useState<boolean>(false);

//   const {
//     id,
//     // name,
//     // description,
//     // price,
//     // currency,
//     // availability,
//     // dimensions,
//     // weight,
//     // categories,
//     // ratings,
//   } = product;

//   const goToProduct = (id: number) => {
//     router.push(`/${id}`);
//   };

//   const handleHover = () => {
//     setIsHovered(true);
//   };

//   const handleHoverLeave = () => {
//     setIsHovered(false);
//   };

//   return (
//     <Card
//       style={{ height: "100%" }}
//       variant="outlined"
//       onMouseEnter={handleHover}
//       onMouseLeave={handleHoverLeave}
//     >
//       <CardContent sx={{ position: "relative" }}>
//         <HeartIcon id={id} />

//         <Box
//           className="clickable imageBox"
//           onClick={() => goToProduct(id)}
//         ></Box>
//       </CardContent>
//       <InfoBox product={product} isHovered={isHovered} />
//     </Card>
//   );
// };

// export default Item;
