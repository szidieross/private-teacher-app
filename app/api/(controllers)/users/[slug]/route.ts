import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/app/api/models/user.model";
import { deleteUserById, getUserById, updateUserData } from "@/app/api/services/user.service";

export const GET = async (
  request: NextRequest,
  context: { params: { slug: number } }
) => {
  const userId = context.params.slug;
  try {
    const user: UserModel | null = await getUserById(userId);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
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
      price,
      qualification,
      bio,
      location,
    } = await request.json();

    const result = await updateUserData(
      userId,
      username,
      firstName,
      lastName,
      email,
      phone,
      price,
      qualification,
      bio,
      location
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

export async function DELETE(request: NextRequest, context: { params: { slug: number } }) {
  try {
    const userId = context.params.slug;

    if (!userId) {
      throw new Error("Missing userId");
    }

    const result = await deleteUserById(userId);

    return NextResponse.json({ affectedRows: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
