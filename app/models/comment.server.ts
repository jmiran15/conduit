import { prisma } from "~/db.server";

// create a comment for an article and user
export async function createComment(
  body: string,
  articleSlug: string,
  authorId: string,
) {
  return await prisma.comment.create({
    data: {
      body,
      article: {
        connect: {
          slug: articleSlug,
        },
      },
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  });
}
