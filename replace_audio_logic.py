import re

with open("frontend/src/app/page.tsx", "r") as f:
    content = f.read()

start_marker = "  // Audio Playback via Web Speech API (speaks the translated transcript)"
end_marker = "  const t = translations[language] || translations.english;"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Failed to find bounds")
    exit(1)

new_audio_block = """  // Audio Playback via ElevenLabs API
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [loadingAudioId, setLoadingAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  
  const audioCacheRef = useRef<Record<string, string>>({});
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || !timeInSeconds) return "0:00";
    const m = Math.floor(timeInSeconds / 60);
    const s = Math.floor(timeInSeconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const { elderReports, communityReports } = dbData;

  const stopCurrentAudio = () => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
      activeAudioRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setPlayingAudioId(null);
    setAudioProgress(0);
    setAudioDuration(0);
  };

  const handlePlayAudio = async (id: string, transcript: string) => {
    // If the same audio is playing, stop it.
    if (playingAudioId === id || loadingAudioId === id) {
      stopCurrentAudio();
      setLoadingAudioId(null);
      return;
    }

    // Stop any currently playing audio before starting a new one
    stopCurrentAudio();

    const cacheKey = `${id}-${language}`;
    let audioUrl = audioCacheRef.current[cacheKey];

    if (!audioUrl) {
      try {
        setLoadingAudioId(id);
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            text: transcript,
            voiceId: '21m00Tcm4TlvDq8ikWAM' // Rachel voice ID
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          console.error("ElevenLabs TTS failed:", errData);
          alert(`Could not generate audio: ${errData.error || res.statusText}`);
          setLoadingAudioId(null);
          return;
        }

        const blob = await res.blob();
        audioUrl = URL.createObjectURL(blob);
        audioCacheRef.current[cacheKey] = audioUrl;
      } catch (err) {
        console.error("Error fetching TTS:", err);
        setLoadingAudioId(null);
        return;
      } finally {
        setLoadingAudioId(null);
      }
    }

    // Play the audio
    const audio = new Audio(audioUrl);
    activeAudioRef.current = audio;
    
    // For blob URLs, duration might not be immediately available or accurate, but we try
    audio.onloadedmetadata = () => {
      // If duration is Infinity or NaN (common for streams), we can't show a progress bar easily, but blob URLs usually give a duration.
      if (isFinite(audio.duration)) {
        setAudioDuration(audio.duration);
      }
    };

    audio.onplay = () => {
      setPlayingAudioId(id);
      if (isFinite(audio.duration)) setAudioDuration(audio.duration);
      
      progressIntervalRef.current = setInterval(() => {
        setAudioProgress(audio.currentTime);
        if (isFinite(audio.duration) && audio.duration !== audioDuration) {
           setAudioDuration(audio.duration);
        }
      }, 250);
    };

    audio.onended = () => {
      stopCurrentAudio();
    };

    audio.onerror = (e) => {
      console.error("Audio playback error:", e);
      stopCurrentAudio();
    };

    audio.play().catch(e => {
      console.error("Failed to play audio:", e);
      stopCurrentAudio();
    });
  };

"""

content = content[:start_idx] + new_audio_block + content[end_idx:]

with open("frontend/src/app/page.tsx", "w") as f:
    f.write(content)

print("Replaced logic successfully")
