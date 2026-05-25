import { BookingForm } from "@/components/booking/booking-form";

export const metadata = {
  title: "Book Appointment | Mehndi Artistry",
  description: "Book your mehndi appointment for weddings, festivals, and special occasions. Easy online booking available.",
};

export default function BookingPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-mehndi-dark mb-4">
            Book Your Appointment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below and we will get back to you within 24 hours to confirm your booking.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
