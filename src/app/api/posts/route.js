import { prisma } from "@/app/lib/prisma";

import { NextResponse } from "next/server";
import { typescript } from "../../../../next.config";

export async function GET(request, response) {
  try {
    const posts = await prisma.posts.findMany();
    return NextResponse.json({ success: "true", posts });
  } catch (error) {
    return NextResponse.json({ success: "false", error: error.message });
  }
}

export async function POST(request, response) {
  try {
    const { text, likes, createAt } = await request.json();
    if (!text) {
      return NextResponse.json({
        success: false,
        error: "You must provide a text to create a post.",
      });
    }
    const post = await prisma.posts.create({
      data: { text, likes: 0, createAt },
    });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
