import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { SiTiktok, SiSnapchat } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Dennis Rental Naija</h3>
            <p className="text-gray-400 mb-4">
              Premium Prado SUV rentals with professional security services in Lagos, Nigeria.
            </p>
            <div className="flex space-x-4">
  <a
    href="https://web.facebook.com/profile.php?id=61576739563922"
    aria-label="Facebook"
    className="text-gray-400 hover:text-white transition-colors"
  >
    <Facebook className="w-5 h-5" />
  </a>
  <a
    href="https://x.com/dennis_rental"
    aria-label="Twitter"
    className="text-gray-400 hover:text-white transition-colors"
  >
    <Twitter className="w-5 h-5" />
  </a>
  <a
    href="https://www.instagram.com/dennis_rental_naija"
    aria-label="Instagram"
    className="text-gray-400 hover:text-white transition-colors"
  >
    <Instagram className="w-5 h-5" />
  </a>
  <a
    href="https://www.tiktok.com/@dennis_rental_naija"
    aria-label="TikTok"
    className="text-gray-400 hover:text-white transition-colors"
  >
    <SiTiktok className="w-5 h-5" />
  </a>
  <a
    href="https://t.snapchat.com/sfQ41CEI"
    aria-label="Snapchat"
    className="text-gray-400 hover:text-white transition-colors"
  >
    <SiSnapchat className="w-5 h-5" />
  </a>
</div>

          </div>

          {/* Quick Links */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/cars" className="text-gray-400 hover:text-white transition-colors">Our Cars</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div> */}

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><Link href="#services" className="text-gray-400 hover:text-white transition-colors">Airport Transfers</Link></li>
              <li><Link href="#services" className="text-gray-400 hover:text-white transition-colors">Daily & Weekly Hire</Link></li>
              <li><Link href="#services" className="text-gray-400 hover:text-white transition-colors">Event & VIP Transport</Link></li>
              <li><Link href="#booking" className="text-gray-400 hover:text-white transition-colors">Booking Calculator</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">G. Cappa Estate, Ikeja, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" />
                <a href="tel:+2349032054555" className="text-gray-400 hover:text-white transition-colors">
                  +234 9032054555
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" />
                <a href="mailto:info@dennisrental.com" className="text-gray-400 hover:text-white transition-colors">
                  info@dennisrentalnaija.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dennis Rental Naija. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}