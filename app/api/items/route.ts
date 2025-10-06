import { getAllItems } from "@/app/lib/actions";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await getAllItems();
    return NextResponse.json(res);
  } catch(error){
    return NextResponse.error();
  }
};