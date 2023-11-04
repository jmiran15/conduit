import { Article } from "@prisma/client";
import slug from "slug";

import { prisma } from "~/db.server";

export type { Article } from "@prisma/client";

// create an article
export async function createArticle(
  title: Article["title"],
  description: Article["description"],
  body: Article["body"],
  authorId: Article["authorId"],
  tags: string[],
) {
  console.log("createArticle", title, description, body, authorId, tags);
  const slugifiedTitle = slug(title);

  console.log("slugifiedTitle", slugifiedTitle);

  const article = prisma.article.create({
    data: {
      title,
      description,
      body,
      authorId,
      slug: slugifiedTitle,
    },
  });

  // upsert the tags, if tag with that name already exists, add the article to its articles array, if it doesnt exist, then create it with the article as it's only article
  const upsertTags = tags.map((tag) =>
    prisma.tag.upsert({
      where: { name: tag },
      create: {
        name: tag,
        articles: {
          connect: {
            slug: slugifiedTitle,
          },
        },
      },
      update: {
        articles: {
          connect: {
            slug: slugifiedTitle,
          },
        },
      },
    }),
  );

  return await prisma.$transaction([article, ...upsertTags]);
}

// get an article by its slug
// include article author
// include article author's email and image
// include comments
// include comment author name
export async function getArticleBySlug(slug: Article["slug"]) {
  return await prisma.article.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          email: true,
          image: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              email: true,
            },
          },
        },
      },
    },
  });
}
