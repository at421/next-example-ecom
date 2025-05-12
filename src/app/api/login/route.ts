import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestBody = await request.json();
  const { email, password } = requestBody;

  if (email === "johndoe@mail.com" && password === "ecommerce") {
    return NextResponse.json({ status: true }, { status: 200 });
  } else {
    return NextResponse.json({ status: false }, { status: 401 });
  }
}