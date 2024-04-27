import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/app/api/models/user.model";
import { getUserById } from "@/app/api/services/user.service";
        
export const GET = async (request: NextRequest, context: { params: { slug: number } }) =>{
    const userId = context.params.slug;
    try {
        const users: UserModel|null = await getUserById(userId);
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

// export const GET = async (request: NextRequest, context: any) => {
//     try {
//         const { params } = context || {}; // Vizsgáljuk, hogy a context objektum tartalmazza-e a params tulajdonságot
//         if (!params || !params.slug) {
//             throw new Error('Slug parameter is missing');
//         }
//         const userId = params.slug;
        
//         // Felhasználó lekérése az adatbázisból az azonosító alapján
//         const user: UserModel = await getUserById(userId);

//         // Válaszként visszaadjuk a felhasználót
//         return NextResponse.json(user);
//     } catch (error) {
//         // Hiba esetén hibaüzenet küldése
//         console.error('Error fetching user:', error);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// };


// export async function GET(
//     request:  NextRequest,
//     { params }: { params: { slug: string } }
// ) {
//     const slug = params.slug
    
//     try {
//         const db = await pool.getConnection()        
        
//         const query = 'select * from users where user_id = ?'
//         const [rows] = await db.execute(query,[slug])
//         db.release()
        
//         return NextResponse.json(rows)
//     } catch (error) {
//         return NextResponse.json({
//             error: error
//         }, { status: 500 })
//     }
// }