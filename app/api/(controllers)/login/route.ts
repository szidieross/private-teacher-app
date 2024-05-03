import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "../../services/user.service";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    const result = await verifyUser(username, password);

    if (!result) return;
    
    return NextResponse.json({ username: result.username }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
