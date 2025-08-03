import Slider from "./components/Carousel";
import ClientLogoSlider from "./components/ClientLogoSlider";
import PrimeLocationsPage from "./components/PrimeLocations";
import ProjectGallery from "./components/ProjectGallery";
import PromotionalBanner from "./components/PromotionalBanner";
import ViewBlogs from "./components/ViewBlogs";

export default function Home() {
  return (
    <>
      <Slider />
      <ClientLogoSlider/>
      <ProjectGallery/>
      <PromotionalBanner/>
      <ViewBlogs/>
      <PrimeLocationsPage/>
      
    </>
  );
}
