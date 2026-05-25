import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { testimonialSchema } from '@mehndi/shared';

export const testimonialRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(20).default(10),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      const { page = 1, limit = 10 } = input || {};

      const [testimonials, total] = await Promise.all([
        ctx.prisma.testimonial.findMany({
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
        }),
        ctx.prisma.testimonial.count({ where: { isActive: true } }),
      ]);

      return {
        data: testimonials,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    }),

  getFeatured: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.prisma.testimonial.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      });
    }),

  create: publicProcedure
    .input(testimonialSchema)
    .mutation(async ({ ctx, input }) => {
      const testimonial = await ctx.prisma.testimonial.create({
        data: {
          name: input.name,
          email: input.email,
          rating: input.rating,
          comment: input.comment,
        },
      });

      return {
        success: true,
        data: testimonial,
        message: 'Thank you for your testimonial! It will be reviewed shortly.',
      };
    }),
});
