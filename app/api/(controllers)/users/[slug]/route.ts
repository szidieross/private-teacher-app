import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/app/api/models/user.model";
import { getUserById, updateUserData } from "@/app/api/services/user.service";
        
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

export async function POST(request: NextRequest) {
    try {
      const {
        userId,
        username,
        firstName,
        lastName,
        email,
        phone,
      } = await request.json();

      console.log("userIduserIduserId", userId);
        console.log("username", username);
        console.log("firstName", firstName);
        console.log("lastName", lastName);
        console.log("email", email);
        console.log("phone", phone);
  
      const result = await updateUserData(
        userId,
        username,
        firstName,
        lastName,
        email,
        phone,
      );
  
  
      // const id=result
  
      // console.log("result", result.user_id);
      // // const user_id=result
  
      // const teacher = await createTeacher();
  
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


// export const POST = async (request: NextRequest, context: { params: { slug: number } }) =>{
//     const userId = context.params.slug;
//     try {
//         const data = await request.body.json();
//         const imagePath = data.imagePath; // Feltételezzük, hogy a kép elérési útvonala a request body-ban van

//         // Feltételezzük, hogy a updateUserImagePath függvény a felhasználó képének útvonalát frissíti az adatbázisban
//         await updateUserImage(userId, imagePath);

//         return NextResponse.json({ success: true });
//     } catch (error) {
//         console.error('Error updating user image path:', error);
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