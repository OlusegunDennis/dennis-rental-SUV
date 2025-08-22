import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Services from "@/app/components/Services";
import Gallery from "@/app/components/Gallery";
import BookingCalculator from "@/app/components/BookingCalculator";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <BookingCalculator />
      <Footer />
    </main>
  );
}