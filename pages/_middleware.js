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
  //   return NextResponse.redirect(new URL("/home", req.url));
  // }

  // proteksi user tidak bisa masuk fitur admin
  if (req.nextUrl.pathname.includes("/admin") && role !== "Admin") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // proteksi admin tidak bisa masuk fitur user
  if (req.nextUrl.pathname == "/home" && role === "Admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (req.nextUrl.pathname == "/forgotPassword" && role === "Admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (req.nextUrl.pathname == "/payment" && role === "Admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (req.nextUrl.pathname == "/products" && role === "Admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (req.nextUrl.pathname == "/userprofile" && role === "Admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (req.nextUrl.pathname == "/verified" && role === "Admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (req.nextUrl.pathname == "/address" && role === "Admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (req.nextUrl.pathname == "/cart" && role === "Admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (req.nextUrl.pathname == "/changePass" && role === "Admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (req.nextUrl.pathname == "/checkout" && role === "Admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (req.nextUrl.pathname == "/prescription" && role === "Admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (req.nextUrl.pathname == "/prescriptionBerhasil" && role === "Admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (req.nextUrl.pathname == "/profile" && role === "Admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (req.nextUrl.pathname == "/register" && role === "Admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (req.nextUrl.pathname == "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // if token undefine
  if (req.nextUrl.pathname == "/forgotPassword" && !token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (req.nextUrl.pathname == "/payment" && !token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (req.nextUrl.pathname == "/products" && !token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (req.nextUrl.pathname == "/userprofile" && !token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (req.nextUrl.pathname == "/verified" && !token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (req.nextUrl.pathname == "/address" && !token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (req.nextUrl.pathname == "/cart" && !token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (req.nextUrl.pathname == "/changePass" && !token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (req.nextUrl.pathname == "/checkout" && !token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (req.nextUrl.pathname == "/prescription" && !token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (req.nextUrl.pathname == "/prescriptionBerhasil" && !token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (req.nextUrl.pathname == "/profile" && !token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}
