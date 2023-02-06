import { PrismaClient } from "@~internal/prisma";

const prisma = global.prisma || new PrismaClient();

export default prisma;
