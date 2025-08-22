import { Plane, Calendar, Shield } from "lucide-react";

const services = [
  {
    icon: <Plane className="w-8 h-8" />,
    title: "Airport Transfers",
    description: "Reliable and timely airport pickups and drop-offs with professional chauffeurs."
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Daily & Weekly Hire",
    description: "Flexible rental options for daily commutes or longer weekly engagements."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Event & VIP Transport",
    description: "Premium transportation solutions for special events and VIP guests."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Our Core Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}