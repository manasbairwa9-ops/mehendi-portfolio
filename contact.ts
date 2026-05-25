import { router, publicProcedure } from '../trpc';
import { contactFormSchema } from '@mehndi/shared';

export const contactRouter = router({
  sendMessage: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ ctx, input }) => {
      const message = await ctx.prisma.message.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          subject: input.subject,
          content: input.message,
        },
      });

      return {
        success: true,
        data: message,
        message: 'Thank you for reaching out! We will get back to you within 24 hours.',
      };
    }),
});
