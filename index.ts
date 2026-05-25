import { router } from '../trpc';
import { designRouter } from './design';
import { bookingRouter } from './booking';
import { testimonialRouter } from './testimonial';
import { contactRouter } from './contact';
import { configRouter } from './config';

export const appRouter = router({
  design: designRouter,
  booking: bookingRouter,
  testimonial: testimonialRouter,
  contact: contactRouter,
  config: configRouter,
});

export type AppRouter = typeof appRouter;
