import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, response) {
  try {
    const { postId } = response.params;

    // const { likes } = await request.json();

    const post = await prisma.posts.findFirst({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found.",
      });
    }

    const updatedpostlikes = await prisma.posts.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
    return NextResponse.json({ success: true, post: updatedpostlikes });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
