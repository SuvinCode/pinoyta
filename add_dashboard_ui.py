import re

with open("frontend/src/app/page.tsx", "r") as f:
    content = f.read()

# 1. Add state variables
state_vars = """  const [isAlertConfirmed, setIsAlertConfirmed] = useState(true);

  // Report Form States
  const [reportName, setReportName] = useState("");
  const [reportLocation, setReportLocation] = useState("");
  const [reportText, setReportText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitReport = (e: any) => {
    e.preventDefault();
    if (!reportText && !isRecording) return;
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
    setReportName("");
    setReportLocation("");
    setReportText("");
    setIsRecording(false);
  };"""

content = content.replace("  const [isAlertConfirmed, setIsAlertConfirmed] = useState(true);", state_vars)

# 2. Add lucide icons imports for Send and Mic
lucide_import_pattern = r'import \{.*?\} from "lucide-react";'
new_lucide_imports = 'import { AlertTriangle, CheckCircle2, Play, Pause, Activity, Map, Settings, Volume2, ShieldAlert, FileText, UserCheck, Mic, HelpCircle, Sun, Star, Send, Pin } from "lucide-react";'
content = re.sub(lucide_import_pattern, new_lucide_imports, content)

# 3. Add the UI components at the end of TabsContent value="dashboard"
new_ui = """
            {/* --- NEW COMMUNITY REPORTING SECTION --- */}
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-[#ce2029]" />
                <h2 className="text-lg font-bold text-[#111827] dark:text-[#f9fafb]">Community Reports</h2>
              </div>

              {/* Pinned Official Post */}
              <div className="bg-[#fffbeb] dark:bg-[#422006]/30 border-2 border-[#fbbf24] dark:border-[#b45309] p-4 rounded-xl shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#fbbf24] text-amber-950 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1">
                  <Pin className="h-3 w-3" /> PINNED
                </div>
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10 border-2 border-[#fbbf24]">
                    <AvatarFallback className="bg-[#f59e0b] text-white">DM</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-[#b45309] dark:text-[#fde68a] text-sm flex items-center gap-1.5">
                      Datu Makusog <Badge className="bg-[#fbbf24] hover:bg-[#fbbf24] text-amber-950 text-[9px] px-1 py-0 h-4 border-none">Tribal Chieftain</Badge>
                    </h4>
                    <span className="text-[10px] text-[#92400e] dark:text-[#fcd34d]/70 block mb-1.5">San Roque Central • 5 mins ago</span>
                    <p className="text-sm font-medium text-amber-950 dark:text-[#fef3c7] leading-relaxed">
                      "The river has overflowed at the old bridge. Do not attempt to cross. Move immediately to the upland evacuation center!"
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Community Posts */}
              <div className="space-y-3">
                <div className="bg-white dark:bg-[#1f2937] border border-[#e5e7eb] dark:border-[#374151] p-4 rounded-xl shadow-sm flex gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300">A</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-[#111827] dark:text-[#f9fafb] text-sm">Anonymous</h4>
                    <span className="text-[10px] text-gray-500 block mb-1">Purok 4 • 12 mins ago</span>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      "We need drinking water here, the pipes are broken near the chapel."
                    </p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-[#1f2937] border border-[#e5e7eb] dark:border-[#374151] p-4 rounded-xl shadow-sm flex gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-[#eff6ff] text-[#0038a8]">JC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-[#111827] dark:text-[#f9fafb] text-sm">Juan Dela Cruz</h4>
                    <span className="text-[10px] text-gray-500 block mb-1">San Roque • 28 mins ago</span>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      "Trees fell down near the basketball court, road is blocked. Please send clearing operations if possible."
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Report Form */}
              <Card className="mt-6 bg-[#f8fafc] dark:bg-[#111827] border-[#e2e8f0] dark:border-[#1e293b] shadow-inner">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-[#111827] dark:text-[#f9fafb]">Send a Report</CardTitle>
                  <CardDescription className="text-xs">Alert the community about hazards or needs in your area.</CardDescription>
                </CardHeader>
                <CardContent>
                  {submitSuccess ? (
                    <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-lg flex items-center justify-center gap-2 font-bold animate-in fade-in zoom-in duration-300">
                      <CheckCircle2 className="h-5 w-5" /> Report submitted safely!
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitReport} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Name (Optional)</label>
                          <input 
                            type="text" 
                            placeholder="Anonymous"
                            value={reportName}
                            onChange={(e) => setReportName(e.target.value)}
                            className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#0038a8]"
                          />
                        </div>
                        <div className="space-y-1">
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
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>"""

# Replace `</TabsContent>` of the dashboard tab with the new UI + `</TabsContent>`
content = content.replace("          </TabsContent>\n\n          {/* ==================== TAB 2", new_ui + "\n\n          {/* ==================== TAB 2")

with open("frontend/src/app/page.tsx", "w") as f:
    f.write(content)

