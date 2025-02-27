import Image from "next/image";
import Navbar from "./components/navbar";
import LandingPage from "./components/landingpage";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <LandingPage />
    </div>
  );
}