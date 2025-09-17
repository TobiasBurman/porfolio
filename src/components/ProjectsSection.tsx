"use client";

import type React from "react";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

interface Project {
  id: number;
  name: string;
  image: string;
  description: string;
  features: string[];
  technologies: string[];
  liveUrl: string;
}

const ProjectSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      name: "Wahzaa (Internship)",
      image: "/project1.png",
      description: `During my internship at Wahzaa Music (founded by Avicii’s father), I contributed to the development of the platform by implementing new features. One of the key projects I worked on was the "Pitch Your Music" functionality, where users could submit their songs to gain exposure and reach industry professionals. 

      This internship also gave me valuable experience in collaborating with a team, learning how to work effectively in a group setting and contribute to shared goals.`,
      features: [
        "Designed and implemented the Pitch Your Music submission flow",
        "Enabled users to upload and showcase tracks directly on the platform",
        "Improved user experience for music discovery and sharing",
        "Gained experience in teamwork and collaboration",
        ,
      ],
      technologies: [
        "Next.js",
        "React.js",
        "Material UI",
        "TypeScript",
        "Node.js",
      ],
      liveUrl: "https://www.wahzaa.com/",
    },
    {
      id: 2,
      name: "Reeler Tech (Internship)",
      image: "/project2.png",
      description: `During my internship at Reeler Tech, a company focused on boosting engagement through user-generated content, I gained valuable experience working on the admin side of the platform. I contributed by coding customer statistics and designing the visual layout to make the data more accessible and user-friendly. 

      This role helped me strengthen my technical skills while also learning how to collaborate within a team and deliver features that directly supported business goals.`,
      features: [
        "Developed customer statistics functionality for the admin panel",
        "Designed the UI for presenting and managing analytics",
        "Worked on features supporting user-generated content engagement",
        "Drag and drop task organization",
        "Gained experience in teamwork and client-focused development",
      ],
      technologies: ["React.js", "TypeScript", "BootStrap", "Figma"],
      liveUrl: "https://www.reelertech.com/",
    },
    {
      id: 3,
      name: "Email bot for music producers",
      image: "/projectt3.png",
      description:
        "An AI-powered email tool for music producers that automates the process of finding relevant companies (e.g. in car or food advertising) and creating personalized outreach emails. Users can easily set up a campaign, generate tailored email drafts, and connect with hundreds of potential partners to explore collaboration opportunities.",
      features: [
        "AI-powered company search – automatically finds relevant businesses in specific industries",
        "Personalized email generation – creates tailored outreach messages with placeholders for names, companies, and industries",
        "Campaign management: organize and run multiple outreach campaigns at once",
        "Automatic contact collection – gathers email addresses of decision-makers",
        "Scalable outreach – reach 100+ companies with one campaign",
      ],
      technologies: [
        "React",
        "Node.js",
        "Email API (SendGrid)",
        "Tailwind CSS",
      ],
      liveUrl: "https://email-bot-for-music-producers.netlify.app/",
    },
  ];

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div id="projects" className="py-16 px-4">
      <div className="max-w-7xl mx-auto mt-20">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold gradient-text text-center mb-20 py-3">
          Projects
        </h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mt-20">
          {projects.map((project) => (
            <div key={project.id} className="relative pt-16">
              {/* Project Card */}
              <div className="bg-gray-800 rounded-lg p-8 pt-24 pb-12 relative min-h-[450px] gradient-border">
                {/* Project Image - Positioned to extend upward from card */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 z-10 w-[90%]">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-80 object-cover rounded-lg shadow-2xl brightness-90"
                  />
                </div>

                {/* Project Name */}
                <h3 className="text-xl font-semibold text-gray-400 mb-10 text-center mt-48">
                  {project.name}
                </h3>

                {/* View More Button */}
                <button
                  onClick={() => openModal(project)}
                  className="w-full py-3 px-6 bg-transparent border-2 rounded-full font-medium gradient-border text-gray-400 transition-all duration-300 transform hover:scale-105"
                >
                  VIEW MORE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-[80vw] w-full max-h-[100vh] overflow-y-auto">
              <div className="flex flex-col lg:flex-row">
                {/* Project Image */}
                <div className="lg:w-1/2 p-5 pr-0 align-center justify-center">
                  <img
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.name}
                    className="w-full h-full lg:h-full object-cover rounded-lg brightness-90"
                  />
                </div>

                {/* Project Details */}
                <div className="lg:w-1/2 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold gradient-text">
                      {selectedProject.name}
                    </h3>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-white text-2xl font-bold"
                    >
                      ×
                    </button>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-200 mb-3">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li
                          key={index}
                          className="text-gray-300 flex items-start"
                        >
                          <span className="gradient-text mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-200 mb-3">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="gradient-border text-gray-300 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* Live Button */}
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={() =>
                          window.open(
                            selectedProject.liveUrl,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                        className="px-4 py-3 rounded-full font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2"
                        style={{ backgroundColor: "hsl(25 95% 53%)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "hsl(25 95% 60%)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "hsl(25 95% 53%)")
                        }
                      >
                        Live
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSection;
