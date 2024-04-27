// // pages/users/[userId].js

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import {UserDto} from "@/app/api/dtos/user.dto"

// export default function UserPage({ user }) {
//   const router = useRouter();
//   const { userId } = router.query;
//   const [userData, setUserData] = useState(user);

//   useEffect(() => {
//     // Ha nincs felhasználói adat, vagy a felhasználó azonosító megváltozott,
//     // akkor újra lekérjük az adatokat a szerveroldalról
//     if (!userData || userData.user_id !== userId) {
//       fetchUserData();
//     }
//   }, [userId]); // Az useEffect csak akkor fut le, ha a userId változik

//   const fetchUserData = async () => {
//     try {
//       const res = await fetch(`/api/users/${userId}`);
//       if (!res.ok) {
//         throw new Error('Failed to fetch user data');
//       }
//       const userData = await res.json();
//       setUserData(userData);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>User Details</h1>
//       <p>Username: {userData.username}</p>
//       <p>Email: {userData.email}</p>
//       {/* Egyéb felhasználói adatok megjelenítése */}
//     </div>
//   );
// }

// export async function getServerSideProps({ params }) {
//   // Az adott felhasználó adatainak lekérdezése a szerveroldalról
//   const { userId } = params;
//   const res = await fetch(`http://localhost:3000/api/users/${userId}`);
//   if (!res.ok) {
//     return {
//       notFound: true,
//     };
//   }
//   const userData = await res.json();

//   return {
//     props: {
//       user: userData,
//     },
//   };
// }
