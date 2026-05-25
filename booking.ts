import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { bookingFormSchema } from '@mehndi/shared';

export const bookingRouter = router({
  create: publicProcedure
    .input(bookingFormSchema)
    .mutation(async ({ ctx, input }) => {
      const eventDate = new Date(input.eventDate);

      const designs = await ctx.prisma.mehndiDesign.findMany({
        where: { id: { in: input.designIds } },
      });

      const totalPrice = designs.reduce((sum, d) => sum + (d.price?.toNumber() || 0), 0);

      const booking = await ctx.prisma.booking.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          eventType: input.eventType,
          eventDate,
          designIds: input.designIds,
          message: input.message,
          totalPrice: totalPrice || null,
        },
      });

      return {
        success: true,
        data: booking,
        message: 'Booking request submitted successfully! We will contact you shortly.',
      };
    }),

  getByEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      const bookings = await ctx.prisma.booking.findMany({
        where: { email: input.email },
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
        },
      });

      return bookings;
    }),
});
