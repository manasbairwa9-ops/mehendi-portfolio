import { router, publicProcedure } from '../trpc';

export const configRouter = router({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      const configs = await ctx.prisma.siteConfig.findMany();

      return configs.reduce((acc, config) => {
        acc[config.key] = config.value;
        return acc;
      }, {} as Record<string, string>);
    }),

  getByKey: publicProcedure
    .input((val: unknown) => {
      if (typeof val !== 'string') throw new Error('Invalid input');
      return val;
    })
    .query(async ({ ctx, input }) => {
      const config = await ctx.prisma.siteConfig.findUnique({
        where: { key: input },
      });

      return config?.value || null;
    }),
});
