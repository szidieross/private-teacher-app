// import { NextRequest, NextResponse } from "next/server";
// import pool from "@/app/libs/mysql";

// export async function GET(
//     request: NextRequest,) {
//     try {
//         const db = await pool.getConnection()
//         const query = 'select * from users'
//         const [rows] = await db.execute(query)
//         db.release()

//         return NextResponse.json(rows)
//     } catch (error) {
//         return NextResponse.json({
//             error: error
//         }, { status: 500 })
//     }
// }

/////////////////////////////////////////////////////////////////////////////

// import { NextRequest, NextResponse } from "next/server";
// import { getUsers } from "../../services/user.service";

// export const GET = async (request: NextRequest, context: any) =>
//     async () => {
//         const users = await getUsers();
//         return NextResponse.json(users);
//     };

import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "../../services/user.service";
import { UserModel } from "../../models/user.model";

export const GET = async () => {
    try {
        // Felhasználók lekérése az adatbázisból
        const users: UserModel[] = await getUsers();

        // Válaszként visszaadjuk a felhasználók listáját
        return NextResponse.json(users);
    } catch (error) {
        // Hiba esetén hibaüzenet küldése
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
