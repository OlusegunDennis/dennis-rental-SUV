"use client";

import Image from "next/image";

// Data for the Car View section
const carImages = [
  { id: 1, src: "/images/prado-exterior-1.jpg", alt: "Prado SUV Exterior" },
  { id: 2, src: "/images/prado-interior-1.jpg", alt: "Prado SUV Interior" },
  { id: 4, src: "/images/prado-exterior-2.jpg", alt: "Prado SUV Side View" },
  { id: 5, src: "/images/prado-dashboard.jpg", alt: "Prado Dashboard" },
];

// Data for the Security Team section
const securityImages = [
  { id: 3, src: "/images/security-team-1.jpg", alt: "Security Team" },
  { id: 6, src: "/images/security-equipment.jpg", alt: "Security Equipment" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-2">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          Gallery
        </h2>

        {/* Car View Section - FULL WIDTH IMAGES */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
            Car Views
          </h3>
          <div className="space-y-12">
            {carImages.map((image) => (
              <div key={image.id} className="relative w-full h-[70vh] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Security Team Section - FULL WIDTH IMAGES */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
            Security Team (upon request)
          </h3>
          <div className="space-y-12">
            {securityImages.map((image) => (
              <div key={image.id} className="relative w-full h-[70vh] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
