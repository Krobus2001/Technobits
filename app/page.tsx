import ScrollProgress from "@/components/layout/ScrollProgress";
import CursorGlow from "@/components/effects/CursorGlow";

import Navbar from "@/components/layout/Navbar";

import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import Events from "@/components/home/Events";
import Tutorials from "@/components/home/Tutorials";
import Discussions from "@/components/home/Discussions";
import FooterCTA from "@/components/home/FooterCTA";
import PageLoader from "@/components/effects/PageLoader";
import BackToTop from "@/components/effects/BackToTop";
import FloatingDock from "@/components/effects/FloatingDock";
import GridBackground from "@/components/effects/GridBackground";

export default function Home() {
  return (
    <>
      <PageLoader />
      <GridBackground />
      <ScrollProgress />
      <CursorGlow />

      <Navbar />

      <Hero />
      <Stats />
      <About />
      <Services />
      <Events />
      <Tutorials />
      <Discussions />
      <FooterCTA />
      <FloatingDock />

      <BackToTop />
    </>
  );
}