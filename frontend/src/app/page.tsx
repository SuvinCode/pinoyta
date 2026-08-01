"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AlertTriangle, CheckCircle2, Play, Pause, Activity, Map, Settings, Volume2, ShieldAlert, FileText, UserCheck, Mic, HelpCircle, Sun, Star } from "lucide-react";
import SupplyLiveMap from "@/components/supply-map";

export default function DisasterApp() {
  const { setTheme, theme } = useTheme();
  const [language, setLanguage] = useState("mamanwa");
  const [selectedBarangay, setSelectedBarangay] = useState("san-roque");
  const [isAlertConfirmed, setIsAlertConfirmed] = useState(true);

  // Audio Playback states for simulation
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const handlePlayAudio = (id: string) => {
    setPlayingAudioId(playingAudioId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] dark:bg-[#111827] text-[#1f2937] dark:text-[#f9fafb] flex flex-col transition-colors duration-300">
      
      {/* Sticky Header with Logo & Brand Colors */}
      <header className="sticky top-0 z-50 w-full border-b border-[#e5e7eb] dark:border-[#1f2937] bg-[#ffffff]/95 dark:bg-[#111827]/95 backdrop-blur shadow-xs">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-2">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#ce2029] via-[#0038a8] to-[#fcd116] p-0.5 shadow-sm flex items-center justify-center">
              <img 
                src="/favicon.ico" 
                alt="pinoyta logo" 
                className="h-8 w-8 rounded-full object-cover bg-white"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-xl tracking-tight text-[#0038a8] dark:text-[#60a5fa]">pinoy</span>
                <span className="font-extrabold text-xl tracking-tight text-[#ce2029] dark:text-[#f87171]">ta</span>
                <Star className="h-3.5 w-3.5 fill-[#fcd116] text-[#fcd116] ml-0.5" />
              </div>
              <span className="text-[10px] text-muted-foreground font-semibold tracking-wide">Agusan-Surigao Lumad Network</span>
            </div>
          </div>

          {/* Sticky Language Selector & Settings */}
          <div className="flex items-center gap-2">
            <Select value={language} onValueChange={(val) => val && setLanguage(val)}>
              <SelectTrigger className="w-[145px] h-9 text-xs border-[#d1d5db] dark:border-[#374151] bg-white dark:bg-[#1f2937] font-semibold shadow-2xs text-[#111827] dark:text-[#f9fafb]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151]">
                <SelectItem value="mamanwa">Minamanwa (Native)</SelectItem>
                <SelectItem value="bisaya">Bisaya</SelectItem>
                <SelectItem value="tagalog">Tagalog</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger className="h-9 w-9 rounded-full hover:bg-gray-100 dark:hover:bg-[#1f2937] text-gray-700 dark:text-gray-200 inline-flex items-center justify-center transition-colors">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </SheetTrigger>
              <SheetContent className="bg-white dark:bg-[#111827] border-[#e5e7eb] dark:border-[#1f2937]">
                <SheetHeader>
                  <SheetTitle className="text-[#0038a8] dark:text-[#60a5fa] font-bold">Preferences & Governance</SheetTitle>
                  <SheetDescription>Indigenous Community & App Settings</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Dark Theme</span>
                    <Switch 
                      checked={theme === "dark"} 
                      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">Simulated Governance State</span>
                    <div className="flex items-center justify-between bg-blue-50/50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200/50 dark:border-blue-900/50">
                      <span className="text-xs font-medium">Alert Tribal Confirmation</span>
                      <Switch 
                        checked={isAlertConfirmed} 
                        onCheckedChange={setIsAlertConfirmed}
                      />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Plain-Language Status Line with Light Yellow Accent */}
        <div className="bg-[#fefce8] dark:bg-[#422006]/50 border-b border-[#fef08a] dark:border-[#713f12] px-4 py-2">
          <p className="text-xs sm:text-sm text-[#854d0e] dark:text-[#fef08a] font-bold text-center leading-snug flex items-center justify-center gap-1.5">
            <Sun className="h-4 w-4 text-[#eab308] fill-[#eab308] shrink-0" />
            Typhoon approaching. Secure homes and prepare to move to high ground.
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto p-4 max-w-3xl">
        <Tabs defaultValue="dashboard" className="w-full">
          
          {/* 3 Main Header Tabs with Lighter Logo Colors */}
          <TabsList className="grid w-full grid-cols-3 h-14 mb-6 sticky top-[104px] z-40 bg-white/95 dark:bg-[#111827]/95 backdrop-blur shadow-xs border border-[#e5e7eb] dark:border-[#1f2937] rounded-xl p-1">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center justify-center gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-xs sm:text-sm rounded-lg transition-all"
            >
              <Activity className="h-4 w-4 text-[#ce2029]" />
              <span>1. Main Dashboard</span>
            </TabsTrigger>

            <TabsTrigger 
              value="sources" 
              className="flex items-center justify-center gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-xs sm:text-sm rounded-lg transition-all"
            >
              <Volume2 className="h-4 w-4 text-[#0038a8]" />
              <span>2. Sources</span>
            </TabsTrigger>

            <TabsTrigger 
              value="supply" 
              className="flex items-center justify-center gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-xs sm:text-sm rounded-lg transition-all"
            >
              <Map className="h-4 w-4 text-[#eab308]" />
              <span>3. Recovery Map</span>
            </TabsTrigger>
          </TabsList>

          {/* ==================== TAB 1: MAIN DASHBOARD ==================== */}
          <TabsContent value="dashboard" className="space-y-4 outline-none">
            
            {/* Location Selector */}
            <div className="flex items-center justify-between p-3.5 bg-white dark:bg-[#1f2937] border border-[#e5e7eb] dark:border-[#374151] rounded-xl shadow-2xs">
              <div className="flex items-center gap-2">
                <Map className="h-4 w-4 text-[#0038a8] dark:text-[#60a5fa]" />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Barangay Focus:</span>
              </div>
              <Select value={selectedBarangay} onValueChange={(val) => val && setSelectedBarangay(val)}>
                <SelectTrigger className="w-[210px] h-8 text-xs font-bold border-[#d1d5db] dark:border-[#4b5563] bg-white dark:bg-[#111827]">
                  <SelectValue placeholder="Barangay" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151]">
                  <SelectItem value="san-roque">Brgy. San Roque (Mamanwa)</SelectItem>
                  <SelectItem value="kitcharao">Brgy. Kitcharao</SelectItem>
                  <SelectItem value="alegria">Brgy. Alegria</SelectItem>
                  <SelectItem value="tubay">Brgy. Tubay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Verification Row Up Top - Royal Blue & Sun Yellow accents */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              {isAlertConfirmed ? (
                <div className="flex items-center gap-3.5 p-4 bg-[#eff6ff] dark:bg-[#1e3a8a]/30 border-2 border-[#2563eb]/40 rounded-xl shadow-2xs">
                  <Avatar className="h-11 w-11 border-2 border-[#2563eb]">
                    <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=datu" />
                    <AvatarFallback className="bg-[#0038a8] text-white">DM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#0038a8] dark:text-[#60a5fa] flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-[#2563eb]" /> CONFIRMED BY TRIBAL COUNCIL
                      </p>
                      <Badge className="bg-[#2563eb] text-white text-[10px] font-bold border-none">
                        Active Trust
                      </Badge>
                    </div>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mt-0.5">
                      Verified by <span className="font-bold text-[#111827] dark:text-white">Datu Makusog</span> for {selectedBarangay === "san-roque" ? "Brgy. San Roque" : "Selected Area"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3.5 p-4 bg-[#fff1f2] dark:bg-[#881337]/30 border-2 border-[#f43f5e]/40 rounded-xl shadow-2xs">
                  <div className="h-11 w-11 rounded-full bg-[#ffe4e6] dark:bg-[#9f1239]/50 flex items-center justify-center text-[#e11d48] dark:text-[#fda4af] shrink-0">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#be123c] dark:text-[#fda4af] flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-[#e11d48]" /> NOT YET CONFIRMED
                    </p>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mt-0.5">
                      No local leader has confirmed the current alert for this area yet.
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => setIsAlertConfirmed(true)} 
                    className="text-xs h-8 bg-[#2563eb] hover:bg-[#1d4ed8] text-white shrink-0 font-bold"
                  >
                    Confirm Alert
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Signal Level Card in Lighter Philippine Red/Blue Theme */}
            <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-2xs">
              <CardHeader className="border-b border-[#e5e7eb] dark:border-[#374151] pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-[#ce2029] dark:text-[#f87171] flex items-center gap-2 font-extrabold">
                      <AlertTriangle className="h-5 w-5 text-[#ce2029]" /> Barangay Signal Level 3
                    </CardTitle>
                    <CardDescription className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">
                      Agusan-Surigao Upland Zone • Typhoon Track
                    </CardDescription>
                  </div>
                  <Badge className="bg-[#ce2029] text-white font-bold px-2.5 py-1 text-xs">
                    HIGH RISK
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-5 space-y-4">
                <div className="p-3.5 bg-[#f8fafc] dark:bg-[#111827] rounded-xl border border-[#e2e8f0] dark:border-[#1e293b]">
                  <p className="text-xs font-bold text-[#0038a8] dark:text-[#60a5fa] uppercase tracking-wider mb-1">Traditional & Sensor Warning</p>
                  <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                    Winds up to 120km/h expected tonight. Elders report unusual stream behavior from upper ridges. Mandatory evacuation recommended for flood-prone zones.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-[#eff6ff] dark:bg-[#1e3a8a]/30 p-3.5 rounded-xl border border-blue-200 dark:border-blue-900">
                    <p className="text-[10px] text-[#1d4ed8] dark:text-[#93c5fd] uppercase font-bold tracking-wider">Evacuation Directive</p>
                    <p className="font-extrabold text-lg mt-0.5 text-[#ce2029] dark:text-[#f87171]">MANDATORY</p>
                  </div>

                  <div className="bg-[#fefce8] dark:bg-[#422006]/30 p-3.5 rounded-xl border border-yellow-200 dark:border-yellow-900">
                    <p className="text-[10px] text-[#a16207] dark:text-[#fde047] uppercase font-bold tracking-wider">Estimated Window</p>
                    <p className="font-extrabold text-lg mt-0.5 text-[#ca8a04] dark:text-[#facc15]">~3 to 4 Hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ==================== TAB 2: SOURCES (COMMUNITY + OFFICIAL INTAKE) ==================== */}
          <TabsContent value="sources" className="space-y-6 outline-none">
            
            {/* 1. Community Intake */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base flex items-center gap-2 text-[#111827] dark:text-[#f9fafb]">
                  <Mic className="h-5 w-5 text-[#ce2029]" /> Community Voice Intake (Native Dialect)
                </h3>
                <Badge variant="outline" className="text-[11px] font-bold border-[#ce2029]/30 text-[#ce2029] bg-[#fff1f2] dark:bg-[#881337]/20">
                  Unresynthesized
                </Badge>
              </div>

              <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-2xs">
                <CardHeader className="pb-3 border-b border-[#e5e7eb] dark:border-[#374151] bg-[#f9fafb] dark:bg-[#111827]/50">
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    🗣️ Elders, barangay leaders, and IP council members submit hazard reports by voice in Minamanwa dialect. <span className="font-bold text-[#111827] dark:text-white">Recordings play back as-is — never resynthesized.</span>
                  </p>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {[
                    {
                      id: "voice-1",
                      author: "Elder Tano",
                      role: "IP Council Member",
                      dialect: "Minamanwa",
                      time: "15 mins ago",
                      transcript: "The mountain streams are rising fast near the lower bend. Secure livestock now.",
                      verified: true,
                    },
                    {
                      id: "voice-2",
                      author: "Datu Makusog",
                      role: "Tribal Chieftain",
                      dialect: "Minamanwa",
                      time: "40 mins ago",
                      transcript: "Council advises all families near San Roque creek to assemble at the central shelter.",
                      verified: true,
                    },
                  ].map((item) => (
                    <div key={item.id} className="p-3.5 rounded-xl border border-[#e5e7eb] dark:border-[#374151] bg-[#f9fafb] dark:bg-[#111827] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-8 w-8 border border-[#0038a8]">
                            <AvatarFallback className="bg-[#0038a8] text-white text-xs font-bold">{item.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold">{item.author}</span>
                              <Badge className="bg-[#eff6ff] text-[#0038a8] dark:bg-[#1e3a8a] dark:text-[#93c5fd] border-none text-[10px] font-bold">
                                {item.dialect}
                              </Badge>
                            </div>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{item.role}</span>
                          </div>
                        </div>
                        {item.verified && (
                          <span className="text-[11px] font-bold text-[#2563eb] dark:text-[#60a5fa] flex items-center gap-1 bg-[#eff6ff] dark:bg-[#1e3a8a]/50 px-2 py-0.5 rounded-md">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#2563eb]" /> VERIFIED VOICE
                          </span>
                        )}
                      </div>

                      {/* Voice Player */}
                      <div className="flex items-center gap-3 bg-white dark:bg-[#1f2937] p-2.5 rounded-lg border border-[#e5e7eb] dark:border-[#374151]">
                        <Button
                          size="icon"
                          onClick={() => handlePlayAudio(item.id)}
                          className="h-8 w-8 rounded-full bg-[#ce2029] hover:bg-[#b91c1c] text-white shrink-0 shadow-2xs"
                        >
                          {playingAudioId === item.id ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                        </Button>
                        <div className="flex-1">
                          <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mb-1 font-mono">
                            <span>{playingAudioId === item.id ? "Playing Native Voice..." : "Original Dialect Recording"}</span>
                            <span>0:24</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className={`h-full bg-[#ce2029] transition-all duration-300 ${playingAudioId === item.id ? "w-2/3 animate-pulse" : "w-0"}`} />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 italic font-medium">"{item.transcript}"</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* 2. Official Intake & AI Disclosures */}
            <div>
              <h3 className="font-bold text-base flex items-center gap-2 mb-3 text-[#111827] dark:text-[#f9fafb]">
                <ShieldAlert className="h-5 w-5 text-[#0038a8]" /> Official Intake (PAGASA / NDRRMC)
              </h3>

              <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-2xs">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#0038a8]" />
                      <span className="text-xs font-bold">PAGASA Severe Weather Bulletin #14</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] border-[#0038a8] text-[#0038a8] bg-[#eff6ff] dark:bg-[#1e3a8a]/30 font-bold">
                      Regional Feed
                    </Badge>
                  </div>

                  {/* AI Spoken Tag Disclosure */}
                  <div className="p-3.5 bg-[#fefce8] dark:bg-[#422006]/30 border border-[#fef08a] dark:border-[#713f12] rounded-xl space-y-2">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4 text-[#ca8a04] shrink-0" />
                      <p className="text-xs font-bold text-[#854d0e] dark:text-[#fde047]">
                        AI Spoken Disclosure Mandatory
                      </p>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      AI-translated content always opens with a mandatory audio tag before playback:
                    </p>
                    <div className="p-2 bg-white dark:bg-[#111827] rounded-md border border-[#fef08a] dark:border-[#713f12] text-xs font-mono text-[#0038a8] dark:text-[#60a5fa] font-bold">
                      🔊 "PAGASA bulletin, translated, not from your barangay."
                    </div>

                    <Button
                      size="sm"
                      onClick={() => handlePlayAudio("official-ai")}
                      className="mt-2 bg-[#0038a8] hover:bg-[#1d4ed8] text-white text-xs h-8 font-bold"
                    >
                      {playingAudioId === "official-ai" ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1 fill-current" />}
                      Test Spoken Disclosure
                    </Button>
                  </div>

                  {/* Human Review Threshold */}
                  <div className="p-3.5 bg-[#eff6ff] dark:bg-[#1e3a8a]/30 border border-[#bfdbfe] dark:border-[#1e40af] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0038a8] dark:text-[#60a5fa] flex items-center gap-1.5">
                        <UserCheck className="h-4 w-4 text-[#2563eb]" /> Human Review Threshold (High Severity)
                      </span>
                      <Badge className="bg-[#2563eb] text-white text-[10px] font-bold">VERIFIED REVIEWER</Badge>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      High severity alerts require local reviewer verification <span className="font-bold text-[#111827] dark:text-white">(Health Worker Maria)</span> before unlocked.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

          </TabsContent>

          {/* ==================== TAB 3: RECOVERY / SUPPLY MAP ==================== */}
          <TabsContent value="supply" className="space-y-4 outline-none">
            <SupplyLiveMap />
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}
