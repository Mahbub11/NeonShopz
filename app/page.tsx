import CategoriesSlider from "@/components/homepage/categories-slider";
import FeatureProductSlider from "@/components/homepage/feature-product";
import HeroCarousel from "@/components/homepage/hero";
import NewProductSlider from "@/components/homepage/new-product";
import SectiontwoBannar from "@/container/homepage/bannar-section-two";
import CategorySection from "@/container/homepage/category-section";
import FeatureSection from "@/container/homepage/feature-section";
import HomeHero from "@/container/homepage/hero";
import InstagramCarosol from "@/container/homepage/instagram-carosl";
import NewArrivalSection from "@/container/homepage/new-arrival-section";
import Image from "next/image";

export default async function Home() {
  return (
    <div>
      <HomeHero></HomeHero>
      <div className="md:w-full lg:w-[70%] xl:w-[70%] mx-auto flex-col space-y-100">
        <CategorySection></CategorySection>
        <NewArrivalSection></NewArrivalSection>
      </div>
      {/* <SectiontwoBannar></SectiontwoBannar> */}

      <div className="md:w-full lg:w-[75%] xl:w-[70%] mx-auto flex-col space-y-100">
        <NewArrivalSection></NewArrivalSection>
        <FeatureSection></FeatureSection>
        <InstagramCarosol></InstagramCarosol>
      </div>
      {/* <div>
        <HeroCarousel></HeroCarousel>

        <div className="px-10 py-10">
          <CategoriesSlider></CategoriesSlider>
        </div>

        <div className="mt-10 flex sm:flex-col md:flex-row space-x-3 justify-center px-5">
         <div className="w-[100%] md:w-[50%] ">
         <NewProductSlider></NewProductSlider>
         </div>
          <div className="w-full md:w-[50%]">
          <FeatureProductSlider></FeatureProductSlider>
          </div>
        </div>
      </div> */}
    </div>
  );
}
