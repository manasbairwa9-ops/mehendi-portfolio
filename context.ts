import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { prisma } from '@mehndi/database';

export async function createContext({ req, res }: CreateExpressContextOptions) {
  return {
    req,
    res,
    prisma,
    user: null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
