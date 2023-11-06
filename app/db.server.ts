import { PrismaClient } from "@prisma/client";

import { singleton } from "./singleton.server";

// Hard-code a unique key, so we can look up the client when this module gets re-imported
const prisma = singleton("prisma", () => new PrismaClient());
prisma.$connect();

// add middleware here for aggregate fields (i.e. commentsCount)

prisma.$use(async (params, next) => {
  if (params.model === "Article" && params.action === "update") {
    if (params.args.data.favorites?.connect) {
      params.args.data.favoritesCount = { increment: 1 };
    }
    if (params.args.data.favorites?.disconnect) {
      params.args.data.favoritesCount = { decrement: 1 };
    }
  }

  return next(params);
});

export { prisma };
