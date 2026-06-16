import { NextResponse } from "next/server";

export async function parseJsonRequest(request: Request) {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}

export function badRequest() {
  return NextResponse.json({ ok: false }, { status: 400 });
}

export function serverError() {
  return NextResponse.json({ ok: false }, { status: 500 });
}
