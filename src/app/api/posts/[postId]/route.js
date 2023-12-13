import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, response) {
  try {
    const { postId } = response.params;

    // how do we extract that message from the body of the request?
    const { text } = await request.json();

    const post = await prisma.posts.findFirst({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found.",
      });
    }

    // how do we ask prisma to edit the tweett
    const updatedPost = await prisma.posts.update({
      where: {
        id: postId,
      },
      data: { text },
    });
    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function DELETE(request, response) {
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

    const deletedpost = await prisma.posts.delete({
      where: {
        id: postId,
      },
    });

    return NextResponse.json({ success: true, post: deletedpost });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
