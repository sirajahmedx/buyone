import FeaturedProducts from "@/components/Featured";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSlider from "@/components/Hero";
import Image from "next/image";

export default function Home() {
   return (
      <>
         {/* <Header /> */}
         <HeroSlider />
         <FeaturedProducts />
         <Footer />

      </>
   );
}
