import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "../../services/user.service";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    const result = await verifyUser(username, password);

    return NextResponse.json({ username: result.username }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

// export default async function handler(request: NextRequest) {
//   if (request.method === "POST") {
//     try {
//       const { username, password } = await request.json();
//       const response = await axios.post<{ username: string }>("http://localhost/path_to_php/login.php", { username, password });

//       return NextResponse.json({ username: response.data.username }, { status: 201 });
//     } catch (error) {
//       return NextResponse.json({ error }, { status: 500 });
//     }
//   } else {
//     return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
//   }
// }

