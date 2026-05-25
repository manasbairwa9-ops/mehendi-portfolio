import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const designRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        featured: z.boolean().optional(),
        search: z.string().optional(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(12),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      const { category, featured, search, page = 1, limit = 12 } = input || {};

      const where = {
        isActive: true,
        ...(category && { category: category as any }),
        ...(featured !== undefined && { featured }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }),
      };

      const [designs, total] = await Promise.all([
        ctx.prisma.mehndiDesign.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
        }),
        ctx.prisma.mehndiDesign.count({ where }),
      ]);

      return {
        data: designs,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const design = await ctx.prisma.mehndiDesign.findUnique({
        where: { id: input.id, isActive: true },
      });

      if (!design) {
        throw new Error('Design not found');
      }

      return design;
    }),

  getFeatured: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.prisma.mehndiDesign.findMany({
        where: { featured: true, isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 6,
      });
    }),

  getCategories: publicProcedure
    .query(async ({ ctx }) => {
      const categories = await ctx.prisma.mehndiDesign.groupBy({
        by: ['category'],
        where: { isActive: true },
        _count: { category: true },
      });

      return categories.map((c) => ({
        name: c.category,
        count: c._count.category,
      }));
    }),
});
