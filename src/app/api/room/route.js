import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

//finished
export const GET = async () => {
  readDB();
  
  //my code
  //
  const rooms = DB.rooms;
  const totalRooms = rooms.length;
  //

  return NextResponse.json({
    ok: true,
    //rooms:
    //totalRooms:

    //
    rooms,
    totalRooms,
    //
  });
};


//finished admin create room
export const POST = async (request) => {
  const payload = checkToken();
  

  //my code?
  //
  if(!payload || (!(payload.role === "SUPER_ADMIN") && !(payload.role === "ADMIN")))
  return NextResponse.json(
    {
      ok: false,
      message: "Invalid token",
    },
    { status: 401 }
  );

  const body = await request.json();


  readDB();
  const check_room = DB.rooms.find(
    (room) => room.roomName === body.roomName
  );

  if(check_room)
  return NextResponse.json(
    {
      ok: false,
      message: `Room ${body.roomName} already exists`,
    },
    { status: 400 }
  );

  const roomId = nanoid();

  //call writeDB after modifying Database
  DB.rooms.push({
    roomID: roomId,
    roomName: body.roomName
  });

  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${body.roomName} has been created`,
  });n
};
