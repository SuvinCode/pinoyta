"use client";

import { useState, useEffect, useRef } from "react";
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
import { AlertTriangle, CheckCircle2, Play, Pause, Activity, Map, Settings, Volume2, ShieldAlert, FileText, UserCheck, Mic, HelpCircle, Sun, Star, Send, Pin, Menu, MapPin, Trash2, Loader2 } from "lucide-react";
import SupplyLiveMap from "@/components/supply-map";
import dbData from "@/data/db.json";

const translations = {
  mamanwa: {
    statusLine: "Mataas ang suba ug kusog ang hangin. Pag-andam kamo sa pagbalhin sa taas nga dapit.",
    tabDashboard: "Sources",
    tabSources: "Report",
    tabSupply: "Recovery Map",
    barangayFocus: "Barangay Focus:",
    confirmedTitle: "CONFIRMED BY TRIBAL COUNCIL",
    confirmedSub: "Verified by Datu Makusog for",
    notConfirmedTitle: "NOT YET CONFIRMED",
    notConfirmedSub: "No local leader has confirmed the current alert for this area yet.",
    confirmButton: "Confirm Alert",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agta Ancestral Domain • Typhoon Track",
    traditionalWarningTitle: "Traditional & Sensor Warning",
    traditionalWarningDesc: "Winds up to 120km/h expected tonight. Elders report unusual stream behavior from upper ridges. Mandatory evacuation recommended for flood-prone zones.",
    evacDirectiveTitle: "Evacuation Directive",
    evacDirectiveValue: "MANDATORY / BALHIN",
    estWindowTitle: "Estimated Window",
    estWindowValue: "~3 to 4 Hours",
    communityVoiceTitle: "Community Voice Intake (Native Dialect)",
    unresynthesized: "Unresynthesized",
    communityVoiceDesc: "🗣️ Elders, barangay leaders, and IP council members submit hazard reports by voice in Minamanwa dialect. Recordings play back as-is — never resynthesized.",
    verifiedVoice: "VERIFIED VOICE",
    officialIntakeTitle: "Official Intake (PAGASA / NDRRMC)",
    bulletinTitle: "PAGASA Severe Weather Bulletin #14",
    regionalFeed: "Regional Feed",
    aiDisclosureTitle: "AI Spoken Disclosure Mandatory",
    aiDisclosureDesc: "AI-translated content always opens with a mandatory audio tag before playback:",
    aiAudioTag: '🔊 "PAGASA bulletin, translated, not from your barangay."',
    testDisclosureBtn: "Test Spoken Disclosure",
    humanReviewTitle: "Human Review Threshold (High Severity)",
    humanReviewDesc: "High severity alerts require local reviewer verification (Health Worker Maria) before unlocked.",
    verifiedReviewer: "VERIFIED REVIEWER",
    elderReportsTitle: "Mga Taho sa Katigulangan",
    communityReportsTitle: "Mga Taho sa Komunidad",
    reportTitle: "Magpadala og Taho",
    reportDesc: "Pahibawa ang komunidad mahitungod sa mga peligro sa inyong lugar.",
    reportSuccess: "Kalampusan ang pagsumite sa taho!",
    reportNameLabel: "Ngalan (Opsyonal)",
    reportNamePlaceholder: "Anonimo",
    reportLocationLabel: "Lokasyon",
    reportLocationAuto: "Awtomatiko",
    reportDetailsLabel: "Mga Detalye",
    reportDetailsPlaceholder: "Unsa ang nahitabo? Nagkinahanglan ka ba og tabang?",
    voiceRecord: "I-record ang Tingog",
    stopRecording: "Hunong ang Pag-record...",
    submitBtn: "Isumite",
    noElderReports: "Wala pay mga taho gikan sa mga katigulangan.",
    noCommunityReports: "Wala pay mga taho gikan sa komunidad.",
    darkTheme: "Ngitngit nga Tema",
    languageLabel: "Sinultihan",
    preferencesLabel: "Mga Kagustuhan",
    alertTribalConfirm: "Pagkumpirma sa Tribal Alert",
    pinnedLabel: "PINNED",
    originalRecording: "Orihinal nga Rekording",
    audioReady: "Andam",
    tabDashboardInfo: "Panguna",
    tabSourcesFeed: "Balita",
    tabReportForm: "I-report",
    tabSupplyMap: "Mapa",
    tabSettings: "Mga Setting",
    appTitle: "Pinoyta: Typhoon Preparation & Recovery App",
    appPurpose: "Usa ka aplikasyon sa komunidad nga naka-focus sa pag-ayo human sa katalagman, nagtabang sa mga lumad ug lokal nga komunidad nga magpaambit og importanteng impormasyon, mag-coordinate sa pagtabang, ug makakita sa supply maps panahon ug pagkahuman sa bagyo.",
    descDashboard: "Dashboard: Kinatibuk-ang pagtan-aw sa katuyoan sa aplikasyon ug giya sa pag-navigate.",
    descSources: "Sources: Mga taho sa komunidad ug mga katigulangan alang sa tinuod nga mga update sa yuta.",
    descReport: "Report: Pagpadala og mga taho sa peligro o pangayo og tabang, lakip na ang pag-record og tingog.",
    descSupply: "Recovery Map: Usa ka interactive nga mapa nga nagpakita sa mga supply drops, luwas nga mga lugar, ug mga lugar nga adunay peligro.",
    problemsTitle: "Mga Problema",
    prob1: "Nakalimtan nan gobyerno",
    prob2: "Layu an pag-ila nan gobyerno sa kahibalo nan mga lumad",
    prob3: "Waya nakaeskwela an kadaghanan sa komunidad (nahamutang layo sa moderno)",
    solutionTitle: "Solusyon",
    sol1: "Mapa nan supply nga nagapakita sa pasilidad para makahibayo an mga tao daw an gobyerno unsay ayuhon",
    sol2: "Balita gikan sa mga Katiguyangan pinaagi sa boses (aron magsalig an gobyerno daw komunidad)",
    sol3: "Tubagon an mga pasilidad nga kinahanglan ayuhon",
    measureTitle: "Pagsukod nan Kalampusan",
    meas1: "Pangayo-on an sulti nan Katiguyangan",
    meas2: "Ihapon an nangamatay (quantitative tracking)",
    meas3: "% nan hangyo sa pagbakwit nga natuman",
    limitTitle: "Mga Limitasyon",
    lim1: "Kulag an digital infrastracture daw kahibayo",
    lim2: "Kinahanglan nan training para matudloan an komunidad paggamit",
    futureTitle: "Mga Umaabot nga Plano",
    fut1: "Mangayo nan tabang o grants sa gobyerno",
    fut2: "Alternatibo sa GoFundMe sa Pilipinas (pareho nan Daisy, BayanihanPH)",
    registerInfo: "Kung gusto niyo magparehistro bilang Katiguyangan, Tribal Chief, o Lider nan Komunidad, palihog kontaka an officialpinoyta@gmail.com daw himoan ka namo nan opisyal nga account.",
  },
  bisaya: {
    statusLine: "Nagka-duol ang bagyo. Siguroha ang inyong mga balay ug pangandam sa pag-bakwit sa taas nga dapit.",
    tabDashboard: "Sources",
    tabSources: "Report",
    tabSupply: "Recovery Map",
    barangayFocus: "Gipunting nga Barangay:",
    confirmedTitle: "GIKUMPIRMA SA KATAWHANG TRIBAL",
    confirmedSub: "Gikumpirma ni Datu Makusog alang sa",
    notConfirmedTitle: "WALA PA GIKUMPIRMA",
    notConfirmedSub: "Wala pay lokal nga lider nga nagkumpirma sa pahidaan sa kining dapita.",
    confirmButton: "Kumpirmaha ang Alert",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agta Ancestral Domain • Dagan sa Bagyo",
    traditionalWarningTitle: "Pahidaan sa Katigulangan ug Sensor",
    traditionalWarningDesc: "Kusog nga hangin hangtod 120km/h karong gabii. Nagtaho ang mga katigulangan bahin sa dili kasagaran nga pagtubo sa tubig sa sapa. Girekomendar ang pag-evacuate.",
    evacDirectiveTitle: "Direktiba sa Pag-Evacuate",
    evacDirectiveValue: "PAHILAYO / KINAHANGLAN",
    estWindowTitle: "Gibanabana nga Oras",
    estWindowValue: "~3 hangtod 4 ka Oras",
    communityVoiceTitle: "Taho sa Tingog sa Komunidad (Lumad nga Lengguwahe)",
    unresynthesized: "Dili Gituhog nga Tingog",
    communityVoiceDesc: "🗣️ Ang mga katigulangan ug lider sa tribal nagsumite sa taho pinaagi sa tingog sa ilang lumad nga lengguwahe. Ipatugtog kini kung unsa gyud—dili bag-ohon sa AI.",
    verifiedVoice: "GIKUMPIRMA NG TINGOG",
    officialIntakeTitle: "Opisyal nga Intake (PAGASA / NDRRMC)",
    bulletinTitle: "PAGASA Severe Weather Bulletin #14",
    regionalFeed: "Rehiyonal nga Feed",
    aiDisclosureTitle: "Pahibalo sa AI nga Tingog",
    aiDisclosureDesc: "Ang gi-translate sa AI mag-abli gyud sa pamasidaan nga tag sa dili pa ipatugtog:",
    aiAudioTag: '🔊 "PAGASA bulletin, gi-hubad, dili gikan sa inyong barangay."',
    testDisclosureBtn: "Subaya ang Pahibalo sa Tingog",
    humanReviewTitle: "Gikinahanglan ang Pagsusi sa Tawo",
    humanReviewDesc: "Ang taas nga lebel sa peligro nanginahanglan ug pag-inspeksyon sa lokal nga trabahador sa panglawas (Health Worker Maria).",
    verifiedReviewer: "GIKUMPIRMANAY NGA NAGTAN-AW",
    elderReportsTitle: "Mga Taho sa Katigulangan",
    communityReportsTitle: "Mga Taho sa Komunidad",
    reportTitle: "Magpadala og Taho",
    reportDesc: "Pahibawa ang komunidad mahitungod sa mga peligro sa inyong lugar.",
    reportSuccess: "Kalampusan ang pagsumite sa taho!",
    reportNameLabel: "Ngalan (Opsyonal)",
    reportNamePlaceholder: "Anonimo",
    reportLocationLabel: "Lokasyon",
    reportLocationAuto: "Awtomatiko",
    reportDetailsLabel: "Mga Detalye",
    reportDetailsPlaceholder: "Unsa ang nahitabo? Nagkinahanglan ka ba og tabang?",
    voiceRecord: "I-record ang Tingog",
    stopRecording: "Hunong ang Pag-record...",
    submitBtn: "Isumite",
    noElderReports: "Wala pay mga taho gikan sa mga katigulangan.",
    noCommunityReports: "Wala pay mga taho gikan sa komunidad.",
    darkTheme: "Ngitngit nga Tema",
    languageLabel: "Sinultihan",
    preferencesLabel: "Mga Kagustuhan",
    alertTribalConfirm: "Pagkumpirma sa Tribal Alert",
    pinnedLabel: "PINNED",
    originalRecording: "Orihinal nga Rekording",
    audioReady: "Andam",
    tabDashboardInfo: "Panguna",
    tabSourcesFeed: "Mga Balita",
    tabReportForm: "I-report",
    tabSupplyMap: "Mapa",
    tabSettings: "Mga Setting",
    appTitle: "Pinoyta: Typhoon Preparation & Recovery App",
    appPurpose: "Usa ka aplikasyon sa komunidad nga naka-focus sa pag-ayo human sa katalagman, nagtabang sa mga lumad ug lokal nga komunidad nga magpaambit og importanteng impormasyon, mag-coordinate sa pagtabang, ug makakita sa supply maps panahon ug pagkahuman sa bagyo.",
    descDashboard: "Dashboard: Kinatibuk-ang pagtan-aw sa katuyoan sa aplikasyon ug giya sa pag-navigate.",
    descSources: "Sources: Mga taho sa komunidad ug mga katigulangan alang sa tinuod nga mga update.",
    descReport: "Report: Pagpadala og mga taho sa peligro o pangayo og tabang, lakip na ang pag-record og tingog.",
    descSupply: "Recovery Map: Usa ka interactive nga mapa nga nagpakita sa mga supply drops ug luwas nga mga lugar.",
    problemsTitle: "Mga Problema",
    prob1: "Nakalimtan sa gobyerno",
    prob2: "Dakong kal-ang tali sa lumad nga kahibalo ug mga proyekto sa gobyerno",
    prob3: "Sagad sa komunidad walay igong edukasyon (layo sa modernong mga komunidad)",
    solutionTitle: "Solusyon",
    sol1: "Recovery supply map nga nagpakita sa mga pasilidad aron kahibalo ang komunidad asa moadto ug kahibalo ang gobyerno unsay ayuhon",
    sol2: "Mga balita gikan sa mga Katigulangan pinaagi sa voice recording (nagpalig-on sa pagsalig tali sa gobyerno ug komunidad)",
    sol3: "Pag-atiman sa mga pasilidad nga kinahanglan ayuhon",
    measureTitle: "Pagsukod sa Kalamposan",
    meas1: "Mangayo og feedback gikan sa mga Katigulangan",
    meas2: "Ihap sa nangamatay (quantitative tracking)",
    meas3: "% sa mga hangyo sa pagbakwit nga natuman (paghimo sa imprastraktura)",
    limitTitle: "Mga Limitasyon",
    lim1: "Limitado ang digital nga imprastraktura ug kahibalo",
    lim2: "Nagkinahanglan og dugang training workshops aron matudloan ang komunidad",
    futureTitle: "Mga Plano sa Umaabot",
    fut1: "Mang-apply alang sa grants gikan sa gobyerno",
    fut2: "Mga alternatibo sa GoFundMe sa Pilipinas (pananglitan, Daisy, BayanihanPH)",
    registerInfo: "Kung gusto nimo magparehistro isip Katigulangan, Tribal Chief, o Lider sa Komunidad, palihog kontaka ang officialpinoyta@gmail.com ug himoan ka namo og opisyal nga account.",
  },
  tagalog: {
    statusLine: "Papalapit ang bagyo. Iseguro ang mga tahanan at maghandang lumipat sa mataas na lugar.",
    tabDashboard: "Sources",
    tabSources: "Report",
    tabSupply: "Recovery Map",
    barangayFocus: "Nakatutok sa Barangay:",
    confirmedTitle: "KUMPIRMADO NG KONSEHO NG IP/KATUTUBO",
    confirmedSub: "Kinumpirma ni Datu Makusog para sa",
    notConfirmedTitle: "HINDI PA KUMPIRMADO",
    notConfirmedSub: "Wala pang lokal na pinuno na nagpapatunay sa babalang ito para sa lugar na ito.",
    confirmButton: "Kumpirmahin ang Babala",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agta Ancestral Domain • Sundan ang Bagyo",
    traditionalWarningTitle: "Babala ng Katutubo at Sensor",
    traditionalWarningDesc: "Malakas na hangin hanggang 120km/h ngayong gabi. Ulat ng mga katutubong nakakatanda ang mabilis na pagtaas ng tubig sa sapa. Mandatory ang paglikas.",
    evacDirectiveTitle: "Direktiba sa Paglikas",
    evacDirectiveValue: "MANDATORY / LIKAS",
    estWindowTitle: "Tantyang Oras",
    estWindowValue: "~3 hanggang 4 na Oras",
    communityVoiceTitle: "Boses ng Komunidad (Katutubong Wika)",
    unresynthesized: "Tunay na Boses",
    communityVoiceDesc: "🗣️ Ang mga nakakatanda at lider ay nagpapadala ng ulat gamit ang kanilang sariling boses. I-play nang walang pagbabago—hindi AI voice.",
    verifiedVoice: "BERIPIKADONG BOSES",
    officialIntakeTitle: "Opisyal na Ulat (PAGASA / NDRRMC)",
    bulletinTitle: "PAGASA Severe Weather Bulletin #14",
    regionalFeed: "Rehiyonal na Balita",
    aiDisclosureTitle: "Mandatong Paghahayag ng AI Translation",
    aiDisclosureDesc: "Ang nilalamang isinalin ng AI ay laging magsisimula sa pampublikong tag bago i-play:",
    aiAudioTag: '🔊 "PAGASA bulletin, isinalin, hindi mula sa inyong barangay."',
    testDisclosureBtn: "Subukan ang Paghahayag",
    humanReviewTitle: "Pagsusuri ng Tao (Mataas na Panganib)",
    humanReviewDesc: "Ang mataas na panganib ay nangangailangan ng beripikasyon ng lokal na Health Worker (Maria) bago ilabas.",
    verifiedReviewer: "BERIPIKADONG TAGAPAGSURI",
    elderReportsTitle: "Mga Ulat ng Matatanda",
    communityReportsTitle: "Mga Ulat ng Komunidad",
    reportTitle: "Magpadala ng Ulat",
    reportDesc: "Balaan ang komunidad tungkol sa mga panganib sa inyong lugar.",
    reportSuccess: "Matagumpay na naipadala ang ulat!",
    reportNameLabel: "Pangalan (Opsyonal)",
    reportNamePlaceholder: "Anonimo",
    reportLocationLabel: "Lokasyon",
    reportLocationAuto: "Auto",
    reportDetailsLabel: "Detalye",
    reportDetailsPlaceholder: "Ano ang nangyayari? Kailangan mo ba ng tulong?",
    voiceRecord: "I-record ang Boses",
    stopRecording: "Ihinto ang Pagre-record...",
    submitBtn: "Isumite",
    noElderReports: "Wala pang mga ulat mula sa matatanda.",
    noCommunityReports: "Wala pang mga ulat mula sa komunidad.",
    darkTheme: "Madilim na Tema",
    languageLabel: "Wika",
    preferencesLabel: "Mga Kagustuhan",
    alertTribalConfirm: "Kumpirmasyon ng Tribal Alert",
    pinnedLabel: "NAKA-PIN",
    originalRecording: "Orihinal na Rekording",
    audioReady: "Handa",
    tabDashboardInfo: "Pangunahin",
    tabSourcesFeed: "Mga Balita",
    tabReportForm: "Mag-ulat",
    tabSupplyMap: "Mapa",
    tabSettings: "Mga Setting",
    appTitle: "Pinoyta: Typhoon Preparation & Recovery App",
    appPurpose: "Isang aplikasyong pinapatakbo ng komunidad na nakatutok sa pagbangon pagkatapos ng sakuna, tumutulong sa mga katutubo at lokal na komunidad na magbahagi ng mahalagang impormasyon at mapa ng suplay sa panahon at pagkatapos ng bagyo.",
    descDashboard: "Dashboard: Pangkalahatang ideya ng layunin ng aplikasyon at gabay sa pag-navigate.",
    descSources: "Sources: Mga ulat ng komunidad at matatanda para sa mga totoong update.",
    descReport: "Report: Magsumite ng mga ulat sa panganib o humingi ng tulong, kasama ang pag-record ng boses.",
    descSupply: "Recovery Map: Isang interactive na mapa na nagpapakita ng mga supply drop at ligtas na mga lugar.",
    problemsTitle: "Mga Problema",
    prob1: "Nakaligtaan ng gobyerno",
    prob2: "Puwang sa pagitan ng katutubong kaalaman at mga inisyatiba ng gobyerno",
    prob3: "Karamihan sa komunidad ay hindi nakapag-aral dahil sa kakulangan sa edukasyon (nakahiwalay sa mga modernong komunidad)",
    solutionTitle: "Solusyon",
    sol1: "Recovery supply map na nagpapakita ng mga pasilidad upang malaman ng komunidad kung saan pupunta at alam ng gobyerno kung ano ang aayusin",
    sol2: "Balita mula sa mga Nakatatanda/Pinuno sa pamamagitan ng voice recording (nagpapatibay ng tiwala sa pagitan ng gobyerno at komunidad)",
    sol3: "Tugunan ang mga pasilidad na kailangang ayusin",
    measureTitle: "Pagsukat ng Tagumpay",
    meas1: "Humingi ng feedback ng mga Nakatatanda",
    meas2: "Bilang ng mga namatay (quantitative tracking)",
    meas3: "% ng mga hiling para sa paglikas na naipatupad (pagpapatupad ng imprastraktura)",
    limitTitle: "Mga Limitasyon",
    lim1: "Limitado ang digital na imprastraktura at kaalaman",
    lim2: "Kailangan ng karagdagang pagsasanay upang turuan ang komunidad na gumamit",
    futureTitle: "Mga Hinaharap na Plano",
    fut1: "Mag-apply para sa mga pondo mula sa gobyerno",
    fut2: "Mga alternatibo sa GoFundMe sa Pilipinas (hal., Daisy, BayanihanPH)",
    registerInfo: "Kung nais mong magparehistro bilang Nakatatanda, Pinuno ng Tribo, o Lider ng Komunidad, mangyaring makipag-ugnayan sa officialpinoyta@gmail.com at gagawan ka namin ng opisyal na account.",
  },
  english: {
    statusLine: "Typhoon approaching. Secure homes and prepare to move to high ground.",
    tabDashboard: "Sources",
    tabSources: "Report",
    tabSupply: "Recovery Map",
    barangayFocus: "Barangay Focus:",
    confirmedTitle: "CONFIRMED BY TRIBAL COUNCIL",
    confirmedSub: "Verified by Datu Makusog for",
    notConfirmedTitle: "NOT YET CONFIRMED",
    notConfirmedSub: "No local leader has confirmed the current alert for this area yet.",
    confirmButton: "Confirm Alert",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agta Ancestral Domain • Typhoon Track",
    traditionalWarningTitle: "Traditional & Sensor Warning",
    traditionalWarningDesc: "Winds up to 120km/h expected tonight. Elders report unusual stream behavior from upper ridges. Mandatory evacuation recommended for flood-prone zones.",
    evacDirectiveTitle: "Evacuation Directive",
    evacDirectiveValue: "MANDATORY",
    estWindowTitle: "Estimated Window",
    estWindowValue: "~3 to 4 Hours",
    communityVoiceTitle: "Community Voice Intake (Native Dialect)",
    unresynthesized: "Unresynthesized",
    communityVoiceDesc: "🗣️ Elders, barangay leaders, and IP council members submit hazard reports by voice in Minamanwa dialect. Recordings play back as-is — never resynthesized.",
    verifiedVoice: "VERIFIED VOICE",
    officialIntakeTitle: "Official Intake (PAGASA / NDRRMC)",
    bulletinTitle: "PAGASA Severe Weather Bulletin #14",
    regionalFeed: "Regional Feed",
    aiDisclosureTitle: "AI Spoken Disclosure Mandatory",
    aiDisclosureDesc: "AI-translated content always opens with a mandatory audio tag before playback:",
    aiAudioTag: '🔊 "PAGASA bulletin, translated, not from your barangay."',
    testDisclosureBtn: "Test Spoken Disclosure",
    humanReviewTitle: "Human Review Threshold (High Severity)",
    humanReviewDesc: "High severity alerts require local reviewer verification (Health Worker Maria) before unlocked.",
    verifiedReviewer: "VERIFIED REVIEWER",
    elderReportsTitle: "Elder Reports",
    communityReportsTitle: "Community Reports",
    reportTitle: "Send a Report",
    reportDesc: "Alert the community about hazards or needs in your area.",
    reportSuccess: "Report submitted safely!",
    reportNameLabel: "Name (Optional)",
    reportNamePlaceholder: "Anonymous",
    reportLocationLabel: "Location",
    reportLocationAuto: "Auto",
    reportDetailsLabel: "Details",
    reportDetailsPlaceholder: "What is happening? Do you need help?",
    voiceRecord: "Voice Record",
    stopRecording: "Stop Recording...",
    submitBtn: "Submit",
    noElderReports: "No elder reports yet.",
    noCommunityReports: "No community reports yet.",
    darkTheme: "Dark Theme",
    languageLabel: "Language",
    preferencesLabel: "Preferences",
    alertTribalConfirm: "Alert Tribal Confirmation",
    pinnedLabel: "PINNED",
    originalRecording: "Original Dialect Recording",
    audioReady: "Ready",
    tabDashboardInfo: "Dashboard",
    tabSourcesFeed: "Sources",
    tabReportForm: "Report",
    tabSupplyMap: "Recovery Map",
    tabSettings: "Settings",
    appTitle: "Pinoyta: Typhoon Preparation & Recovery App",
    appPurpose: "A community-driven application focused on disaster recovery, helping indigenous and local communities share vital information, coordinate relief efforts, and access supply maps during and after typhoons.",
    descDashboard: "Dashboard: Overview of the application's purpose and navigation guide.",
    descSources: "Sources: A feed of community and elder reports, providing real-time, verified ground updates.",
    descReport: "Report: Submit new hazard reports or requests for assistance, with voice recording capabilities.",
    descSupply: "Recovery Map: An interactive map showing supply drops, safe zones, and hazard areas.",
    problemsTitle: "Problems",
    prob1: "Overlooked by the government",
    prob2: "Gap between indigenous knowledge and government initiatives",
    prob3: "Community is mostly illiterate due to lack of education (disconnected from modern communities)",
    solutionTitle: "Solution",
    sol1: "Recovery supply map showing facilities so community members know where to go and government knows what to renovate",
    sol2: "News from Elders/Chiefs through voice recording (builds trust between government and community)",
    sol3: "Respond to facilities that need renovation",
    measureTitle: "Measuring Success",
    meas1: "Asks Elder's feedback",
    meas2: "Death toll (quantitative tracking)",
    meas3: "% of evacuation requests executed (infrastructure implementation)",
    limitTitle: "Limitations",
    lim1: "Limited digital infrastructure & knowledge",
    lim2: "Need further training workshops to teach community to use",
    futureTitle: "Future Implementations",
    fut1: "Apply for government grants",
    fut2: "GoFundMe alternatives in Philippines (e.g., Daisy, BayanihanPH)",
    registerInfo: "If you want to register as an Elder, Tribal Chief, or Community Leader, please reach out to officialpinoyta@gmail.com and we will set up an official account for you.",
  },
  cebuano: {
    statusLine: "Nagka-duol ang bagyo. Siguroha ang inyong mga balay ug pangandam sa pag-bakwit sa taas nga dapit.",
    tabDashboard: "Sources",
    tabSources: "Report",
    tabSupply: "Recovery Map",
    barangayFocus: "Gipunting nga Barangay:",
    confirmedTitle: "GIKUMPIRMA SA KONSEHO SA TRIBAL",
    confirmedSub: "Gikumpirma ni Datu Makusog alang sa",
    notConfirmedTitle: "WALA PA GIKUMPIRMA",
    notConfirmedSub: "Wala pay lokal nga lider nga nagkumpirma sa pahimangno niining dapita.",
    confirmButton: "Kumpirmaha ang Alert",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agta Ancestral Domain • Dagan sa Bagyo",
    traditionalWarningTitle: "Pahimangno sa Katigulangan ug Sensor",
    traditionalWarningDesc: "Kusog nga hangin hangtod 120km/h karong gabii. Nagtaho ang mga katigulangan bahin sa dili kasagaran nga pagtubo sa tubig sa sapa. Girekomendar ang dinaliang pag-evacuate.",
    evacDirectiveTitle: "Direktiba sa Pag-Evacuate",
    evacDirectiveValue: "PAHILAYO / KINAHANGLAN",
    estWindowTitle: "Gibanabana nga Oras",
    estWindowValue: "~3 hangtod 4 ka Oras",
    communityVoiceTitle: "Taho sa Tingog sa Komunidad",
    unresynthesized: "Dili Gituhog nga Tingog",
    communityVoiceDesc: "🗣️ Ang mga katigulangan ug lider sa tribal nagsumite sa taho pinaagi sa tingog sa ilang lumad nga pinulongan. Ipatugtog kini kung unsa gyud—dili bag-ohon sa AI.",
    verifiedVoice: "GIKUMPIRMA NGA TINGOG",
    officialIntakeTitle: "Opisyal nga Intake (PAGASA / NDRRMC)",
    bulletinTitle: "PAGASA Severe Weather Bulletin #14",
    regionalFeed: "Rehiyonal nga Feed",
    aiDisclosureTitle: "Pahibalo sa AI nga Tingog",
    aiDisclosureDesc: "Ang gi-translate sa AI mag-abli gyud sa pamasidaan nga tag sa dili pa ipatugtog:",
    aiAudioTag: '🔊 "PAGASA bulletin, gi-hubad, dili gikan sa inyong barangay."',
    testDisclosureBtn: "Subaya ang Pahibalo sa Tingog",
    humanReviewTitle: "Gikinahanglan ang Pagsusi sa Tawo",
    humanReviewDesc: "Ang taas nga lebel sa peligro nanginahanglan ug pag-inspeksyon sa lokal nga trabahador sa panglawas.",
    verifiedReviewer: "GIKUMPIRMA NGA NAGTAN-AW",
    elderReportsTitle: "Mga Taho sa Katigulangan",
    communityReportsTitle: "Mga Taho sa Komunidad",
    reportTitle: "Magpadala og Taho",
    reportDesc: "Pahibawa ang komunidad mahitungod sa mga peligro sa inyong lugar.",
    reportSuccess: "Kalampusan ang pagsumite sa taho!",
    reportNameLabel: "Ngalan (Opsyonal)",
    reportNamePlaceholder: "Anonimo",
    reportLocationLabel: "Lokasyon",
    reportLocationAuto: "Awtomatiko",
    reportDetailsLabel: "Mga Detalye",
    reportDetailsPlaceholder: "Unsa ang nahitabo? Nagkinahanglan ka ba og tabang?",
    voiceRecord: "I-record ang Tingog",
    stopRecording: "Hunong ang Pag-record...",
    submitBtn: "Isumite",
    noElderReports: "Wala pay mga taho gikan sa mga katigulangan.",
    noCommunityReports: "Wala pay mga taho gikan sa komunidad.",
    darkTheme: "Ngitngit nga Tema",
    languageLabel: "Pinulongan",
    preferencesLabel: "Mga Kagustuhan",
    alertTribalConfirm: "Pagkumpirma sa Tribal Alert",
    pinnedLabel: "PINNED",
    originalRecording: "Orihinal nga Rekording",
    audioReady: "Andam",
    tabDashboardInfo: "Panguna",
    tabSourcesFeed: "Mga Balita",
    tabReportForm: "I-report",
    tabSupplyMap: "Mapa",
    tabSettings: "Mga Setting",
    appTitle: "Pinoyta: Typhoon Preparation & Recovery App",
    appPurpose: "Usa ka aplikasyon nga nag-focus sa disaster recovery, nagtabang sa mga lumad nga magpaambit og importanteng impormasyon ug makakita sa supply maps pagkahuman sa bagyo.",
    descDashboard: "Dashboard: Kinatibuk-ang pagtan-aw sa aplikasyon ug giya.",
    descSources: "Sources: Mga taho sa komunidad ug mga katigulangan alang sa mga update.",
    descReport: "Report: Magpadala og mga taho sa peligro o pangayo og tabang gamit ang tingog.",
    descSupply: "Recovery Map: Interactive nga mapa alang sa mga supply drops ug luwas nga mga lugar.",
    problemsTitle: "Mga Problema",
    prob1: "Wala matagad sa gobyerno",
    prob2: "Layo ang deperensya tali sa lumad nga kahibalo ug inisyatibo sa gobyerno",
    prob3: "Daghan sa komunidad ang walay igong edukasyon (bulag sa modernong komunidad)",
    solutionTitle: "Solusyon",
    sol1: "Mapa sa recovery supply nga nagpakita sa mga pasilidad aron ang mga tawo masayod asa moadto ug ang gobyerno masayod unsa ang ayuhon",
    sol2: "Balita gikan sa mga Katigulangan pinaagi sa tingog (pagtukod og pagsalig tali sa gobyerno ug komunidad)",
    sol3: "Pagtubag sa mga pasilidad nga kinahanglan i-renovate",
    measureTitle: "Pagsukod sa Kalampusan",
    meas1: "Pagpangayo og feedback sa Katigulangan",
    meas2: "Talaan sa namatay (quantitative tracking)",
    meas3: "% sa hangyo sa evacuation nga napatuman (infrastracture implementation)",
    limitTitle: "Mga Limitasyon",
    lim1: "Limitado nga digital infrastracture ug kahibalo",
    lim2: "Kinahanglan pa og training aron matudloan ang komunidad unsaon paggamit",
    futureTitle: "Mga Umaabot nga Plano",
    fut1: "Mag-apply alang sa mga grants sa gobyerno",
    fut2: "Mga alternatibo sa GoFundMe sa Pilipinas (e.g., Daisy, BayanihanPH)",
    registerInfo: "Kung gusto nimo magparehistro isip Katigulangan, Tribal Chief, o Lider sa Komunidad, palihog kontaka ang officialpinoyta@gmail.com ug himoan ka namo og opisyal nga account.",
  },
  ilocano: {
    statusLine: "Umay ti bagyo. I-sigurado dagiti balay yo ken agsagana nga mapan iti nangato a lugar.",
    tabDashboard: "Sources",
    tabSources: "Report",
    tabSupply: "Recovery Map",
    barangayFocus: "Nakatutukan a Barangay:",
    confirmedTitle: "KINUMPIRMA TI KONSEHO TI IP",
    confirmedSub: "Kinumpirma ni Datu Makusog para iti",
    notConfirmedTitle: "SAAN PAY A KINUMPIRMA",
    notConfirmedSub: "Awan pay ti lokal a dadaulo a nangpasingked iti daytoy a pakaammo.",
    confirmButton: "Kumpirmaen Ti Alert",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agta Ancestral Domain • Dalan Ti Bagyo",
    traditionalWarningTitle: "Pakaammo Ti Lakay Ken Sensor",
    traditionalWarningDesc: "Pigsan ti angin inggana 120km/h itay rabii. Ibagbaga dagiti lallakay nga napardas ti idadakkel ti danum iti karayan. Masapul ti dagus nga panag-bakwit.",
    evacDirectiveTitle: "Bilin Ti Panag-Bakwit",
    evacDirectiveValue: "MANDATORY / BAKWIT",
    estWindowTitle: "Pattapatta Nga Oras",
    estWindowValue: "~3 inggana 4 Nga Oras",
    communityVoiceTitle: "Boses Ti Komunidad",
    unresynthesized: "Orihinal Nga Boses",
    communityVoiceDesc: "🗣️ Dagiti lallakay ken dadaulo ket mangipatulod ti pakaammo babaen ti orihinal nga boses. Saan a nabalbaliwan ti AI.",
    verifiedVoice: "NAPASINGKEDAN A BOSES",
    officialIntakeTitle: "Opisyal a Damag (PAGASA / NDRRMC)",
    bulletinTitle: "PAGASA Severe Weather Bulletin #14",
    regionalFeed: "Rehiyonal A Damag",
    aiDisclosureTitle: "Pakaammo Maipapan Ti AI",
    aiDisclosureDesc: "Daytoy nga nai-translate nga boses ket ibagbaga na nga saan a naggapu iti barangay yo:",
    aiAudioTag: '🔊 "PAGASA bulletin, nai-translate, saan a naggapu ti barangay yo."',
    testDisclosureBtn: "Padasen Ti Pakaammo",
    humanReviewTitle: "Panangsuri Ti Tao (Nangato a Peggad)",
    humanReviewDesc: "Pasingkedan nga umuna ti lokal a Health Worker sakbay a maiparuar daytoy.",
    verifiedReviewer: "NAPASINGKEDAN A NANGSURI",
    elderReportsTitle: "Pakaammo Dagiti Lallakay",
    communityReportsTitle: "Pakaammo Ti Komunidad",
    reportTitle: "Mangted ti Pakaammo",
    reportDesc: "Ipaaman ti komunidad maipapan kadagiti peligro iti lugar yo.",
    reportSuccess: "Napalampas ti panagipan ti pakaammo!",
    reportNameLabel: "Nagan (Opsyonal)",
    reportNamePlaceholder: "Saan Napakaammo",
    reportLocationLabel: "Lugar",
    reportLocationAuto: "Awtomatiko",
    reportDetailsLabel: "Detalye",
    reportDetailsPlaceholder: "Ania ti napasamak? Kasapulan mo ti tulong?",
    voiceRecord: "I-record Ti Boses",
    stopRecording: "Iggam Ti Pag-record...",
    submitBtn: "Ipan",
    noElderReports: "Awan pay pakaammo dagiti lallakay.",
    noCommunityReports: "Awan pay pakaammo dagiti komunidad.",
    darkTheme: "Nangisit A Tema",
    languageLabel: "Pagsasao",
    preferencesLabel: "Kagustuan",
    alertTribalConfirm: "Pagkumpirar Ti Tribal Alert",
    pinnedLabel: "PINNED",
    originalRecording: "Orihinal A Rekording",
    audioReady: "Naanay",
    tabDashboardInfo: "Pangruna",
    tabSourcesFeed: "Damdamag",
    tabReportForm: "Ireport",
    tabSupplyMap: "Mapa",
    tabSettings: "Pakaidulinan",
    appTitle: "Pinoyta: Typhoon Preparation & Recovery App",
    appPurpose: "Maysa nga aplikasyon ti komunidad para iti pannakabawi iti didigra, tumultulong kadagiti lallakay nga mangibingay iti napateg nga impormasion ken mapa ti suplay kabayatan ti bagyo.",
    descDashboard: "Dashboard: Pakabuklan ti panggep ti aplikasyon ken pagalagadan.",
    descSources: "Sources: Pakaammo dagiti komunidad ken lallakay para kadagiti update.",
    descReport: "Report: Mangted ti pakaammo iti peligro wenno agkiddaw ti tulong.",
    descSupply: "Recovery Map: Interaktibo a mapa para kadagiti supply drops ken natalged a lugar.",
    problemsTitle: "Dagiti Problema",
    prob1: "Maliwayan ti gobyerno",
    prob2: "Awan kinalaingan ti gobyerno kadagiti nakaisigudan a pannakaammo",
    prob3: "Adu ti komunidad a saan a nakapag-adal gapu iti kinakurapay (naisina kadagiti moderno a komunidad)",
    solutionTitle: "Solusion",
    sol1: "Mapa ti recovery supply a mangipakita kadagiti pasilidad tapno ammo ti komunidad no sadino ti mapan ken ammo ti gobyerno ti tarimaanen",
    sol2: "Damdamag manipud kadagiti Lallakay babaen iti voice recording (mangpataud iti panagtalek iti nagbaetan ti gobyerno ken komunidad)",
    sol3: "Sungbatan dagiti pasilidad a kasapulan a tarimaanen",
    measureTitle: "Panagrukod iti Balligi",
    meas1: "Kiddawen ti pammagbaga ti Lallakay",
    meas2: "Bilang ti pimmusay (quantitative tracking)",
    meas3: "% kadagiti kiddaw a panagbakwit a naaramid (infrastracture implementation)",
    limitTitle: "Dagiti Limitasion",
    lim1: "Limitado a digital infrastracture ken pannakaammo",
    lim2: "Kasapulan ti ad-adu a panagsanay tapno masursuruan ti komunidad nga agusar",
    futureTitle: "Dagiti Masakbayan a Plano",
    fut1: "Agtulong para kadagiti pondo manipud iti gobyerno",
    fut2: "Dagiti alternatibo iti GoFundMe idiay Pilipinas (kas koma iti Daisy, BayanihanPH)",
    registerInfo: "No kayat mo ti agparehistro a kas Lallakay, Tribal Chief, wenno Lider ti Komunidad, mabalin a kontakem ti officialpinoyta@gmail.com tapno maaramidan ka iti opisyal nga account.",
  },
  hiligaynon: {
    statusLine: "Hapit na ang bagyo. Siguraduha ang inyo mga balay kag maghanda sa pag-evacuate sa mataas nga lugar.",
    tabDashboard: "Sources",
    tabSources: "Report",
    tabSupply: "Recovery Map",
    barangayFocus: "Ginapokus Nga Barangay:",
    confirmedTitle: "GINKUMPIRMAR SANG KONSEHO",
    confirmedSub: "Ginkumpirmar ni Datu Makusog para sa",
    notConfirmedTitle: "WALA PA GINKUMPIRMAR",
    notConfirmedSub: "Wala pa sang lokal nga lider nga nagkumpirmar sini nga paandam.",
    confirmButton: "Kumpirmaha Ang Paandam",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agta Ancestral Domain • Alagyan Sang Bagyo",
    traditionalWarningTitle: "Paandam Sang Kamagurangan Kag Sensor",
    traditionalWarningDesc: "Mabaskog nga hangin tubtob 120km/h subong nga gab-i. Nagreport ang mga kamagurangan sang madasig nga pagtaas sang tubig sa suba. Kinahanglan gid mag-evacuate.",
    evacDirectiveTitle: "Direktiba Sa Pag-Evacuate",
    evacDirectiveValue: "MANDATORY / HALIN",
    estWindowTitle: "Ginabanta Nga Oras",
    estWindowValue: "~3 tubtob 4 ka Oras",
    communityVoiceTitle: "Tingog Sang Komunidad",
    unresynthesized: "Tunay Nga Tingog",
    communityVoiceDesc: "🗣️ Nagapadala sang mensahe ang mga lider sang barangay paagi sa tunay nila nga tingog. Ginapabati ini nga wala ginbag-o sang AI.",
    verifiedVoice: "GINKUMPIRMAR NGA TINGOG",
    officialIntakeTitle: "Opisyal Nga Balita (PAGASA / NDRRMC)",
    bulletinTitle: "PAGASA Severe Weather Bulletin #14",
    regionalFeed: "Rehiyonal Nga Feed",
    aiDisclosureTitle: "Pahibalo Sang AI",
    aiDisclosureDesc: "Ang gin-translate sang AI naga-sugod gid sa pampubliko nga paandam:",
    aiAudioTag: '🔊 "PAGASA bulletin, gin-translate, indi gikan sa inyo barangay."',
    testDisclosureBtn: "Testingi Ang Pahibalo",
    humanReviewTitle: "Pag-usisa Sang Tawo (Mataas Nga Peligro)",
    humanReviewDesc: "Kinahanglan ang kumpirmasyon sang lokal nga Health Worker bag-o ini ipagwa.",
    verifiedReviewer: "GINKUMPIRMAR NGA TAGA-USISA",
    elderReportsTitle: "Mga Taho sang Kamagurangan",
    communityReportsTitle: "Mga Taho sang Komunidad",
    reportTitle: "Magpadala sing Taho",
    reportDesc: "Ipahibalo sa komunidad ang mga peligro sa inyo lugar.",
    reportSuccess: "Nalampasan ang pagsumite sang taho!",
    reportNameLabel: "Ngalan (Opsyonal)",
    reportNamePlaceholder: "Anonimo",
    reportLocationLabel: "Lokasyon",
    reportLocationAuto: "Awtomatiko",
    reportDetailsLabel: "Mga Detalye",
    reportDetailsPlaceholder: "Ano ang nagakalatabo? Kinahanglan ka ba sing bulig?",
    voiceRecord: "I-record ang Tingog",
    stopRecording: "Hunong ang Pag-record...",
    submitBtn: "Isumite",
    noElderReports: "Wala pa mga taho gikan sa kamagurangan.",
    noCommunityReports: "Wala pa mga taho gikan sa komunidad.",
    darkTheme: "Maitum nga Tema",
    languageLabel: "Hambal",
    preferencesLabel: "Mga Kagustuhan",
    alertTribalConfirm: "Kumpirmasyon sang Tribal Alert",
    pinnedLabel: "PINNED",
    originalRecording: "Orihinal nga Rekording",
    audioReady: "Handa",
    tabDashboardInfo: "Panguna",
    tabSourcesFeed: "Mga Balita",
    tabReportForm: "I-report",
    tabSupplyMap: "Mapa",
    tabSettings: "Mga Setting",
    appTitle: "Pinoyta: Typhoon Preparation & Recovery App",
    appPurpose: "Isa ka aplikasyon sang komunidad para sa disaster recovery, nagabulig sa mga pumuluyo nga magpaambit sang impormasyon kag makita ang supply maps sa tion sang bagyo.",
    descDashboard: "Dashboard: Kabilugang pagtan-aw sa tinutuyo sang aplikasyon.",
    descSources: "Sources: Mga taho sang komunidad kag kamagurangan para sa mga update.",
    descReport: "Report: Magpadala sing taho ukon mangayo sing bulig gamit ang tingog.",
    descSupply: "Recovery Map: Interactive nga mapa para sa mga supply drops kag luwas nga lugar.",
    problemsTitle: "Mga Problema",
    prob1: "Nakalimtan sang gobyerno",
    prob2: "Gap sa tunga sang kaalam sang lumad kag mga inisyatibo sang gobyerno",
    prob3: "Kalabanan sa komunidad wala nakatapos sang pagtuon (bulag sa moderno nga komunidad)",
    solutionTitle: "Solusyon",
    sol1: "Mapa sang recovery supply nga nagapakita sang mga pasilidad agud mabal-an sang komunidad kon diin makadto kag mabal-an sang gobyerno kon ano ang ayuhon",
    sol2: "Balita halin sa mga Katigulangan paagi sa tingog (nagapadalom sang pagsalig sa tunga sang gobyerno kag komunidad)",
    sol3: "Sabton ang mga pasilidad nga kinahanglan kay-uhon",
    measureTitle: "Pagtakus sang Kadalag-an",
    meas1: "Pangayoon ang opinyon sang mga Katigulangan",
    meas2: "Kadamuon sang napatay (quantitative tracking)",
    meas3: "% sang mga pangabay nga evacuation nga napatuman",
    limitTitle: "Mga Limitasyon",
    lim1: "Limitado nga digital nga imprastraktura kag ihibalo",
    lim2: "Kinahanglan ang dugang nga paghanas agud tudluan ang komunidad sa paggamit",
    futureTitle: "Mga Plano sa Palaabuton",
    fut1: "Mag-apply para sa mga grant sang gobyerno",
    fut2: "Mga alternatibo sang GoFundMe sa Pilipinas (halimbawa, Daisy, BayanihanPH)",
    registerInfo: "Kon luyag mo magparehistro bilang Katigulangan, Tribal Chief, ukon Lider sang Komunidad, palihug kontaka ang officialpinoyta@gmail.com kag himuan ka namon sang opisyal nga account.",
  },
  bicolano: {
    statusLine: "Haranihon na ang bagyo. Seguruhon ang mga harong asin mag-andam sa pagbalyo sa halangkaw na lugar.",
    tabDashboard: "Sources",
    tabSources: "Report",
    tabSupply: "Recovery Map",
    barangayFocus: "Tinututukan na Barangay:",
    confirmedTitle: "KUMPIRMADO KAN KONSEHO",
    confirmedSub: "Kinumpirma ni Datu Makusog para sa",
    notConfirmedTitle: "DAI PA KUMPIRMADO",
    notConfirmedSub: "Mayong lokal na lider an nagkumpirma kan patanid na ini.",
    confirmButton: "Kumpirmahon an Patanid",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agta Ancestral Domain • Dalan kan Bagyo",
    traditionalWarningTitle: "Patanid kan mga Gurang asin Sensor",
    traditionalWarningDesc: "Makusog na duros sagkod 120km/h ngunyan na banggi. Nagbareta an mga gurang na marikas an paglangkaw kan tubig sa salog. Mandatoryo an pag-evacuate.",
    evacDirectiveTitle: "Bilin sa Pag-Evacuate",
    evacDirectiveValue: "MANDATORY / HALE",
    estWindowTitle: "Pigtatantyang Oras",
    estWindowValue: "~3 sagkod 4 na Oras",
    communityVoiceTitle: "Boses kan Komunidad",
    unresynthesized: "Orihinal na Boses",
    communityVoiceDesc: "🗣️ Nagpapadara nin mensahe an mga lider gamit an saindang sadiring boses. Pigkakawat ini na mayong binago an AI.",
    verifiedVoice: "BERIPIKADONG BOSES",
    officialIntakeTitle: "Opisyal na Bareta (PAGASA / NDRRMC)",
    bulletinTitle: "PAGASA Severe Weather Bulletin #14",
    regionalFeed: "Rehiyonal na Bareta",
    aiDisclosureTitle: "Paisi kan AI Translation",
    aiDisclosureDesc: "An gabos na pighubad kan AI mapasabot nguna bago magkawat:",
    aiAudioTag: '🔊 "PAGASA bulletin, pighubad, bako hali sa saindong barangay."',
    testDisclosureBtn: "Testingon an Paisi",
    humanReviewTitle: "Pagsusuri kan Tawo (Halangkaw na Peligro)",
    humanReviewDesc: "Kaipuhan munang beripikaron kan Health Worker an peligro bago ipasabot.",
    verifiedReviewer: "BERIPIKADONG TAGA-SURI",
    elderReportsTitle: "Mga Bareta kan mga Gurang",
    communityReportsTitle: "Mga Bareta kan Komunidad",
    reportTitle: "Magpadara nin Bareta",
    reportDesc: "Ipaaram sa komunidad an mga peligro sa saindong lugar.",
    reportSuccess: "Maogma na naipadara an bareta!",
    reportNameLabel: "Ngaran (Opsyonal)",
    reportNamePlaceholder: "Anonimo",
    reportLocationLabel: "Lugar",
    reportLocationAuto: "Awtomatiko",
    reportDetailsLabel: "Mga Detalye",
    reportDetailsPlaceholder: "Ano an nangyayari? Kaipuhan mo nin tabang?",
    voiceRecord: "I-record an Boses",
    stopRecording: "Iuntok an Pag-record...",
    submitBtn: "Isumite",
    noElderReports: "Mayong mga bareta pa hali sa mga gurang.",
    noCommunityReports: "Mayong mga bareta pa hali sa komunidad.",
    darkTheme: "Madiklom na Tema",
    languageLabel: "Tataramon",
    preferencesLabel: "Mga Kagustuhan",
    alertTribalConfirm: "Kumpirmasyon kan Tribal Alert",
    pinnedLabel: "PINNED",
    originalRecording: "Orihinal na Rekording",
    audioReady: "Handa",
    tabDashboardInfo: "Panginot",
    tabSourcesFeed: "Mga Bareta",
    tabReportForm: "I-report",
    tabSupplyMap: "Mapa",
    tabSettings: "Mga Setting",
    appTitle: "Pinoyta: Typhoon Preparation & Recovery App",
    appPurpose: "Sarong aplikasyon kan komunidad para sa pagbangon sa kalamidad, nagtatabang sa mga namamanwaan na ipaabot an importanteng impormasyon asin supply maps sa panahon nin bagyo.",
    descDashboard: "Dashboard: Kabuuan na ideya kan aplikasyon.",
    descSources: "Sources: Mga bareta kan komunidad asin mga gurang para sa mga update.",
    descReport: "Report: Magpadara nin bareta sa peligro o maghagad nin tabang.",
    descSupply: "Recovery Map: Interactive na mapa para sa mga supply drops.",
    problemsTitle: "Mga Problema",
    prob1: "Linipasan kan gobyerno",
    prob2: "Puwang sa tahaw kan aram kan katutubo asin mga plano kan gobyerno",
    prob3: "Kadaklan sa komunidad dae nakapag-adal huli sa kakulangan (nasuhay sa modernong komunidad)",
    solutionTitle: "Solusyon",
    sol1: "Mapa kan recovery supply na nagpapahiling kan pasilidad tanganing maaraman kan komunidad kun saen maduman asin maaraman kan gobyerno kun ano an aayuson",
    sol2: "Bareta hali sa mga Gurang paagi sa boses (nagpapakusog nin tiwala sa gobyerno asin komunidad)",
    sol3: "Aksyonan an mga pasilidad na kaipuhan hirahayon",
    measureTitle: "Pagsukol kan Kapangganahan",
    meas1: "Hagadon an opinyon kan mga Gurang",
    meas2: "Bilang kan mga nagadan (quantitative tracking)",
    meas3: "% kan hinagad na evacuation na naisagibo",
    limitTitle: "Mga Limitasyon",
    lim1: "Limitado an digital na pasilidad asin kaaraman",
    lim2: "Kaipuhan nin dagdag na training para matukduan an komunidad na maggamit",
    futureTitle: "Mga Plano sa Nuanoy",
    fut1: "Mag-apply para sa mga pondo kan gobyerno",
    fut2: "Mga alternatibo kan GoFundMe sa Pilipinas (arog kan Daisy, BayanihanPH)",
    registerInfo: "Kun gusto mong magparehistro bilang Gurang, Tribal Chief, o Lider kan Komunidad, mag-contact sa officialpinoyta@gmail.com asin tataw-an mi ika nin opisyal na account.",
  },
  waray: {
    statusLine: "Ti-arabot na iton bagyo. Siguruha iton iyo mga balay ngan pag-andam ha pagbakwit ngadto ha hitaas nga lugar.",
    tabDashboard: "Sources",
    tabSources: "Report",
    tabSupply: "Recovery Map",
    barangayFocus: "Nakatutok nga Barangay:",
    confirmedTitle: "KUMPIRMADO HAN KONSEHO",
    confirmedSub: "Ginkumpirma ni Datu Makusog para ha",
    notConfirmedTitle: "WARAY PA KUMPIRMAHA",
    notConfirmedSub: "Waray pa lokal nga lider nga nagkumpirma hini nga pahibaro.",
    confirmButton: "Kumpirmaha Iton Alert",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agta Ancestral Domain • Dalan Han Bagyo",
    traditionalWarningTitle: "Pahibaro Han Katigulangan ngan Sensor",
    traditionalWarningDesc: "Makusog nga hangin tubtob 120km/h yana nga gab-i. Nagsumat iton mga katigulangan hin malaksi nga pagsaka han tubig ha salog. Kinahanglan mag-evacuate.",
    evacDirectiveTitle: "Direktiba Ha Pag-Evacuate",
    evacDirectiveValue: "MANDATORY / BAKWIT",
    estWindowTitle: "Ginbabanabana Nga Oras",
    estWindowValue: "~3 tubtob 4 Ka Oras",
    communityVoiceTitle: "Tingog Han Komunidad",
    unresynthesized: "Tinuod Nga Tingog",
    communityVoiceDesc: "🗣️ Nagpapadara hin sumat iton mga lider gamit iton ira kalugaringon nga tingog. Ginpapatukar ini hin waray gin-ilisan han AI.",
    verifiedVoice: "KUMPIRMADO NGA TINGOG",
    officialIntakeTitle: "Opisyal Nga Sumat (PAGASA / NDRRMC)",
    bulletinTitle: "PAGASA Severe Weather Bulletin #14",
    regionalFeed: "Rehiyonal Nga Sumat",
    aiDisclosureTitle: "Pahibaro Han AI Translation",
    aiDisclosureDesc: "Iton gin-translate han AI kay nagtikang anay hin pahibaro:",
    aiAudioTag: '🔊 "PAGASA bulletin, gin-translate, dire tikang ha iyo barangay."',
    testDisclosureBtn: "Testinga Iton Pahibaro",
    humanReviewTitle: "Pagsusi Han Tawo (Hitaas Nga Peligro)",
    humanReviewDesc: "Kinahanglan an pag-usisa han lokal nga Health Worker san-o ini ipagawas.",
    verifiedReviewer: "KUMPIRMADO NGA TAGA-SUSI",
    elderReportsTitle: "Mga Sumat Han Katigulangan",
    communityReportsTitle: "Mga Sumat Han Komunidad",
    reportTitle: "Magpadara hin Sumat",
    reportDesc: "Ipahibaro ha komunidad iton mga peligro ha iyo lugar.",
    reportSuccess: "Kalampusan an pagsumite han sumat!",
    reportNameLabel: "Ngaran (Opsyonal)",
    reportNamePlaceholder: "Anonimo",
    reportLocationLabel: "Lugar",
    reportLocationAuto: "Awtomatiko",
    reportDetailsLabel: "Mga Detalye",
    reportDetailsPlaceholder: "Ano an nagkakalatabo? Kinahanglan ka ba hin bulig?",
    voiceRecord: "I-record iton Tingog",
    stopRecording: "Undanga an Pag-record...",
    submitBtn: "Isumite",
    noElderReports: "Waray pa mga sumat hali ha katigulangan.",
    noCommunityReports: "Waray pa mga sumat hali ha komunidad.",
    darkTheme: "Malangkob nga Tema",
    languageLabel: "Yinaknan",
    preferencesLabel: "Mga Kagustuhan",
    alertTribalConfirm: "Pagkumpirma Han Tribal Alert",
    pinnedLabel: "PINNED",
    originalRecording: "Orihinal nga Rekording",
    audioReady: "Andam",
    tabDashboardInfo: "Panguna",
    tabSourcesFeed: "Mga Sumat",
    tabReportForm: "I-report",
    tabSupplyMap: "Mapa",
    tabSettings: "Mga Setting",
    appTitle: "Pinoyta: Typhoon Preparation & Recovery App",
    appPurpose: "Usa nga aplikasyon han komunidad para han pagbangon ha kalamidad, nabulig ha mga mulupyo pagpakita hin impormasyon ug supply maps ha panahon han bagyo.",
    descDashboard: "Dashboard: Kabug-usan nga pag-abot han aplikasyon.",
    descSources: "Sources: Mga sumat han komunidad ug katigulangan para hin update.",
    descReport: "Report: Magpadara hin sumat hin peligro o pangaro hin bulig.",
    descSupply: "Recovery Map: Interactive nga mapa para han mga supply drops.",
    problemsTitle: "Mga Problema",
    prob1: "Nakalimtan han gobyerno",
    prob2: "Dako an guhang ha butnga han hibaro han mga lumad ug plano han gobyerno",
    prob3: "Kadak-an ha komunidad in waray igo nga edukasyon (bulag ha modernong komunidad)",
    solutionTitle: "Solusyon",
    sol1: "Mapa han recovery supply nga nagpapakita han pasilidad basi mahibaro an komunidad kon diin makadto ug an gobyerno kon ano an aayuson",
    sol2: "Mga sumat tikang ha mga Katigulangan pinaagi hin tingog (nagpapadig-on han tapod ha gobyerno ug komunidad)",
    sol3: "Aksyonan an mga pasilidad nga kinahanglan ayuson",
    measureTitle: "Pagsukol han Kadag-an",
    meas1: "Pangayuon an panunahuna han mga Katigulangan",
    meas2: "Kadamuon han namatay (quantitative tracking)",
    meas3: "% han gin-aro nga pag-evacuate nga natuman",
    limitTitle: "Mga Limitasyon",
    lim1: "Limitado an digital nga imprastraktura ug hibaro",
    lim2: "Kinahanglan hin dugang nga training basi matutdoan an komunidad paggamit",
    futureTitle: "Mga Plano ha Kasiyahan",
    fut1: "Mag-apply para han mga pondo han gobyerno",
    fut2: "Mga alternatibo han GoFundMe ha Pilipinas (sugad han Daisy, BayanihanPH)",
    registerInfo: "Kon karuyag niyo magparehistro komo Katigulangan, Tribal Chief, o Lider han Komunidad, alayon kontaka an officialpinoyta@gmail.com ug hihimuan ka namon hin opisyal nga account.",
  },
  kapampangan: {
    statusLine: "Darating ne ing bagyu. Siguradwan yo ring bale yo at magsadya kayong lumipat king matas a lugal.",
    tabDashboard: "Sources",
    tabSources: "Report",
    tabSupply: "Recovery Map",
    barangayFocus: "Pakatalukyan A Barangay:",
    confirmedTitle: "KUMPIRMÁDU NING KONSEHO",
    confirmedSub: "Kinumpirma neng Datu Makusog para king",
    notConfirmedTitle: "ALI PA KUMPIRMÁDU",
    notConfirmedSub: "Ala pang lokal a pamuntuk a mikumpirma kening babala.",
    confirmButton: "Kumpirman Ya Ing Babala",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agta Ancestral Domain • Dalan Ning Bagyu",
    traditionalWarningTitle: "Babala Ding Mangatwa Ampon Sensor",
    traditionalWarningDesc: "Sikan angin anggang 120km/h ngening bengi. Mig-report la ring mangatwa king mabilis a pamangatas ning danum king sapa. Kailangan yeng mag-evacuate.",
    evacDirectiveTitle: "Utus Pamag-Evacuate",
    evacDirectiveValue: "MANDATORY / LISAN",
    estWindowTitle: "Tantyang Oras",
    estWindowValue: "~3 anggang 4 A Oras",
    communityVoiceTitle: "Bosis Ning Komunidad",
    unresynthesized: "Tutung Bosis",
    communityVoiceDesc: "🗣️ Mangpadala lang report ring lider gamit ing sarili dang bosis. Ali ya me-edit king AI.",
    verifiedVoice: "BERIPIKADUNG BOSIS",
    officialIntakeTitle: "Opisyal A Balita (PAGASA / NDRRMC)",
    bulletinTitle: "PAGASA Severe Weather Bulletin #14",
    regionalFeed: "Rehiyonal A Balita",
    aiDisclosureTitle: "Pasabi King AI Translation",
    aiDisclosureDesc: "Ing eganaganang gewa ning AI manimuna ya king audio tag:",
    aiAudioTag: '🔊 "PAGASA bulletin, me-translate, ali menibat king barangay yu."',
    testDisclosureBtn: "Testingan Ing Pasabi",
    humanReviewTitle: "Pamanuri Ning Tau (Matas A Peligru)",
    humanReviewDesc: "Kailangan neng suryan ning lokal a Health Worker bago ya ipalwal.",
    verifiedReviewer: "BERIPIKADUNG TAGA-SURI",
    elderReportsTitle: "Mga Balita Ning Matatua",
    communityReportsTitle: "Mga Balita Ning Komunidad",
    reportTitle: "Magpadala Ning Balita",
    reportDesc: "Ipaalam king komunidad ing mga peligro king lugal yu.",
    reportSuccess: "Malampus a naipamiye ing balita!",
    reportNameLabel: "Lagyu (Opsyonal)",
    reportNamePlaceholder: "Anonimo",
    reportLocationLabel: "Lugal",
    reportLocationAuto: "Awtomatiko",
    reportDetailsLabel: "Mga Detalye",
    reportDetailsPlaceholder: "Nanu ing nangyari? Kailangan mu ba ning tulung?",
    voiceRecord: "I-record Ing Bosis",
    stopRecording: "Ipalto Ing Pag-record...",
    submitBtn: "Isumite",
    noElderReports: "Ala pang mga balita manibat king matatua.",
    noCommunityReports: "Ala pang mga balita manibat king komunidad.",
    darkTheme: "Maitum A Tema",
    languageLabel: "Amanu",
    preferencesLabel: "Mga Kagustuan",
    alertTribalConfirm: "Kumpirmasyon Ning Tribal Alert",
    pinnedLabel: "PINNED",
    originalRecording: "Orihinal A Rekording",
    audioReady: "Maganap",
    tabDashboardInfo: "Panguna",
    tabSourcesFeed: "Balita",
    tabReportForm: "I-report",
    tabSupplyMap: "Mapa",
    tabSettings: "Deng Setting",
    appTitle: "Pinoyta: Typhoon Preparation & Recovery App",
    appPurpose: "Metung a aplikasyon ning komunidad para king pamibangon king kalamidad, sasaup kareng tau ban ipaalam ing impormasyon at supply maps kabang bagyo.",
    descDashboard: "Dashboard: Pangkabilugan a kaisipan ning aplikasyon.",
    descSources: "Sources: Mga balita ning komunidad at matatua para update.",
    descReport: "Report: Magpadala balita king peligro o manyad saup.",
    descSupply: "Recovery Map: Interactive a mapa para kareng supply drops.",
    problemsTitle: "Deng Problema",
    prob1: "Kakaligtaan ning gobyerno",
    prob2: "Atyu gap king pamikabalu ning katutubo ampo reng planu ning gobyerno",
    prob3: "Keraklan king komunidad ala lang sapat a pamagaral (makakawani karing modernung komunidad)",
    solutionTitle: "Solusyon",
    sol1: "Mapa ning recovery supply a magpakit kareng pasilidad ba'yung abalu ning komunidad nung nukarin munta at abalu ning gobyerno nung nanu ing ayusan",
    sol2: "Balita manibat kareng Makatua gamit ing boses (magpatibe king tiwala king gobyerno at komunidad)",
    sol3: "Aksyunan deng pasilidad a kailangang ayusan",
    measureTitle: "Panyukad king Tagumpay",
    meas1: "Manyad feedback kareng Makatua",
    meas2: "Bilang da reng mete (quantitative tracking)",
    meas3: "% da reng anyad a pag-evacuate a me-implementa",
    limitTitle: "Deng Limitasyon",
    lim1: "Limitadu ing digital a pasilidad at kabaluan",
    lim2: "Kailangan ing dagdag a training ba'yung aturu ing komunidad na gumamit",
    futureTitle: "Deng Plano king Paintungulan",
    fut1: "Mag-apply para karing pondo ning gobyerno",
    fut2: "Deng alternatibo king GoFundMe king Pilipinas (kalupa ning Daisy, BayanihanPH)",
    registerInfo: "Nung buri mung magparehistro bilang Makatua, Tribal Chief, o Lider ning Komunidad, makipag-ugnayan king officialpinoyta@gmail.com at igawan da kang opisyal a account.",
  },
  pangasinan: {
    statusLine: "Oonla so bagyo. Iseguro iray abong yo tan man-akseb ya onalis ed atagey ya pasen.",
    tabDashboard: "Sources",
    tabSources: "Report",
    tabSupply: "Recovery Map",
    barangayFocus: "Papatarokan A Barangay:",
    confirmedTitle: "AKUMPIRMA NA KONSEHO",
    confirmedSub: "Kinumpirma nen Datu Makusog para ed",
    notConfirmedTitle: "AGNI AKUMPIRMA",
    notConfirmedSub: "Anggapo ni'y lokal a lider ya akakumpirma ed sayan pasakbay.",
    confirmButton: "Kumpirmaen So Pasakbay",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agta Ancestral Domain • Dalan Na Bagyo",
    traditionalWarningTitle: "Pasakbay Na Matatken Tan Sensor",
    traditionalWarningDesc: "Maksil ya dagem ya onabot ed 120km/h natan ya labi. Inkuan na saray matatken a mabilis so itatagey na danum. Nakaukolan lay man-evacuate.",
    evacDirectiveTitle: "Ganggay Pan-Evacuate",
    evacDirectiveValue: "MANDATORY / IYALIS",
    estWindowTitle: "Tantyang Oras",
    estWindowValue: "~3 anggad 4 Ya Oras",
    communityVoiceTitle: "Boses Na Komunidad",
    unresynthesized: "Tuan Boses",
    communityVoiceDesc: "🗣️ Mangipaparawit na report iray lider ed tua ran boses. Ag na-edit na AI.",
    verifiedVoice: "AKUMPIRMAN BOSES",
    officialIntakeTitle: "Opisyal Ya Balita (PAGASA / NDRRMC)",
    bulletinTitle: "PAGASA Severe Weather Bulletin #14",
    regionalFeed: "Rehiyonal Ya Balita",
    aiDisclosureTitle: "Pasakbay Na AI Translation",
    aiDisclosureDesc: "Saray impatalos na AI et onona ed sakey a paka-amta:",
    aiAudioTag: '🔊 "PAGASA bulletin, impatalos, aliwan nanlapud barangay yo."',
    testDisclosureBtn: "Suboken So Pasakbay",
    humanReviewTitle: "Pangsuri Na Too (Atagey Ya Peligro)",
    humanReviewDesc: "Nakaukolan ya surien na Health Worker sakbay i-publish.",
    verifiedReviewer: "AKUMPIRMAN TAGA-SURI",
    elderReportsTitle: "Saray Tanda na Saray Matatken",
    communityReportsTitle: "Saray Tanda na Komunidad",
    reportTitle: "Mangipadara na Tanda",
    reportDesc: "Ipaala ed komunidad iray peligro ed lugar yo.",
    reportSuccess: "Maong ya naipan so tanda!",
    reportNameLabel: "Ngaran (Opsyonal)",
    reportNamePlaceholder: "Anonimo",
    reportLocationLabel: "Lugar",
    reportLocationAuto: "Awtomatiko",
    reportDetailsLabel: "Saray Detalye",
    reportDetailsPlaceholder: "Anto so nagagawa? Nankaukolan ka ba na tulong?",
    voiceRecord: "I-record So Boses",
    stopRecording: "Iuntok So Pag-record...",
    submitBtn: "Isumite",
    noElderReports: "Anggapo ni saray tanda manlapud saray matatken.",
    noCommunityReports: "Anggapo ni saray tanda manlapud komunidad.",
    darkTheme: "Maitom Na Tema",
    languageLabel: "Salita",
    preferencesLabel: "Saray Kagustoan",
    alertTribalConfirm: "Kumpirmasyon Na Tribal Alert",
    pinnedLabel: "PINNED",
    originalRecording: "Orihinal Na Rekording",
    audioReady: "Andam",
    tabDashboardInfo: "Pangulo",
    tabSourcesFeed: "Balita",
    tabReportForm: "I-report",
    tabSupplyMap: "Mapa",
    tabSettings: "Saray Setting",
    appTitle: "Pinoyta: Typhoon Preparation & Recovery App",
    appPurpose: "Sakey ya aplikasyon na komunidad para ed ibabangon ed kalamidad, ontutulong ed saray totoo ya ipaamta so impormasyon tan supply maps no walay bagyo.",
    descDashboard: "Dashboard: Kabuuan ya gagala na aplikasyon.",
    descSources: "Sources: Saray tanda na komunidad tan matatken para ed update.",
    descReport: "Report: Mangipadara na tanda na peligro o onkerew na tulong.",
    descSupply: "Recovery Map: Interactive ya mapa para ed saray supply drops.",
    problemsTitle: "Saray Problema",
    prob1: "Abaliwalaan na gobyerno",
    prob2: "Kulang so pika-kabat ed baetan na saray nankayarian tan saray plano na gobyerno",
    prob3: "Dakel ed komunidad so ag-akaral lapud kulang ed edukasyon (akabiig ed saray modernon komunidad)",
    solutionTitle: "Solusyon",
    sol1: "Mapa na recovery supply ya mangipanengneng na saray pasilidad pian amta na komunidad no iner so laen tan amta na gobyerno no anto so apigeren",
    sol2: "Balita manlapud saray Matatken diad panamegley na boses (mangibangon na talek ed baetan na gobyerno tan komunidad)",
    sol3: "Asikasoen iray pasilidad ya nakaukolan ya apigeren",
    measureTitle: "Pansukat na Itatagey",
    meas1: "Kerewen so feedback na saray Matatken",
    meas2: "Bilang na inatey (quantitative tracking)",
    meas3: "% na kerew ed pan-evacuate ya agawaan",
    limitTitle: "Saray Limitasyon",
    lim1: "Limitado ya digital a pasilidad tan pikakabat",
    lim2: "Nakaukolan na arum ni iran training pian nibangat so komunidad ya mangusar",
    futureTitle: "Saray Plano ed Arapen",
    fut1: "Onkerew na pondo manlapud gobyerno",
    fut2: "Saray alternatibo na GoFundMe ed Pilipinas (singa say Daisy, BayanihanPH)",
    registerInfo: "No labay moy on-rehistro bilang Matatken, Tribal Chief, o Lider na Komunidad, pakikontak so officialpinoyta@gmail.com tan igawaan mi ka na opisyal ya account.",
  }
};

// Language key saved in localStorage for persistence across reloads
const STORAGE_KEY = "app_language";

function getInitialLanguage(): keyof typeof translations {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && Object.keys(translations).includes(saved)) {
      return saved as keyof typeof translations;
    }
  }
  return "english";
}

export default function DisasterApp() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const [language, setLanguage] = useState<keyof typeof translations>(getInitialLanguage);
  const [selectedBarangay, setSelectedBarangay] = useState("san-roque");
  const [isAlertConfirmed, setIsAlertConfirmed] = useState(true);

  // Report Form States
  const [reportName, setReportName] = useState("");
  const [reportLocation, setReportLocation] = useState("");
  const [reportText, setReportText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
  };

  const handleSubmitReport = (e: any) => {
    e.preventDefault();
    if (!reportText && !isRecording && !recordedAudioUrl) return;
    
    const newReport = {
      id: `cr-${Date.now()}`,
      author: reportName || "Anonymous",
      role: "Community Member",
      tag: "Citizen",
      time: "Just now",
      location: reportLocation || "Unknown",
      transcripts: {
        english: reportText || "[Voice Recording Submitted]",
        tagalog: reportText || "[Voice Recording Submitted]",
        bisaya: reportText || "[Voice Recording Submitted]",
        cebuano: reportText || "[Voice Recording Submitted]",
        mamanwa: reportText || "[Voice Recording Submitted]",
        ilocano: reportText || "[Voice Recording Submitted]",
        hiligaynon: reportText || "[Voice Recording Submitted]",
        bicolano: reportText || "[Voice Recording Submitted]",
        waray: reportText || "[Voice Recording Submitted]",
        kapampangan: reportText || "[Voice Recording Submitted]",
        pangasinan: reportText || "[Voice Recording Submitted]"
      },
      dialect: "Local",
      audioUrl: recordedAudioUrl || "",
      verified: false,
      pinned: false
    };

    setCommunityReports(prev => [newReport, ...prev]);

    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
    setReportName("");
    setReportLocation("");
    setReportText("");
    setIsRecording(false);
    handleClearRecording();
  };

  // Audio Playback via Web Speech API
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [loadingAudioId, setLoadingAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || !timeInSeconds) return "0:00";
    const m = Math.floor(timeInSeconds / 60);
    const s = Math.floor(timeInSeconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const elderReports = dbData.elderReports;
  const [communityReports, setCommunityReports] = useState(dbData.communityReports);

  const stopCurrentAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setPlayingAudioId(null);
    setAudioProgress(0);
    setAudioDuration(0);
  };

  const handlePlayAudio = (id: string, transcript: string) => {
    if (playingAudioId === id) {
      stopCurrentAudio();
      return;
    }

    stopCurrentAudio();

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(transcript);
      
      // Match voice to current app language
      const voices = window.speechSynthesis.getVoices();
      
      if (language === 'english') {
        const engVoice = voices.find(v => v.lang.toLowerCase().includes('en-us') || v.lang.toLowerCase().includes('en-gb') || v.lang.toLowerCase().includes('en'));
        if (engVoice) {
          utterance.voice = engVoice;
          utterance.lang = engVoice.lang;
        } else {
          utterance.lang = 'en-US';
        }
      } else {
        // Fallback to Filipino/Indonesian/Spanish for Philippine dialects
        const filipinoVoice = voices.find(v => 
          v.lang.toLowerCase().includes('fil') || 
          v.lang.toLowerCase().includes('ph') || 
          v.lang.toLowerCase().includes('id') || 
          v.lang.toLowerCase().includes('es')
        );
        if (filipinoVoice) {
          utterance.voice = filipinoVoice;
          utterance.lang = filipinoVoice.lang;
        } else {
          utterance.lang = 'fil-PH';
        }
      }
      
      utterance.rate = 0.95;
      
      setPlayingAudioId(id);
      const estDuration = Math.max(2, transcript.length / 12);
      setAudioDuration(estDuration);
      setAudioProgress(0);
      
      utterance.onend = () => {
        stopCurrentAudio();
      };
      
      utterance.onerror = () => {
        stopCurrentAudio();
      };
      
      progressIntervalRef.current = setInterval(() => {
        setAudioProgress(p => p + 0.1);
      }, 100);
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  };;

  const t = translations[language] || translations.english;

  return (
    <div className="min-h-screen bg-[#fcfbf9] dark:bg-[#111827] text-[#1f2937] dark:text-[#f9fafb] flex flex-col transition-colors duration-300">
      
      {/* Sticky Header with Logo & Brand Colors */}
      <header className="w-full border-b border-[#e5e7eb] dark:border-[#1f2937] bg-[#ffffff] dark:bg-[#111827] shadow-xs">
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
              <span className="text-[10px] text-muted-foreground font-semibold tracking-wide">Agta People Network</span>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2">
            
            {/* Desktop Only: Sticky Language Selector */}
            <div className="hidden md:block">
              <Select value={language} onValueChange={(val) => {
                  if (val) {
                    localStorage.setItem("app_language", val);
                    window.location.reload();
                  }
                }}>
                <SelectTrigger className="w-[145px] h-9 text-xs border-[#d1d5db] dark:border-[#374151] bg-white dark:bg-[#1f2937] font-semibold shadow-2xs text-[#111827] dark:text-[#f9fafb]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151]">
                  <SelectItem value="mamanwa">Minamanwa (Native)</SelectItem>
                  <SelectItem value="bisaya">Bisaya</SelectItem>
                  <SelectItem value="cebuano">Cebuano</SelectItem>
                  <SelectItem value="ilocano">Ilocano</SelectItem>
                  <SelectItem value="hiligaynon">Hiligaynon</SelectItem>
                  <SelectItem value="bicolano">Bicolano</SelectItem>
                  <SelectItem value="waray">Waray-Waray</SelectItem>
                  <SelectItem value="kapampangan">Kapampangan</SelectItem>
                  <SelectItem value="pangasinan">Pangasinan</SelectItem>
                  <SelectItem value="tagalog">Tagalog</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Only: Hamburger Menu for Navigation Tabs */}
            <div className="md:hidden block">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger className="h-9 w-9 rounded-md hover:bg-gray-100 dark:hover:bg-[#1f2937] text-gray-700 dark:text-gray-200 inline-flex items-center justify-center transition-colors">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </SheetTrigger>
                <SheetContent side="left" className="bg-white dark:bg-[#111827] border-[#e5e7eb] dark:border-[#1f2937] w-[280px]">
                  <SheetHeader className="mb-6">
                    <SheetTitle className="text-[#0038a8] dark:text-[#60a5fa] font-bold text-left">Navigation</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-2 mt-4">
                    <Button variant={activeTab === "dashboard" ? "default" : "ghost"} className="justify-start w-full text-left" onClick={() => { setActiveTab("dashboard"); setIsMenuOpen(false); }}>
                      <Activity className="mr-2 h-4 w-4 text-[#10b981]" /> {t.tabDashboardInfo}
                    </Button>
                    <Button variant={activeTab === "sources" ? "default" : "ghost"} className="justify-start w-full text-left" onClick={() => { setActiveTab("sources"); setIsMenuOpen(false); }}>
                      <Activity className="mr-2 h-4 w-4 text-[#ce2029]" /> {t.tabSourcesFeed}
                    </Button>
                    <Button variant={activeTab === "report" ? "default" : "ghost"} className="justify-start w-full text-left" onClick={() => { setActiveTab("report"); setIsMenuOpen(false); }}>
                      <Volume2 className="mr-2 h-4 w-4 text-[#0038a8]" /> {t.tabReportForm}
                    </Button>
                    <Button variant={activeTab === "supply" ? "default" : "ghost"} className="justify-start w-full text-left" onClick={() => { setActiveTab("supply"); setIsMenuOpen(false); }}>
                      <Map className="mr-2 h-4 w-4 text-[#eab308]" /> {t.tabSupplyMap}
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Mobile & Desktop: Settings Gear */}
            <Sheet>
              <SheetTrigger className="h-9 w-9 rounded-md hover:bg-gray-100 dark:hover:bg-[#1f2937] text-gray-700 dark:text-gray-200 inline-flex items-center justify-center transition-colors border md:border-transparent md:hover:border-[#e5e7eb] dark:md:hover:border-[#374151]">
                <Settings className="h-5 w-5 md:h-4 md:w-4 text-gray-600 dark:text-gray-300" />
                <span className="sr-only">Settings</span>
              </SheetTrigger>
              <SheetContent className="bg-white dark:bg-[#111827] border-[#e5e7eb] dark:border-[#1f2937] w-[300px]">
                <SheetHeader>
                  <SheetTitle className="text-[#0038a8] dark:text-[#60a5fa] font-bold text-left">{t.preferencesLabel || "Preferences"}</SheetTitle>
                  <SheetDescription className="text-left">Indigenous Community & App Settings</SheetDescription>
                </SheetHeader>
                
                <div className="py-6 space-y-6">
                  {/* Language Selector (Visible in settings for mobile since it's hidden in header) */}
                  <div className="space-y-2 md:hidden">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.languageLabel}</label>
                    <Select value={language} onValueChange={(val) => {
                        if (val) {
                          localStorage.setItem("app_language", val);
                          window.location.reload();
                        }
                      }}>
                      <SelectTrigger className="w-full h-10 text-sm border-[#d1d5db] dark:border-[#374151] bg-white dark:bg-[#1f2937] font-semibold text-[#111827] dark:text-[#f9fafb]">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151]">
                        <SelectItem value="mamanwa">Minamanwa (Native)</SelectItem>
                        <SelectItem value="bisaya">Bisaya</SelectItem>
                        <SelectItem value="cebuano">Cebuano</SelectItem>
                        <SelectItem value="ilocano">Ilocano</SelectItem>
                        <SelectItem value="hiligaynon">Hiligaynon</SelectItem>
                        <SelectItem value="bicolano">Bicolano</SelectItem>
                        <SelectItem value="waray">Waray-Waray</SelectItem>
                        <SelectItem value="kapampangan">Kapampangan</SelectItem>
                        <SelectItem value="pangasinan">Pangasinan</SelectItem>
                        <SelectItem value="tagalog">Tagalog</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Dark Mode */}
                  <div className="pt-4 border-t md:border-none border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <span className="font-medium text-sm flex items-center gap-2">
                      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
                      {t.darkTheme || "Dark Mode"}
                    </span>
                    <Switch 
                      checked={theme === "dark"} 
                      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    />
                  </div>

                  {/* Governance */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">Simulated Governance State</span>
                    <div className="flex items-center justify-between bg-blue-50/50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200/50 dark:border-blue-900/50">
                      <span className="text-xs font-medium">{t.alertTribalConfirm || "Alert Tribal Confirmation"}</span>
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
      </header>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto p-4 max-w-3xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          
          {/* 4 Main Header Tabs */}
          <TabsList className="hidden md:grid w-full grid-cols-4 h-14 mb-6 bg-white/95 dark:bg-[#111827]/95 border border-[#e5e7eb] dark:border-[#1f2937] rounded-xl p-1 shadow-xs">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center justify-center gap-1 sm:gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-[10px] sm:text-sm rounded-lg transition-all"
            >
              <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-[#10b981]" />
              <span className="hidden sm:inline">{t.tabDashboardInfo}</span>
            </TabsTrigger>

            <TabsTrigger 
              value="sources" 
              className="flex items-center justify-center gap-1 sm:gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-[10px] sm:text-sm rounded-lg transition-all"
            >
              <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-[#ce2029]" />
              <span className="hidden sm:inline">{t.tabSourcesFeed}</span>
            </TabsTrigger>

            <TabsTrigger 
              value="report" 
              className="flex items-center justify-center gap-1 sm:gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-[10px] sm:text-sm rounded-lg transition-all"
            >
              <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 text-[#0038a8]" />
              <span className="hidden sm:inline">{t.tabReportForm}</span>
            </TabsTrigger>

            <TabsTrigger 
              value="supply" 
              className="flex items-center justify-center gap-1 sm:gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-[10px] sm:text-sm rounded-lg transition-all"
            >
              <Map className="h-3 w-3 sm:h-4 sm:w-4 text-[#eab308]" />
              <span className="hidden sm:inline">{t.tabSupplyMap}</span>
            </TabsTrigger>


          </TabsList>

          {/* ==================== TAB 0: DASHBOARD ==================== */}
          <TabsContent value="dashboard" className="outline-none">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 mt-4">
              
              <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-sm">
                <CardHeader className="pb-4 border-b border-[#e5e7eb] dark:border-[#374151] bg-[#eff6ff] dark:bg-[#1e3a8a]/20">
                  <div className="flex items-center gap-3">
                    <Activity className="h-6 w-6 text-[#0038a8] dark:text-[#60a5fa]" />
                    <h2 className="text-xl font-bold text-[#0038a8] dark:text-[#60a5fa]">{t.appTitle}</h2>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-[#374151] dark:text-[#d1d5db] leading-relaxed text-sm sm:text-base">
                    {t.appPurpose}
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-[#ce2029]" />
                      <h3 className="font-bold text-[#111827] dark:text-[#f9fafb]">{t.tabSourcesFeed}</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.descSources}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-5 w-5 text-[#0038a8]" />
                      <h3 className="font-bold text-[#111827] dark:text-[#f9fafb]">{t.tabReportForm}</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.descReport}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-sm hover:shadow-md transition-shadow md:col-span-2">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Map className="h-5 w-5 text-[#eab308]" />
                      <h3 className="font-bold text-[#111827] dark:text-[#f9fafb]">{t.tabSupplyMap}</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.descSupply}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Added Dashboard Information Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                
                {/* Problems */}
                <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-sm">
                  <CardHeader className="pb-2 bg-[#fef2f2] dark:bg-[#450a0a]/30 border-b border-[#fee2e2] dark:border-[#7f1d1d]/30">
                    <h3 className="font-bold text-[#b91c1c] dark:text-[#f87171] flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      {t.problemsTitle}
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <li>{t.prob1}</li>
                      <li>{t.prob2}</li>
                      <li>{t.prob3}</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Solution */}
                <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-sm">
                  <CardHeader className="pb-2 bg-[#f0fdf4] dark:bg-[#052e16]/30 border-b border-[#dcfce3] dark:border-[#14532d]/30">
                    <h3 className="font-bold text-[#15803d] dark:text-[#4ade80] flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      {t.solutionTitle}
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <li>{t.sol1}</li>
                      <li>{t.sol2}</li>
                      <li>{t.sol3}</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Measuring Success */}
                <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-sm">
                  <CardHeader className="pb-2 bg-[#eff6ff] dark:bg-[#1e3a8a]/30 border-b border-[#dbeafe] dark:border-[#1e3a8a]/50">
                    <h3 className="font-bold text-[#1d4ed8] dark:text-[#60a5fa] flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      {t.measureTitle}
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <li>{t.meas1}</li>
                      <li>{t.meas2}</li>
                      <li>{t.meas3}</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Limitations */}
                <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-sm">
                  <CardHeader className="pb-2 bg-[#fffbeb] dark:bg-[#78350f]/30 border-b border-[#fef3c7] dark:border-[#92400e]/30">
                    <h3 className="font-bold text-[#b45309] dark:text-[#fbbf24] flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4" />
                      {t.limitTitle}
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <li>{t.lim1}</li>
                      <li>{t.lim2}</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Future Implementations */}
                <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-sm md:col-span-2">
                  <CardHeader className="pb-2 bg-[#faf5ff] dark:bg-[#4c1d95]/30 border-b border-[#f3e8ff] dark:border-[#5b21b6]/30">
                    <h3 className="font-bold text-[#7e22ce] dark:text-[#c084fc] flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      {t.futureTitle}
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <li>{t.fut1}</li>
                      <li>{t.fut2}</li>
                    </ul>
                  </CardContent>
                </Card>

              </div>

              {/* Registration Notice */}
              <div className="mt-6">
                <Card className="bg-[#eff6ff] dark:bg-[#1e3a8a]/20 border-[#bfdbfe] dark:border-[#1e3a8a] shadow-sm">
                  <CardContent className="pt-6 pb-6 flex items-start gap-3">
                    <UserCheck className="h-5 w-5 text-[#0038a8] dark:text-[#60a5fa] shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-[#1e3a8a] dark:text-[#bfdbfe] leading-relaxed">
                      {t.registerInfo}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Dashboard Footer */}
              <div className="mt-8 pt-6 border-t border-[#e5e7eb] dark:border-[#374151] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div>
                  &copy; {new Date().getFullYear()} Pinoyta. All rights reserved.
                </div>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 bg-[#eff6ff] dark:bg-[#1e3a8a]/30 text-[#0038a8] dark:text-[#60a5fa] rounded-full text-xs font-bold border border-[#bfdbfe] dark:border-[#1e3a8a]">
                    NGO Initiative
                  </span>
                  <span className="px-2.5 py-1 bg-[#fffbeb] dark:bg-[#78350f]/30 text-[#b45309] dark:text-[#fbbf24] rounded-full text-xs font-bold border border-[#fef3c7] dark:border-[#92400e]/30">
                    Prototype
                  </span>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* ==================== TAB 1: SOURCES ==================== */}
          <TabsContent value="sources" className="outline-none">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8 mt-4">
            
            {/* --- ELDER REPORTS SECTION --- */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="h-5 w-5 text-[#b45309]" />
                <h2 className="text-lg font-bold text-[#111827] dark:text-[#f9fafb]">{t.elderReportsTitle}</h2>
              </div>
              <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-2xs">
                <CardHeader className="pb-3 border-b border-[#e5e7eb] dark:border-[#374151] bg-[#f9fafb] dark:bg-[#111827]/50">
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {t.communityVoiceDesc}
                  </p>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {elderReports.map((item) => (
                    <div key={item.id} className={`p-3.5 rounded-xl border ${item.pinned ? 'bg-[#fffbeb] dark:bg-[#422006]/30 border-2 border-[#fbbf24] dark:border-[#b45309]' : 'border-[#e5e7eb] dark:border-[#374151] bg-[#f9fafb] dark:bg-[#111827]'} space-y-3 relative overflow-hidden`}>
                      {item.pinned && (
                        <div className="absolute top-0 right-0 bg-[#fbbf24] text-amber-950 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1">
                          <Pin className="h-3 w-3" /> {t.pinnedLabel}
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
                        "{(item.transcripts as any)[language] || item.transcripts.english}"
                      </p>

                      {/* Voice Player */}
                      <div className={`flex items-center gap-3 p-2.5 rounded-lg border ml-11 ${item.pinned ? 'bg-white/50 dark:bg-black/20 border-[#fbbf24]/50' : 'bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151]'}`}>
                        <Button
                          size="icon"
                          onClick={() => handlePlayAudio(item.id, (item.transcripts as any)[language] || item.transcripts.english)}
                          className="h-8 w-8 rounded-full bg-[#ce2029] hover:bg-[#b91c1c] text-white shrink-0 shadow-2xs"
                        >
                          {loadingAudioId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : playingAudioId === item.id ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
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
                    </div>
                  ))}
                  {elderReports.length === 0 && (
                    <div className="text-center p-4 text-sm text-gray-500">{t.noElderReports}</div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* --- COMMUNITY REPORTS SECTION --- */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-[#ce2029]" />
                <h2 className="text-lg font-bold text-[#111827] dark:text-[#f9fafb]">{t.communityReportsTitle}</h2>
              </div>
              <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-2xs">
                <CardContent className="p-4 space-y-4">
                  {communityReports.map((item) => (
                    <div key={item.id} className={`p-3.5 rounded-xl border ${item.pinned ? 'bg-[#fffbeb] dark:bg-[#422006]/30 border-2 border-[#fbbf24] dark:border-[#b45309]' : 'border-[#e5e7eb] dark:border-[#374151] bg-[#f9fafb] dark:bg-[#111827]'} space-y-3 relative overflow-hidden`}>
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
                        "{(item.transcripts as any)[language] || item.transcripts.english}"
                      </p>

                      {/* Voice Player */}
                      <div className={`flex items-center gap-3 p-2.5 rounded-lg border ml-11 ${item.pinned ? 'bg-white/50 dark:bg-black/20 border-[#fbbf24]/50' : 'bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151]'}`}>
                        <Button
                          size="icon"
                          onClick={() => handlePlayAudio(item.id, (item.transcripts as any)[language] || item.transcripts.english)}
                          className="h-8 w-8 rounded-full bg-[#ce2029] hover:bg-[#b91c1c] text-white shrink-0 shadow-2xs"
                        >
                          {loadingAudioId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : playingAudioId === item.id ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
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
                    </div>
                  ))}
                  {communityReports.length === 0 && (
                    <div className="text-center p-4 text-sm text-gray-500">{t.noCommunityReports}</div>
                  )}
                </CardContent>
              </Card>
            </div>

            </motion.div>
          </TabsContent>

          {/* ==================== TAB 2: REPORT (SUBMIT FORM) ==================== */}
          <TabsContent value="report" className="outline-none">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
              {/* Submit Report Form */}
              <Card className="mt-6 bg-[#f8fafc] dark:bg-[#111827] border-[#e2e8f0] dark:border-[#1e293b] shadow-inner">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-[#111827] dark:text-[#f9fafb]">{t.reportTitle}</CardTitle>
                  <CardDescription className="text-xs">{t.reportDesc}</CardDescription>
                </CardHeader>
                <CardContent>
                  {submitSuccess ? (
                    <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-lg flex items-center justify-center gap-2 font-bold animate-in fade-in zoom-in duration-300">
                      <CheckCircle2 className="h-5 w-5" /> {t.reportSuccess}
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitReport} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">{t.reportNameLabel}</label>
                          <input 
                            type="text" 
                            placeholder={t.reportNamePlaceholder}
                            value={reportName}
                            onChange={(e) => setReportName(e.target.value)}
                            className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#0038a8]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase flex justify-between">
                            {t.reportLocationLabel} *
                            <button type="button" onClick={handleGetLocation} className="text-[#0038a8] hover:underline flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {t.reportLocationAuto}
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
                        <label className="text-[10px] font-bold text-gray-500 uppercase">{t.reportDetailsLabel}</label>
                        <textarea 
                          rows={3}
                          placeholder={t.reportDetailsPlaceholder}
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
                          <Send className="h-4 w-4 mr-2" /> {t.submitBtn}
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ==================== TAB 3: RECOVERY / SUPPLY MAP ==================== */}
          <TabsContent value="supply" className="outline-none">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="space-y-4">
            <SupplyLiveMap />
          </motion.div>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}
