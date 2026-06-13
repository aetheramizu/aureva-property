import Hero from "../components/Hero";
import FeaturedVillas from "../components/FeaturedVillas";
import CuratedExperiences from "../components/CuratedExperiences";
import WhyAureva from "../components/WhyAureva";
import ImmersiveGallery from "../components/ImmersiveGallery";
import GuestChronicles from "../components/GuestChronicles";
import DestinationDiscovery from "../components/DestinationDiscovery";
import BookingCTA from "../components/BookingCTA";
import LuxuryFooter from "../components/LuxuryFooter";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedVillas />
      <CuratedExperiences />
      <ImmersiveGallery />
      <WhyAureva />
      <GuestChronicles />
      <DestinationDiscovery />
      <BookingCTA />
      <LuxuryFooter />
    </>
  );
}

