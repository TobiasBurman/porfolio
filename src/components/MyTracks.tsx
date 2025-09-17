import React, { useState, useRef, useEffect } from "react";

interface Track {
  id: number;
  title: string;
  artist: string;
  albumArt: string;
  audioFile: string;
  spotifyUrl: string;
}

const MyTracks: React.FC = () => {
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks: Track[] = [
    {
      id: 1,
      title: "Born Again",
      artist: "Cageman ft Michael Shynes",
      albumArt: "/track3.jpg?w=400&h=400&fit=crop&crop=center",
      audioFile: "/track1.wav",
      spotifyUrl:
        "https://open.spotify.com/track/1iJQHn0kRRQOECVpth5SiE?si=b512f12ecc7a4961",
    },
    {
      id: 2,
      title: "Before I can Fall Asleep",
      artist: "Cageman ft. Micheal Shynes",
      albumArt: "/track1.jpg?w=400&h=400&fit=crop&crop=center",
      audioFile: "/track3.mp3",
      spotifyUrl:
        "https://open.spotify.com/track/7c9BJZVleEZDMlj0ByrZeV?si=8445855b27b74e9b",
    },
    {
      id: 3,
      title: "235 Are You Alive",
      artist: "Cageman ft. Micheal Shynes",
      albumArt: "/track2.jpg",
      audioFile: "/track2.wav",
      spotifyUrl:
        "https://open.spotify.com/track/11SYasFcDy3QTFBMmhciYC?si=8e91e6b7b8484e86",
    },
  ];

  // Uppdatera tid
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [playingTrack]);

  const togglePlay = (trackId: number) => {
    const track = tracks.find((t) => t.id === trackId);
    if (!track || !audioRef.current) return;

    if (playingTrack === trackId) {
      audioRef.current.pause();
      setPlayingTrack(null);
    } else {
      if (playingTrack !== null) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      audioRef.current.src = track.audioFile;
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setPlayingTrack(trackId);
    }
  };

  // När ljudet tar slut
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setPlayingTrack(null);
      setCurrentTime(0);
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const formatTime = (t: number) =>
    `${Math.floor(t / 60)}:${Math.floor(t % 60)
      .toString()
      .padStart(2, "0")}`;

  return (
    <div
      id="my-tracks"
      className="w-full min-h-screen to-muted/20 py-16 px-4 mt-20"
    >
      {/* Dolt audio-element */}
      <audio ref={audioRef} preload="metadata" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold gradient-text mb-6 tracking-tight mt-20">
            My Tracks
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-14">
            Discover my latest musical creations. These tracks are now available
             each one reflecting a part of my creative process and the ideas I
            wanted to explore.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mt-20">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className="group flex flex-col items-center space-y-6"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
              }}
            >
              {/* Vinyl */}
              <div className="relative">
                <div
                  className={`relative w-64 h-64 rounded-full bg-gradient-to-br from-gray-900 to-black shadow-2xl transition-all duration-500 cursor-pointer group-hover:scale-105 group-hover:shadow-3xl ${
                    playingTrack === track.id ? "animate-spin-slow" : ""
                  }`}
                  onClick={() => togglePlay(track.id)}
                >
                  <div className="absolute inset-0 rounded-full border border-gray-600/60"></div>
                  <div className="absolute inset-4 rounded-full border border-gray-700/50"></div>
                  <div className="absolute inset-8 rounded-full border border-gray-600/30"></div>
                  <div className="absolute inset-12 rounded-full border border-gray-500/20"></div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg overflow-hidden">
                    <img
                      src={track.albumArt}
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black shadow-inner"></div>
                  </div>

                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
                </div>

                <div
                  className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
                    playingTrack === track.id ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background:
                      "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)",
                    filter: "blur(20px)",
                    transform: "scale(1.2)",
                  }}
                />
              </div>

              {/* Info + kontroller */}
              <div className="text-center space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-1">
                    {track.title}
                  </h3>
                  <p className="text-muted-foreground">{track.artist}</p>
                </div>

                {/* Progress */}
                {playingTrack === track.id && duration > 0 && (
                  <div className="w-full max-w-xs mx-auto">
                    <div className="bg-gray-600 rounded-full h-1">
                      <div
                        className="bg-primary h-1 rounded-full transition-all duration-100"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                )}

                {/* Play/Pause + Spotify */}
                <div className="flex justify-center items-center gap-4">
                  {/* Play/Pause */}
                  <button
                    onClick={() => togglePlay(track.id)}
                    className="group/btn relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-text hover:bg-gradient-text transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    aria-label={playingTrack === track.id ? "Pause" : "Play"}
                  >
                    {playingTrack === track.id ? (
                      <svg
                        className="w-6 h-6 text-primary-foreground"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-primary-foreground ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                    <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover/btn:opacity-100 group-hover/btn:scale-110 transition-all duration-300" />
                  </button>

                  {/* Spotify-länk */}
                  <a
                    href={track.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#30ad34] grid place-items-center shadow-lg hover:brightness-110 active:scale-95 transition"
                    aria-label="Open in Spotify"
                    title="Open in Spotify"
                  >
                    <img src="/spotify.svg" alt="Spotify" className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        .shadow-3xl { box-shadow: 0 35px 60px -12px rgba(0,0,0,.5); }
      `}</style>
    </div>
  );
};

export default MyTracks;
