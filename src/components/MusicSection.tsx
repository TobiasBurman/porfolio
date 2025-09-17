import React, { useEffect, useCallback, useState, useRef } from "react";
import { JourneyModal } from "./JourneyModal";

interface PianoKey {
  note: string;
  frequency: number;
  isBlack: boolean;
  keyBinding: string;
}

const PIANO_KEYS: PianoKey[] = [
  { note: "C", frequency: 261.63, isBlack: false, keyBinding: "a" },
  { note: "C#", frequency: 277.18, isBlack: true, keyBinding: "w" },
  { note: "D", frequency: 293.66, isBlack: false, keyBinding: "s" },
  { note: "D#", frequency: 311.13, isBlack: true, keyBinding: "e" },
  { note: "E", frequency: 329.63, isBlack: false, keyBinding: "d" },
];

const DEVELOPER_JOURNEY = {
  background: {
    title: "Background",
    content: `Music has been a central part of my life since I was young. I thrive on the thrill of creating something meaningful and seeing it succeed or be appreciated. With no limits, my creativity flows freely, driving me to constantly think outside the box and push boundaries. 
    
This passion fuels how I approach challenges, collaborate with others, and grow both personally and professionally. I believe that the intersection of creativity and technology offers endless possibilities for innovation and meaningful impact.

Whether it's composing music, writing code, or solving complex problems, I approach each challenge with the same dedication to excellence and creative thinking that has guided me throughout my journey.`,
    keys: ["C"],
  },
  past: {
    title: "Past",
    content: `I've always been drawn to creativity and solving real-world problems. Around four years ago, I discovered web development and quickly realized it was the perfect combination of logic and design. I studied frontend development with a focus on React, which deepened my interest in building responsive and intuitive user interfaces.

During this time, I also explored various creative outlets including music production and digital art. These experiences taught me the importance of user experience and attention to detail - skills that translate directly into creating compelling web applications.

My early projects focused on learning the fundamentals while building practical applications that solved real problems for users in my community.`,
    keys: ["C#"],
  },
  education: {
    title: "Education",
    content: `I've always been drawn to creativity

`,
    keys: ["D"],
  },
  present: {
    title: "Present",
    content: `Currently, I'm focused on building sophisticated web applications using cutting-edge technologies like React, TypeScript, and modern CSS frameworks. I work on projects that challenge me to think creatively about user experience while maintaining clean, maintainable code.

I'm particularly passionate about creating applications that bridge the gap between technology and creativity - whether that's building tools for musicians, artists, or other creative professionals. My current work involves developing interactive web experiences that engage users in meaningful ways.

I continue to expand my skills in areas like performance optimization, accessibility, and progressive web applications. I'm also exploring the intersection of web development with emerging technologies like AI and machine learning.`,
    keys: ["D#"],
  },
  future: {
    title: "Future",
    content: `Looking ahead, I'm excited about the possibilities that lie at the intersection of web development, creativity, and emerging technologies. I plan to continue developing applications that push the boundaries of what's possible on the web while maintaining a focus on user experience and accessibility.

I'm particularly interested in exploring how AI and machine learning can enhance creative applications and make technology more intuitive and accessible to non-technical users. I also want to contribute more to open-source projects and share knowledge with the developer community.

My long-term goal is to build products that have a meaningful impact on how people create, collaborate, and express themselves online. I believe the future of web development lies in creating more immersive, interactive, and inclusive digital experiences.`,
    keys: ["E"],
  },
};

export default function CleanPiano() {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [hoveredKeys, setHoveredKeys] = useState<Set<string>>(new Set());
  const [isInView, setIsInView] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<{
    section: typeof DEVELOPER_JOURNEY[keyof typeof DEVELOPER_JOURNEY];
    noteKey: string;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Initialize Web Audio API
    const context = new (window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext)();
    setAudioContext(context);

    return () => {
      context.close();
    };
  }, []);

  const playNote = useCallback(
    (frequency: number) => {
      if (!audioContext || !isInView) return;

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = "triangle";

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 1
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    },
    [audioContext, isInView]
  );

  const handleKeyPress = useCallback(
    (key: PianoKey) => {
      setActiveKeys((prev) => new Set(prev).add(key.note));
      playNote(key.frequency);

      setTimeout(() => {
        setActiveKeys((prev) => {
          const newSet = new Set(prev);
          newSet.delete(key.note);
          return newSet;
        });
      }, 150);
    },
    [playNote]
  );

  const handleReadMore = useCallback((key: PianoKey) => {
    const sectionData = getTextForKey(key.note);
    if (sectionData) {
      setSelectedSection({
        section: sectionData,
        noteKey: key.note,
      });
      setModalOpen(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isInView || modalOpen) return;

      const key = PIANO_KEYS.find(
        (k) => k.keyBinding === event.key.toLowerCase()
      );
      if (key) {
        handleKeyPress(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress, isInView, modalOpen]);

  const getTextForKey = (note: string) => {
    for (const [sectionKey, section] of Object.entries(DEVELOPER_JOURNEY)) {
      if (section.keys.includes(note)) {
        return section;
      }
    }
    return null;
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSection(null);
  };

  const whiteKeys = PIANO_KEYS.filter((key) => !key.isBlack);
  const blackKeys = PIANO_KEYS.filter((key) => key.isBlack);

  return (
    <>
      <div
        ref={containerRef}
        id="my-journey"
        className="min-h-screen bg-transparent flex items-center justify-center p-4 md:p-8"
      >
        <div className="w-full max-w-6xl mt-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text text-center mb-12 md:mb-20 py-2">
            My Journey
          </h2>
          {/* Tap to Play Instruction */}
          <div className="text-center mb-8 md:mb-12 relative">
            <div className="inline-flex items-center gap-3 text-lg md:text-xl text-muted-foreground">
              <span>Tap to play on the piano</span>
              <div className="animate-bounce">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                  <path d="M12 5v14m0 0l-7-7m7 7l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="relative">
            {/* White Keys Container */}
            <div className="space-y-5 md:space-y-7">
              {whiteKeys.map((key, index) => {
                const textData = getTextForKey(key.note);
                const isActive = activeKeys.has(key.note);
                const isHovered = hoveredKeys.has(key.note);

                return (
                  <div
                    key={key.note}
                    className={`
                      relative w-full piano-key-white cursor-pointer transition-all duration-75 ease-out
                      h-36 md:h-44 lg:h-52 rounded-lg shadow-lg hover:shadow-xl
                      ${isActive ? "transform scale-95" : ""}
                      ${isHovered ? "shadow-xl" : ""}
                    `}
                    onClick={() => handleKeyPress(key)}
                    onMouseEnter={() =>
                      setHoveredKeys((prev) => new Set(prev).add(key.note))
                    }
                    onMouseLeave={() =>
                      setHoveredKeys((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(key.note);
                        return newSet;
                      })
                    }
                  >
                    <div className="h-full p-4 md:p-5 lg:p-7 flex items-center">
                      {/* Left side - Key info */}
                      <div className="flex-shrink-0 w-12 md:w-14 lg:w-20 text-center mr-4 md:mr-5 lg:mr-7">
                        <div className="text-xl md:text-2xl lg:text-3xl font-bold mb-1  text-black">
                          {key.note}
                        </div>
                        <div className="text-sm md:text-base uppercase text-muted-foreground font-mono">
                          {key.keyBinding}
                        </div>
                      </div>

                      {/* Right side - Content Preview */}
                      {textData && (
                        <div className="flex-1">
                          <h3 className="text-base md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 text-black">
                            {textData.title}
                          </h3>
                          <p className="text-sm md:text-base leading-relaxed text-gray-700 line-clamp-3 md:line-clamp-none">
                            {textData.content.slice(0, 120)}...
                          </p>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReadMore(key);
                            }}
                            className="mt-2 text-xs text-primary font-medium hover:text-primary/80 transition-colors"
                          >
                            Click to read more →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Black Keys Container */}
            <div className="absolute top-0 right-0 pointer-events-none hidden md:block">
              {blackKeys.map((key, index) => {
                const textData = getTextForKey(key.note);
                const isActive = activeKeys.has(key.note);
                const isHovered = hoveredKeys.has(key.note);

                const positions: { [key: string]: string } = {
                  "C#": "calc(9.5rem + 1rem)",
                  "D#": "calc(20rem + 2rem)",
                };

                const topPosition = positions[key.note];

                return (
                  <div
                    key={key.note}
                    className={`
                      absolute piano-key-black cursor-pointer transition-all duration-75 ease-out
                      rounded-l-lg shadow-xl pointer-events-auto z-10 hover:shadow-2xl
                      w-[min(660px,70vw)] h-28 md:h-32 lg:h-40
                      ${isActive ? "transform scale-95" : ""}
                    `}
                    style={{
                      top: topPosition,
                      right: "0rem",
                    }}
                    onClick={() => handleKeyPress(key)}
                    onMouseEnter={() =>
                      setHoveredKeys((prev) => new Set(prev).add(key.note))
                    }
                    onMouseLeave={() =>
                      setHoveredKeys((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(key.note);
                        return newSet;
                      })
                    }
                  >
                    <div className="h-full p-3 md:p-4 lg:p-5 flex items-center">
                      {/* Left side - Key info */}
                      <div className="flex-shrink-0 w-10 md:w-12 lg:w-14 text-center mr-3 md:mr-4 lg:mr-5">
                        <div className="text-base md:text-lg lg:text-xl font-bold mb-1 text-gray-300">
                          {key.note}
                        </div>
                        <div className="text-sm uppercase text-gray-400 font-mono">
                          {key.keyBinding}
                        </div>
                      </div>

                      {/* Right side - Content Preview */}
                      {textData && (
                        <div className="flex-1">
                          <h3 className="text-base md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 text-white">
                            {textData.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-gray-300 line-clamp-2 md:line-clamp-3">
                            {textData.content.slice(0, 100)}...
                          </p>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReadMore(key);
                            }}
                            className="mt-2 text-xs text-primary font-medium hover:text-primary/80 transition-colors"
                          >
                            Click to read more →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Black Keys */}
            <div className="block md:hidden mt-5 space-y-5">
              {blackKeys.map((key, index) => {
                const textData = getTextForKey(key.note);
                const isActive = activeKeys.has(key.note);
                const isHovered = hoveredKeys.has(key.note);

                return (
                  <div
                    key={key.note}
                    className={`
                      w-full piano-key-black cursor-pointer transition-all duration-75 ease-out
                      h-36 rounded-lg shadow-lg hover:shadow-xl
                      ${isActive ? "transform scale-95" : ""}
                    `}
                    onClick={() => handleKeyPress(key)}
                    onMouseEnter={() =>
                      setHoveredKeys((prev) => new Set(prev).add(key.note))
                    }
                    onMouseLeave={() =>
                      setHoveredKeys((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(key.note);
                        return newSet;
                      })
                    }
                  >
                    <div className="h-full p-4 flex items-center">
                      {/* Left side - Key info */}
                      <div className="flex-shrink-0 w-12 text-center mr-4">
                        <div className="text-xl font-bold mb-1 text-gray-300">
                          {key.note}
                        </div>
                        <div className="text-sm uppercase text-gray-400 font-mono">
                          {key.keyBinding}
                        </div>
                      </div>

                      {/* Right side - Content Preview */}
                      {textData && (
                        <div className="flex-1">
                          <h3 className="text-base font-bold mb-2 text-gray-100">
                            {textData.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-gray-300 line-clamp-3">
                            {textData.content.slice(0, 100)}...
                          </p>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReadMore(key);
                            }}
                            className="mt-1 text-xs text-gray-400 font-medium hover:text-gray-300 transition-colors"
                          >
                            Click to read more →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Journey Modal */}
      <JourneyModal
        isOpen={modalOpen}
        onClose={closeModal}
        section={selectedSection?.section || null}
        noteKey={selectedSection?.noteKey || ""}
      />
    </>
  );
}