import re

with open("frontend/src/app/page.tsx", "r") as f:
    content = f.read()

# 1. Add MapPin and Trash2 to imports
lucide_import_pattern = r'import \{.*?\} from "lucide-react";'
new_lucide_imports = 'import { AlertTriangle, CheckCircle2, Play, Pause, Activity, Map, Settings, Volume2, ShieldAlert, FileText, UserCheck, Mic, HelpCircle, Sun, Star, Send, Pin, Menu, MapPin, Trash2 } from "lucide-react";'
content = re.sub(lucide_import_pattern, new_lucide_imports, content)


# 2. Add recording states and functions to DisasterApp component
state_insertion = """  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Advanced Voice Recording State
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedAudioUrl(url);
        stream.getTracks().forEach(track => track.stop()); // cleanup microphone
      };
      
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied", err);
      alert("Microphone access is required to record a voice report.");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleClearRecording = () => {
    setRecordedAudioUrl(null);
    audioChunksRef.current = [];
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setReportLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        },
        () => alert("Could not retrieve location. Please type it manually.")
      );
    }
  };"""

content = content.replace("  const [submitSuccess, setSubmitSuccess] = useState(false);", state_insertion)

# 3. Update handleSubmitReport to also clear recorded audio
submit_logic = """  const handleSubmitReport = (e: any) => {
    e.preventDefault();
    if (!reportText && !isRecording && !recordedAudioUrl) return;
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
    setReportName("");
    setReportLocation("");
    setReportText("");
    setIsRecording(false);
    handleClearRecording();
  };"""
content = re.sub(r'  const handleSubmitReport.*?setIsRecording\(false\);\n  \};', submit_logic, content, flags=re.DOTALL)

# 4. Update the Report Form JSX
old_form_jsx = """                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Location *</label>
                          <input 
                            type="text" 
                            placeholder="Brgy, Purok..."
                            required
                            value={reportLocation}
                            onChange={(e) => setReportLocation(e.target.value)}
                            className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#0038a8]"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Details</label>
                        <textarea 
                          rows={3}
                          placeholder="What is happening? Do you need help?"
                          value={reportText}
                          onChange={(e) => setReportText(e.target.value)}
                          className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#0038a8] resize-none"
                        />
                      </div>

                      <div className="flex gap-2 pt-1">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsRecording(!isRecording)}
                          className={`flex-1 font-bold transition-all ${isRecording ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 dark:bg-red-900/30 dark:border-red-800" : ""}`}
                        >
                          <Mic className={`h-4 w-4 mr-2 ${isRecording ? "animate-pulse" : ""}`} /> 
                          {isRecording ? "Recording..." : "Voice Record"}
                        </Button>
                        <Button 
                          type="submit" 
                          className="flex-1 bg-[#0038a8] hover:bg-[#1d4ed8] text-white font-bold"
                          disabled={!reportText.trim() && !isRecording}
                        >
                          <Send className="h-4 w-4 mr-2" /> Submit
                        </Button>
                      </div>"""


new_form_jsx = """                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase flex justify-between">
                            Location *
                            <button type="button" onClick={handleGetLocation} className="text-[#0038a8] hover:underline flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> Auto
                            </button>
                          </label>
                          <div className="flex gap-1">
                            <input 
                              type="text" 
                              placeholder="Brgy, Purok..."
                              required
                              value={reportLocation}
                              onChange={(e) => setReportLocation(e.target.value)}
                              className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#0038a8]"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Details</label>
                        <textarea 
                          rows={3}
                          placeholder="What is happening? Do you need help?"
                          value={reportText}
                          onChange={(e) => setReportText(e.target.value)}
                          className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#0038a8] resize-none"
                        />
                      </div>

                      {recordedAudioUrl && (
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex items-center justify-between">
                          <audio src={recordedAudioUrl} controls className="h-8 w-[80%]" />
                          <Button size="icon" variant="ghost" onClick={handleClearRecording} className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}

                      <div className="flex gap-2 pt-1">
                        {!recordedAudioUrl && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={isRecording ? handleStopRecording : handleStartRecording}
                            className={`flex-1 font-bold transition-all ${isRecording ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 dark:bg-red-900/30 dark:border-red-800" : ""}`}
                          >
                            <Mic className={`h-4 w-4 mr-2 ${isRecording ? "animate-pulse" : ""}`} /> 
                            {isRecording ? "Stop Recording..." : "Voice Record"}
                          </Button>
                        )}
                        <Button 
                          type="submit" 
                          className="flex-1 bg-[#0038a8] hover:bg-[#1d4ed8] text-white font-bold"
                          disabled={!reportText.trim() && !recordedAudioUrl}
                        >
                          <Send className="h-4 w-4 mr-2" /> Submit
                        </Button>
                      </div>"""

content = content.replace(old_form_jsx, new_form_jsx)

with open("frontend/src/app/page.tsx", "w") as f:
    f.write(content)

