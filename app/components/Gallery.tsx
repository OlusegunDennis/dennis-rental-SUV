"use client";

import Image from "next/image";

// In a real app, these would be imported from your public/images folder
const galleryImages = [
  { id: 1, src: "/images/prado-exterior-1.jpg", alt: "Prado SUV Exterior" },
  { id: 2, src: "/images/prado-interior-1.jpg", alt: "Prado SUV Interior" },
  { id: 3, src: "/images/security-team-1.jpg", alt: "Security Team" },
  { id: 4, src: "/images/prado-exterior-2.jpg", alt: "Prado SUV Side View" },
  { id: 5, src: "/images/prado-dashboard.jpg", alt: "Prado Dashboard" },
  { id: 6, src: "/images/security-equipment.jpg", alt: "Security Equipment" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Our Vehicle & Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="relative aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}