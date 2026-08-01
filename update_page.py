import re

with open("frontend/src/app/page.tsx", "r") as f:
    content = f.read()

# Replace Agusan-Surigao
content = content.replace("Agusan-Surigao Lumad Network", "Agta People Network")
content = content.replace("Agusan-Surigao Upland Zone", "Agta Ancestral Domain")
content = content.replace("Sona sa Kabukiran sa Agusan-Surigao", "Agta Ancestral Domain")

# Inject import
content = content.replace('import SupplyLiveMap from "@/components/supply-map";', 'import SupplyLiveMap from "@/components/supply-map";\nimport dbData from "@/data/db.json";')

# Remove useEffect for backend fetch
use_effect_pattern = r'  useEffect\(\(\) => \{\n    \/\/ Fetch mock messages from Mistral API backend.*?  \}\, \[language\]\);\n'
content = re.sub(use_effect_pattern, '', content, flags=re.DOTALL)

# Remove `const [communityMessages, setCommunityMessages] = useState<any[]>([]);`
content = content.replace('const [communityMessages, setCommunityMessages] = useState<any[]>([]);', '')

# In `DisasterApp` function, before `const handlePlayAudio = ...`, add:
# `const { elderReports, communityReports } = dbData;`
content = content.replace('const handlePlayAudio = (id: string, audioUrl?: string) => {', 'const { elderReports, communityReports } = dbData;\n\n  const handlePlayAudio = (id: string, audioUrl?: string) => {')


# Now, rebuild TAB 1 content entirely, removing the old hardcoded Pinned Post and Recent Community posts.

# We need a generic Voice Report Card renderer string for formatting
voice_report_jsx = """                    <div key={item.id} className={`p-3.5 rounded-xl border ${item.pinned ? 'bg-[#fffbeb] dark:bg-[#422006]/30 border-2 border-[#fbbf24] dark:border-[#b45309]' : 'border-[#e5e7eb] dark:border-[#374151] bg-[#f9fafb] dark:bg-[#111827]'} space-y-3 relative overflow-hidden`}>
                      {item.pinned && (
                        <div className="absolute top-0 right-0 bg-[#fbbf24] text-amber-950 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1">
                          <Pin className="h-3 w-3" /> PINNED
                        </div>
                      )}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <Avatar className={`h-9 w-9 border ${item.pinned ? 'border-[#fbbf24]' : 'border-[#0038a8]'}`}>
                            <AvatarFallback className={`text-xs font-bold ${item.pinned ? 'bg-[#f59e0b] text-white' : 'bg-[#0038a8] text-white'}`}>{item.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold leading-none">{item.author}</span>
                              <Badge className="bg-[#eff6ff] text-[#0038a8] dark:bg-[#1e3a8a] dark:text-[#93c5fd] border-none text-[9px] font-bold px-1.5 py-0 h-4">
                                {item.tag}
                              </Badge>
                            </div>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-1 leading-none">{item.role} • {item.location} • {item.time}</span>
                          </div>
                        </div>
                        {item.verified && (
                          <span className="text-[10px] font-bold text-[#2563eb] dark:text-[#60a5fa] flex items-center gap-1 bg-[#eff6ff] dark:bg-[#1e3a8a]/50 px-2 py-1 rounded-md shrink-0">
                            <CheckCircle2 className="h-3 w-3 text-[#2563eb]" /> {t.verifiedVoice}
                          </span>
                        )}
                      </div>

                      {/* Text Post Above Audio */}
                      <p className={`text-sm font-medium leading-relaxed pl-11 ${item.pinned ? 'text-amber-950 dark:text-[#fef3c7]' : 'text-[#111827] dark:text-[#f9fafb]'}`}>
                        "{item.transcript}"
                      </p>

                      {/* Voice Player */}
                      <div className={`flex items-center gap-3 p-2.5 rounded-lg border ml-11 ${item.pinned ? 'bg-white/50 dark:bg-black/20 border-[#fbbf24]/50' : 'bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151]'}`}>
                        <Button
                          size="icon"
                          onClick={() => handlePlayAudio(item.id, item.audioUrl)}
                          className="h-8 w-8 rounded-full bg-[#ce2029] hover:bg-[#b91c1c] text-white shrink-0 shadow-2xs"
                        >
                          {playingAudioId === item.id ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
                        </Button>
                        <div className="flex-1">
                          <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mb-1.5 font-mono">
                            <span>{playingAudioId === item.id ? `${formatTime(audioProgress)} / ${formatTime(audioDuration)}` : "Original Dialect Recording"}</span>
                            <span>{playingAudioId === item.id ? `📍 ${item.location}` : "Ready"}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-[#ce2029] transition-all duration-300 ${playingAudioId === item.id ? "" : "w-0"}`} 
                              style={{ width: playingAudioId === item.id ? `${(audioProgress / (audioDuration || 1)) * 100}%` : '0%' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>"""

new_tab1_content = f"""          {{/* ==================== TAB 1: SOURCES ==================== */}}
          <TabsContent value="sources" className="outline-none">
            <motion.div initial={{{{ opacity: 0, y: 15 }}}} animate={{{{ opacity: 1, y: 0 }}}} transition={{{{ duration: 0.4 }}}} className="space-y-8 mt-4">
            
            {{/* --- ELDER REPORTS SECTION --- */}}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="h-5 w-5 text-[#b45309]" />
                <h2 className="text-lg font-bold text-[#111827] dark:text-[#f9fafb]">Elder Reports</h2>
              </div>
              <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-2xs">
                <CardHeader className="pb-3 border-b border-[#e5e7eb] dark:border-[#374151] bg-[#f9fafb] dark:bg-[#111827]/50">
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {{t.communityVoiceDesc}}
                  </p>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {{elderReports.map((item) => (
{voice_report_jsx}
                  ))}}
                  {{elderReports.length === 0 && (
                    <div className="text-center p-4 text-sm text-gray-500">No elder reports yet.</div>
                  )}}
                </CardContent>
              </Card>
            </div>

            {{/* --- COMMUNITY REPORTS SECTION --- */}}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-[#ce2029]" />
                <h2 className="text-lg font-bold text-[#111827] dark:text-[#f9fafb]">Community Reports</h2>
              </div>
              <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-2xs">
                <CardContent className="p-4 space-y-4">
                  {{communityReports.map((item) => (
{voice_report_jsx}
                  ))}}
                  {{communityReports.length === 0 && (
                    <div className="text-center p-4 text-sm text-gray-500">No community reports yet.</div>
                  )}}
                </CardContent>
              </Card>
            </div>

            </motion.div>
          </TabsContent>"""

# Replace the whole TAB 1 block
old_tab_pattern = r'          \{\/\* ==================== TAB 1: SOURCES ==================== \*\/\}.*?<\/motion\.div>\n          <\/TabsContent>'
content = re.sub(old_tab_pattern, new_tab1_content, content, flags=re.DOTALL)

with open("frontend/src/app/page.tsx", "w") as f:
    f.write(content)
print("Updated page.tsx")
