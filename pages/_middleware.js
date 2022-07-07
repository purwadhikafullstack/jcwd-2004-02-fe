import { NextResponse } from "next/server";
import { API_URL } from "../helpers";

export async function middleware(req) {
  const token = req.cookies.token;
  let response = await fetch(`${API_URL}/auth/checkRole`, {
    method: "GET",
    headers: {
      authorization: `${token}`,
    },
  });
  let data = await response.json();
  let role = data.role_id;
  // if (req.nextUrl.pathname.includes("/admin") && role !== 1) {
  //   console.log("masuk sini");
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  if (req.nextUrl.pathname.includes("/admin")) {
    if (role !== 1) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}
