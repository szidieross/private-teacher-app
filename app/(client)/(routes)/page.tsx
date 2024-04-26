import { connectDB, getAllUsers, getConnection } from '@/app/api/db';

export default function Home() {
  // Kapcsolódás az adatbázishoz
  connectDB();
  
  // Példa lekérdezés végrehajtása
  const fetchData = async () => {
    const connection = getConnection();
    try {
      const [rows, fields] = await connection.execute('SELECT * FROM users');
      console.log('All users:', rows);
    } catch (error) {
      console.error('Error executing query:', error);
    }
  };

  fetchData(); // Adatok lekérése

  return (
    <main>
      hello again
    </main>
  );
}




// import { connectDB, getConnection } from '@/app/api/db';



// export default function Home() {

//   connectDB();
//   console.log('hi')
//   // Példa lekérdezés végrehajtása
//   async (req, res) => {
//     const connection = getConnection();
//     try {
//       const [rows, fields] = await connection.execute('SELECT * FROM users');
//       res.status(200).json({ data: rows });
//     } catch (error) {
//       console.error('Error executing query:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };
//   return (
//     <main>
//       hello again
//     </main>
//   );
// }
