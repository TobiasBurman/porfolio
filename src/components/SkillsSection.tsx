import type React from "react";

const SkillsSection: React.FC = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "HTML", icon: "/html.png?height=60&width=60" },
        { name: "JavaScript", icon: "/javascript1.svg?height=60&width=60" },
        { name: "TypeScript", icon: "/typescript.svg?height=60&width=60" },
        { name: "React", icon: "/react.svg?height=60&width=60" },
        { name: "Next", icon: "/next.svg?height=60&width=60" },
        { name: "Firebase", icon: "/firebase.svg?height=60&width=60" },
      ],
    },
    {
      title: "Styling & Design",
      skills: [
        { name: "CSS", icon: "/css.png?height=60&width=60" },
        { name: "Bootstrap", icon: "/bootstrap.png?height=60&width=60" },
        { name: "TailwindCSS", icon: "/tailwindcss.svg?height=60&width=60" },
        { name: "Figma", icon: "/figma.png?height=60&width=60" },
        { name: "MaterialUI", icon: "/material.png?height=60&width=60" },
      ],
    },
    {
      title: "Miscellaneous",
      skills: [
        { name: "Git", icon: "/git.png?height=60&width=60" },
        { name: "GitHub", icon: "/github.png?height=60&width=60" },
        { name: "Webpack", icon: "/webpack.png?height=60&width=60" },
      
      ],
    },
    {
      title: "Other Tools & Technologies",
      skills: [
        { name: "Ableton", icon: "/ableton.png?height=60&width=60" },
        { name: "FL Studio", icon: "/fl_studio.png?height=60&width=60" },
        { name: "Logic Pro", icon: "/logic.png?height=60&width=60" },
      ],
    },
  ];

  return (
    <section id="technologies" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">
            Skills & Tools
          </h2>
        </div>

        {/* Skills Grid - 2x2 Layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="gradient-border bg-card rounded-3xl p-8"
            >
              {/* Category Title */}
              <h3 className="text-2xl font-bold text-gray-400 mb-8 text-center">
                {category.title}
              </h3>

              {/* Skills Grid - Custom layout for different counts */}
              <div
                className={`flex flex-wrap justify-center gap-6 ${
                  category.skills.length === 3 ? "max-w-48" : "max-w-xs"
                } mx-auto`}
              >
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex flex-col items-center text-center w-20"
                    style={{
                      flexBasis:
                        category.skills.length === 3
                          ? skillIndex < 2
                            ? "calc(50% - 0.75rem)" // First 2 items take 50% each
                            : "100%" // Third item takes full width (centered)
                          : "calc(33.333% - 1rem)", // Normal 3-per-row layout
                    }}
                  >
                    {/* Icon */}
                    <div className="w-16 h-16 mb-3 flex items-center justify-center">
                      <img
                        src={skill.icon || "/placeholder.svg"}
                        alt={`${skill.name} logo`}
                        className="w-full h-full object-contain"
                        crossOrigin="anonymous"
                      />
                    </div>
                    {/* Skill name */}
                    <span className="text-gray-400 font-medium text-sm">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
