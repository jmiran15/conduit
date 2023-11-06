import { Article, Prisma } from "@prisma/client";
import slug from "slug";

import { prisma } from "~/db.server";

export type Article_Tags_Author_Favs = Prisma.ArticleGetPayload<{
  include: {
    tags: true;
    author: true;
    favorites: {
      select: {
        id: true;
      };
    };
  };
}>;

// create an article
export async function createArticle(
  title: Article["title"],
  description: Article["description"],
  body: Article["body"],
  authorId: Article["authorId"],
  tags: string[],
) {
  const slugifiedTitle = slug(title);
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
              image: true,
            },
          },
        },
      },
    },
  });
}

// load articles made by a specific user
export async function getArticlesByUser(
  userId: Article["authorId"],
): Promise<Article_Tags_Author_Favs[]> {
  return await prisma.article.findMany({
    where: {
      authorId: userId,
    },
    include: {
      tags: true,
      author: true,
      favorites: {
        select: {
          id: true,
        },
      },
    },
  });
}

// load in all the articles
export async function getAllArticles(): Promise<Article_Tags_Author_Favs[]> {
  return await prisma.article.findMany({
    include: {
      tags: true,
      author: true,
      favorites: {
        select: {
          id: true,
        },
      },
    },
  });
}

// like an article
export async function likeArticle(
  slug: Article["slug"],
  userId: Article["authorId"],
) {
  return await prisma.article.update({
    where: { slug },
    data: {
      favorites: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

// unlike an article
export async function unlikeArticle(
  slug: Article["slug"],
  userId: Article["authorId"],
) {
  return await prisma.article.update({
    where: { slug },
    data: {
      favorites: {
        disconnect: {
          id: userId,
        },
      },
    },
  });
}
