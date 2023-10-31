import { NextResponse } from "next/server";

export async function GET() {
  try {
    const respose = NextResponse.json({
      message: "Logout success",
      success: true,
    });
    respose.cookies.set("token", "", { 
        httpOnly: true,
    });
    return respose;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
