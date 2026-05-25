import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const designs = [
    {
      title: "Traditional Bridal Full Hand",
      description: "Intricate traditional bridal mehndi covering full hands with paisley patterns, floral motifs, and hidden names.",
      category: Category.BRIDAL,
      imageUrl: "/images/designs/traditional-bridal.jpg",
      price: 150.00,
      duration: 180,
      featured: true,
    },
    {
      title: "Arabic Flowing Patterns",
      description: "Elegant Arabic style with flowing vines, leaves, and negative space design. Perfect for modern events.",
      category: Category.ARABIC,
      imageUrl: "/images/designs/arabic-flowing.jpg",
      price: 80.00,
      duration: 60,
      featured: true,
    },
    {
      title: "Minimalist Wrist Band",
      description: "Delicate wrist band designs for everyday elegance. Subtle and sophisticated.",
      category: Category.MINIMAL,
      imageUrl: "/images/designs/minimal-wrist.jpg",
      price: 25.00,
      duration: 20,
      featured: false,
    },
    {
      title: "Festive Peacock Design",
      description: "Majestic peacock motifs combined with traditional elements for festival celebrations.",
      category: Category.FESTIVE,
      imageUrl: "/images/designs/festive-peacock.jpg",
      price: 120.00,
      duration: 120,
      featured: true,
    },
    {
      title: "Modern Geometric",
      description: "Contemporary geometric patterns with mandala elements. Trendy and unique.",
      category: Category.MODERN,
      imageUrl: "/images/designs/modern-geometric.jpg",
      price: 65.00,
      duration: 45,
      featured: false,
    },
    {
      title: "Kids Cartoon Characters",
      description: "Fun designs featuring cartoon characters, animals, and playful patterns for children.",
      category: Category.KIDS,
      imageUrl: "/images/designs/kids-cartoon.jpg",
      price: 20.00,
      duration: 30,
      featured: false,
    },
  ];

  for (const design of designs) {
    await prisma.mehndiDesign.upsert({
      where: { id: design.title },
      update: {},
      create: design,
    });
  }

  const testimonials = [
    {
      name: "Priya Sharma",
      email: "priya@example.com",
      rating: 5,
      comment: "Absolutely stunning bridal mehndi! The attention to detail was incredible. Everyone at my wedding was amazed by the intricate patterns.",
      imageUrl: "/images/testimonials/priya.jpg",
    },
    {
      name: "Aisha Khan",
      email: "aisha@example.com",
      rating: 5,
      comment: "The Arabic design I got for Eid was breathtaking. So elegant and exactly what I envisioned. Highly recommend!",
      imageUrl: "/images/testimonials/aisha.jpg",
    },
    {
      name: "Rahul Verma",
      email: "rahul@example.com",
      rating: 5,
      comment: "Booked for my sister's engagement. Professional service, punctual, and the designs were out of this world. Worth every penny!",
      imageUrl: "/images/testimonials/rahul.jpg",
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }

  const configs = [
    { key: "site_title", value: "Mehndi Artistry by [Your Name]", description: "Main website title" },
    { key: "site_description", value: "Award-winning mehndi artist specializing in bridal, Arabic, and modern designs. Serving clients with passion and precision.", description: "Meta description" },
    { key: "contact_phone", value: "+91-98765-43210", description: "Primary contact number" },
    { key: "contact_email", value: "contact@mehndiartist.com", description: "Contact email" },
    { key: "contact_address", value: "123 Art Lane, Creative District, Mumbai, India", description: "Studio address" },
    { key: "social_instagram", value: "https://instagram.com/mehndiartist", description: "Instagram profile" },
    { key: "social_facebook", value: "https://facebook.com/mehndiartist", description: "Facebook page" },
    { key: "social_whatsapp", value: "https://wa.me/919876543210", description: "WhatsApp link" },
  ];

  for (const config of configs) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: {},
      create: config,
    });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
