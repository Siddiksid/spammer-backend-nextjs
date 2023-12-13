import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  try {
    const { postId } = response.params;
    const post = await prisma.posts.findFirst({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found.",
      });
    }
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
    });
    return NextResponse.json({
      success: true,
      comments,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

export async function POST(request, response) {
  try {
    const { postId } = response.params;
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({
        success: false,
        error: "You need to enter a text field",
      });
    }
    const comment = await prisma.comment.create({
      data: { postId, text },
    });
    return NextResponse.json({ success: true, comment });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
