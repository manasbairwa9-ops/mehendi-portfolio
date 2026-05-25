import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export const bookingFormSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  eventType: z.enum(["WEDDING", "ENGAGEMENT", "FESTIVAL", "PARTY", "CORPORATE", "OTHER"]),
  eventDate: z.string().refine((val) => {
    const date = new Date(val);
    return date > new Date();
  }, "Event date must be in the future"),
  designIds: z.array(z.string()).min(1, "Select at least one design"),
  message: z.string().max(1000).optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().optional(),
  rating: z.number().min(1).max(5).default(5),
  comment: z.string().min(10).max(2000),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type BookingFormInput = z.infer<typeof bookingFormSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
