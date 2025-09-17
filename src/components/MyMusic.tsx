import React, { useState, useRef, useEffect } from "react";

interface VideoData {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
}

const MyMusic: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start from middle (index 1)
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Sample video data - replace with your actual video URLs
  const videos: VideoData[] = [
    {
      id: "video1",
      title: "Ethereal Dreams",
      videoUrl: "vid2.mp4",
      thumbnail: "/music2.png",
    },
    {
      id: "video2",
      title: "Midnight Symphony",
      videoUrl: "vid3.mp4",
      thumbnail: "/music1.png",
    },
    {
      id: "video3",
      title: "Ocean Waves",
      videoUrl: "vid1.mp4",
      thumbnail: "/music3.png",
    },
  ];

  const handleVideoClick = (videoId: string) => {
    const video = videoRefs.current[videoId];
    if (video) {
      if (isPlaying === videoId) {
        video.pause();
        setIsPlaying(null);
      } else {
        // Pause all other videos
        Object.values(videoRefs.current).forEach((v) => v?.pause());
        video.play();
        setIsPlaying(videoId);
      }
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
    setIsPlaying(null);
    Object.values(videoRefs.current).forEach((v) => v?.pause());
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(null);
    Object.values(videoRefs.current).forEach((v) => v?.pause());
  };

  const getVideoStyle = (index: number) => {
    const position = index - currentIndex;

    if (position === 0) {
      // Center video
      return {
        transform: "translateX(0) scale(1)",
        zIndex: 3,
        filter: "blur(0px) brightness(1)",
        opacity: 1,
      };
    } else if (
      position === -1 ||
      (position === videos.length - 1 && currentIndex === 0)
    ) {
      // Left video
      return {
        transform: "translateX(-120%) scale(0.8)",
        zIndex: 1,
        filter: "blur(2px) brightness(0.6)",
        opacity: 0.7,
      };
    } else if (
      position === 1 ||
      (position === -(videos.length - 1) && currentIndex === videos.length - 1)
    ) {
      // Right video
      return {
        transform: "translateX(120%) scale(0.8)",
        zIndex: 1,
        filter: "blur(2px) brightness(0.6)",
        opacity: 0.7,
      };
    } else {
      // Hidden videos
      return {
        transform: "translateX(0) scale(0.6)",
        zIndex: 0,
        filter: "blur(4px) brightness(0.3)",
        opacity: 0,
      };
    }
  };

  return (
    <div
      id="featured-music"
      className="min-h-screen p-8 flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-10 py-2 mt-10">
            My Music For Commercials
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Here you’ll find a selection of my compositions, music that I’ve
            also had the opportunity to create for companies to enhance their
            commercials.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full h-[550px] flex items-center justify-center mt-20">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 z-20 w-12 h-12 bg-white bg-opacity-80 backdrop-blur-sm rounded-full shadow-xl hover:bg-opacity-100 hover:shadow-2xl transition-all duration-300 flex items-center justify-center group ml-14"
            style={{ transform: "translateY(-50%)", top: "50%" }}
          >
            <svg
              className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Video Cards */}
          <div className="relative w-full h-full flex items-center justify-center">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="absolute w-[400px] h-[600px] transition-all duration-700 ease-in-out cursor-pointer"
                style={getVideoStyle(index)}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  {/* Video Element */}
                  <video
                    ref={(el) => (videoRefs.current[video.id] = el)}
                    className="w-full h-full object-cover"
                    poster={video.thumbnail}
                    onClick={() => handleVideoClick(video.id)}
                    controls={isPlaying === video.id}
                    preload="metadata"
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Play Overlay */}
                  {isPlaying !== video.id && (
                    <div
                      className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 hover:bg-opacity-30"
                      onClick={() => handleVideoClick(video.id)}
                    >
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-xl hover:bg-opacity-100 hover:scale-110 transition-all duration-300">
                        <svg
                          className="w-8 h-8 text-blue-600 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Video Title */}
                  {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg">
                      {video.title}
                    </h3>
                  </div> */}

                  {/* Glow effect for center video */}
                  {/* {index === currentIndex && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-20 -z-10"></div>
                  )} */}
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-4 z-20 w-12 h-12 bg-white bg-opacity-80 backdrop-blur-sm rounded-full shadow-xl hover:bg-opacity-100 hover:shadow-2xl transition-all duration-300 flex items-center justify-center group mr-14"
            style={{ transform: "translateY(-50%)", top: "50%" }}
          >
            <svg
              className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MyMusic;
