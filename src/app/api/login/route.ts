import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (email === "johndoe@mail.com" && password === "ecommerce") {
    return NextResponse.json({ status: true }, { status: 200 });
  } else {
    return NextResponse.json({ status: false }, { status: 401 });
  }
}