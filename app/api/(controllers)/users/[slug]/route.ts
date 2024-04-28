import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/app/api/models/user.model";
import { getUserById } from "@/app/api/services/user.service";
        
export const GET = async (request: NextRequest, context: { params: { slug: number } }) =>{
    const userId = context.params.slug;
    try {
        const user: UserModel|null = await getUserById(userId);
        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

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