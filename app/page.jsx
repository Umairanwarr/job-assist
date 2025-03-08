import Image from "next/image";
import Navbar from "./components/navbar";
import LandingPage from "./components/landingpage";
import WhyChooseUs from "./components/whychooseus"; // Add new import

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <LandingPage />
      {/* Add WhyChooseUs here */}
    </div>
  );
}