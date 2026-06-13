import Hero from "../components/Hero";
import FeaturedVillas from "../components/FeaturedVillas";
import CuratedExperiences from "../components/CuratedExperiences";
import WhyAureva from "../components/WhyAureva";
import ImmersiveGallery from "../components/ImmersiveGallery";
import GuestChronicles from "../components/GuestChronicles";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedVillas />
      <CuratedExperiences />
      <ImmersiveGallery />
      <WhyAureva />
      <GuestChronicles />
    </>
  );
}
