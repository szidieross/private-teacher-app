import { NextRequest, NextResponse } from "next/server";
import { createUser } from "../../services/user.service";

export async function POST(request: NextRequest) {
  try {
    const {
      username,
      password,
      email,
      phone,
      firstName,
      lastName,
      role,
      price,
      bio,
      qualification,
      location,
    } = await request.json();

    const result = await createUser(
      username,
      password,
      email,
      phone,
      firstName,
      lastName,
      role,
      price,
      bio,
      qualification,
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
