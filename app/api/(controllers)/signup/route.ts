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

    return NextResponse.json({ id: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
