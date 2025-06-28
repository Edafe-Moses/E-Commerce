import HeroSection from '@/components/common/HeroSection';
import NavBar from '@/components/common/NavBar';
import NewProducts from "@/components/common/NewProducts";
import TopCategories from "@/components/common/TopCategories";
import Footer from "@/components/common/Footer"

export default function Home() {


  return (
    <>
      <NavBar />
      <HeroSection />
      <TopCategories />
      <NewProducts />
      <Footer />
    </>
  );
}
