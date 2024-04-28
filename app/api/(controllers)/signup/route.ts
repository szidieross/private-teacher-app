// signup.ts

import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";
import { createUser } from "../../services/user.service";

export async function POST(request: NextRequest) {
  try {
    // Adatok kinyerése a kérésből
    // const { name, email } = await request.json();
    const {
      username,
      password,
      email,
      phone,
      profilePicture,
      firstName,
      lastName,
      role,
    } = await request.json();

    const result = createUser(
      username,
      password,
      email,
      phone,
      profilePicture,
      firstName,
      lastName,
      role
    );

    // // Adatbáziskapcsolat létrehozása
    // const db = await pool.getConnection();

    // // SQL beszúrási lekérdezés
    // const query = "INSERT INTO account (name, email) VALUES (?, ?)";
    // const [result] = await db.execute(query, [name, email]);

    // // Kapcsolat felszabadítása
    // db.release();

    // Az új rekord azonosítójának visszaadása
    return NextResponse.json({ id: result }, { status: 201 });
  } catch (error) {
    // Hiba esetén JSON formátumban visszaadunk egy hibaüzenetet
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}

// import { NextApiRequest, NextApiResponse } from 'next';
// import { createUser } from '../../services/user.service';
// import { NextResponse, NextRequest } from 'next/server';

// export const POST = async (request: NextRequest, response: NextResponse) => {
//     try {
//         const { username, password, email, phone, profilePicture, firstName, lastName, role } = request.body;

//         // Itt hívod meg a createUser függvényt a kapott adatokkal

//         // Példa: await createUser(username, password, email, phone, profilePicture, firstName, lastName, role);
//         await createUser(username, password, email, phone, profilePicture, firstName, lastName, role);

//         // Ha a felhasználó létrehozása sikeres, akkor küldhetsz vissza egy választ
//         return response.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         console.error('Error creating user:', error);
//         // Ha valamilyen hiba történik, akkor visszaküldhetsz egy hibaüzenetet
//         return response.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// export const POST = async (request: NextApiRequest, response: NextApiResponse) => {
//     try {
//         const { username, password, email, phone, profilePicture, firstName, lastName, role } = request.body;
//         await createUser(username, password, email, phone, profilePicture, firstName, lastName, role);
//         // return NextResponse.json(teachers);
//         return NextResponse.json({ message: 'User created' }, { status: 201 });
//     } catch (error) {
//         console.error('Error creating user:', error);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// };

// const handler = async (request: NextApiRequest, response: NextApiResponse) => {
//   if (request.method === 'POST') {
//     const { username, password, email, phone, profilePicture, firstName, lastName, role } = request.body;
//     try {
//       await createUser(username, password, email, phone, profilePicture, firstName, lastName, role);
//       response.status(201).json({ message: 'User created successfully!' });
//     } catch (error) {
//       console.error('Error creating user:', error);
//       response.status(500).json({ message: 'Server error while creating user.' });
//     }
//   } else {
//     response.status(405).json({ message: 'Only POST requests are allowed' });
//   }
// };

// export default handler;
