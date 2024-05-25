import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/app/api/models/user.model";
import {
  getUserById,
  handleDeleteUser,
  updateUserData,
} from "@/app/api/services/user.service";

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
      street,
      houseNumber,
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
      location,
      street,
      houseNumber
    );

    return NextResponse.json({ id: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { slug: number } }
) {
  try {
    const userId = context.params.slug;

    if (!userId) {
      throw new Error("Missing userId");
    }

    const result = await handleDeleteUser(userId);

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
