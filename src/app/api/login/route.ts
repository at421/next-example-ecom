import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (email === "johndoe@mail.com" && password === "ecommerce") {
    return NextResponse.json({ status: true }, { status: 200 });
  } else {
    return NextResponse.json({ status: false }, { status: 401 });
  }
}