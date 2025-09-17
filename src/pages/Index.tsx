import React from "react";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import MusicSection from "@/components/MusicSection";
import ContactSection from "@/components/ContactSection";
import MyMusic from "@/components/MyMusic";
import MyTracks from "@/components/MyTracks";
import Navbar from "@/components/navbar";

const Index = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen bg-background">
        <HeroSection />
        <MusicSection />
        <ProjectsSection />
        <SkillsSection />
        <MyMusic />
        <MyTracks />
        <ContactSection />
      </div>
    </>
  );
};

export default Index;
