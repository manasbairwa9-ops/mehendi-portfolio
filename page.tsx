import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { GalleryFilters } from "@/components/gallery/gallery-filters";

export const metadata = {
  title: "Design Gallery | Mehndi Artistry",
  description: "Browse our collection of stunning mehndi designs - bridal, Arabic, modern, minimal, and festive styles.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-mehndi-dark mb-4">
            Our Design Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of handcrafted mehndi designs, each telling a unique story through intricate patterns.
          </p>
        </div>

        <GalleryFilters />
        <GalleryGrid />
      </div>
    </div>
  );
}
