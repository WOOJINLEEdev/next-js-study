import { PrismaClient } from "@prisma/client";

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

const client: PrismaClient =
  prismaGlobal.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });
if (process.env.NODE_ENV !== "production") prismaGlobal.prisma = client;

export default client;
