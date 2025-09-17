import type React from "react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/TOBIAS BURMAN RESUME.pdf";
    link.download = "TOBIAS_BURMAN_RESUME.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const codeSnippets = [
    // Top row
    {
      text: "import React, { useState, useEffect } from 'react';",
      top: "5%",
      right: "15%",
    },
    { text: "export default function Dashboard() {", top: "8%", right: "45%" },
    {
      text: "const [loading, setLoading] = useState(false);",
      top: "12%",
      right: "25%",
    },

    // Second row
    {
      text: "const handleSubmit = async (data) => {",
      top: "18%",
      right: "10%",
    },
    {
      text: "const response = await fetch('/api/users');",
      top: "22%",
      right: "40%",
    },
    { text: "try {", top: "25%", right: "20%" },

    // Third row
    { text: "const result = await response.json();", top: "32%", right: "15%" },
    { text: "setData(result);", top: "35%", right: "50%" },
    { text: "} catch (error) {", top: "38%", right: "25%" },

    // Fourth row
    { text: "console.error('API Error:', error);", top: "45%", right: "10%" },
    { text: "} finally {", top: "48%", right: "35%" },
    { text: "setLoading(false);", top: "52%", right: "20%" },

    // Fifth row
    { text: "return (", top: "58%", right: "15%" },
    {
      text: '<div className="container mx-auto px-4">',
      top: "62%",
      right: "45%",
    },
    { text: '<h1 className="text-2xl font-bold">', top: "65%", right: "25%" },

    // Sixth row
    { text: "Frontend Developer Portfolio", top: "72%", right: "10%" },
    { text: "</h1>", top: "75%", right: "40%" },
    { text: "{loading ? (", top: "78%", right: "20%" },

    // Seventh row
    { text: '<Spinner className="animate-spin" />', top: "85%", right: "15%" },
    { text: ") : (", top: "88%", right: "45%" },
    { text: "<ProjectGrid projects={data} />", top: "92%", right: "25%" },

    // Bottom row
    { text: ")}", top: "95%", right: "35%" },
    { text: "</div>", top: "90%", right: "10%" },

    // Left side additions for better balance
    { text: "// Custom hook for data fetching", top: "15%", right: "65%" },
    { text: "const useApi = (url) => {", top: "25%", right: "70%" },
    {
      text: "const [data, setData] = useState(null);",
      top: "35%",
      right: "75%",
    },
    { text: "useEffect(() => {", top: "45%", right: "75%" },
    { text: "fetchData(url).then(setData);", top: "55%", right: "70%" },
    { text: "}, [url]);", top: "65%", right: "75%" },
    { text: "return data;", top: "75%", right: "65%" },
    { text: "};", top: "85%", right: "70%" },

    { text: "useEffect(() => {", top: "80%", right: "65%" },
    { text: "const result = await response.json();", top: "80%", right: "10%" },
    { text: "fetchData(url).then(setData);", top: "85%", right: "70%" },
    { text: "}, [url]);", top: "90%", right: "75%" },
    { text: "return data;", top: "95%", right: "65%" },
    { text: "};", top: "80%", right: "70%" },
  ];

  return (
    <section
      id="about-me"
      className="relative min-h-screen flex items-center bg-background overflow-hidden"
    >
      <div className="relative z-10 flex flex-col lg:flex-row items-center max-w-7xl mx-auto px-6 w-full mt-20 gap-8">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight md:mt-20">
            <span className="block gradient-text">FRONTEND</span>
            <span className="block gradient-text">DEVELOPER</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-xl leading-relaxed mx-auto lg:mx-0 text-gray-400">
            I am Tobias Burman –{" "}
            <span className="text-accent font-medium">web-developer</span> and music enthusiast who enjoys bringing creativity to everything I do
          </p>

          {/* CTA Button */}
          <div className="mb-12">
            <Button
              size="lg"
              onClick={handleDownloadResume}
              className="gradient-border bg-transparent hover:bg-foreground/5 transition-all duration-300 px-8 py-4 text-lg font-medium relative z-10 text-gray-400"
            >
              Download My Resume
            </Button>
          </div>
        </div>

        {/* Right Content - Profile Image with Code Background */}
        <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
          <div className="relative w-full h-[400px] md:h-[500px] lg:w-[600px] lg:h-[600px] mx-auto">
            {/* Code Background - Static with fixed dimensions */}
            <div className="absolute inset-0 w-full h-full overflow-hidden  ml-10">
              {codeSnippets.map((snippet, index) => (
                <div
                  key={index}
                  className="code-background absolute text-xs md:text-sm"
                  style={{
                    top: snippet.top,
                    right: snippet.right,
                  }}
                >
                  {snippet.text}
                </div>
              ))}
            </div>

            {/* Profile Image */}
            <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="lg:w-[500px] lg:h-[500px] overflow-hidden rounded-b-3xl mb-32 md:w-[400px] md:h-[500px] sm:w-full sm:h-full">
                <img
                  src="/pic.png"
                  alt="Tobias Burman - Frontend Developer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
