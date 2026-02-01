import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET(req: Request) {
  try {
    if (!BASE_URL) {
      return NextResponse.json(
        { error: "BASE_URL is not defined" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);

    const url = `${BASE_URL}/campers?${searchParams.toString()}`;

    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "Backend error", details: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
