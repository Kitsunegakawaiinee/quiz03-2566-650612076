import jwt from "jsonwebtoken";

import { DB, readDB } from "@/app/libs/DB";
import { NextResponse, userAgent } from "next/server";

export const POST = async (request) => {
  readDB();

  // my code
  //
  const body = await request.json();
  const { username, password } = body;

  readDB();
  const check = DB.users.find(
    (x) => x.username === username && x.password === password
  );

  if(!check)
  return NextResponse.json(
    {
      ok: false,
      message: "Username or Password is incorrect",
    },
    { status: 400 }
  );

  // const token = "Replace this with token creation";
  const token = jwt.sign(
    { username, role: check.role},
    process.env.JWT_SECRET,
    { expiresIn: "1h"}
  );

  return NextResponse.json({ ok: true, token });
};
