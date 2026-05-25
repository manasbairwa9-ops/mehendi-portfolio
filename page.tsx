import { Hero } from "@/components/sections/hero";
import { FeaturedDesigns } from "@/components/sections/featured-designs";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { BookingCTA } from "@/components/sections/booking-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDesigns />
      <About />
      <Services />
      <Testimonials />
      <BookingCTA />
    </>
  );
}
