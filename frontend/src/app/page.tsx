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
import { AlertTriangle, CheckCircle2, Play, Pause, Activity, Map, Settings, Volume2, ShieldAlert, FileText, UserCheck, Mic, HelpCircle, Sun, Star, Send, Pin, Menu, MapPin, Trash2 } from "lucide-react";
import SupplyLiveMap from "@/components/supply-map";

const translations = {
  mamanwa: {
    statusLine: "Mataas ang suba ug kusog ang hangin. Pag-andam kamo sa pagbalhin sa taas nga dapit.",
    tabDashboard: "Main Dashboard",
    tabSources: "Sources",
    tabSupply: "Recovery Map",
    barangayFocus: "Barangay Focus:",
    confirmedTitle: "CONFIRMED BY TRIBAL COUNCIL",
    confirmedSub: "Verified by Datu Makusog for",
    notConfirmedTitle: "NOT YET CONFIRMED",
    notConfirmedSub: "No local leader has confirmed the current alert for this area yet.",
    confirmButton: "Confirm Alert",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agusan-Surigao Upland Zone • Typhoon Track",
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
  },
  bisaya: {
    statusLine: "Nagka-duol ang bagyo. Siguroha ang inyong mga balay ug pangandam sa pag-bakwit sa taas nga dapit.",
    tabDashboard: "Pangunang Dashboard",
    tabSources: "Mga Gikanan",
    tabSupply: "Mapa sa Tabang",
    barangayFocus: "Gipunting nga Barangay:",
    confirmedTitle: "GIKUMPIRMA SA KATAWHANG TRIBAL",
    confirmedSub: "Gikumpirma ni Datu Makusog alang sa",
    notConfirmedTitle: "WALA PA GIKUMPIRMA",
    notConfirmedSub: "Wala pay lokal nga lider nga nagkumpirma sa pahidaan sa kining dapita.",
    confirmButton: "Kumpirmaha ang Alert",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Sona sa Kabukiran sa Agusan-Surigao • Dagan sa Bagyo",
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
  },
  tagalog: {
    statusLine: "Papalapit ang bagyo. Iseguro ang mga tahanan at maghandang lumipat sa mataas na lugar.",
    tabDashboard: "Pangunahing Dashboard",
    tabSources: "Pinagmulan ng Balita",
    tabSupply: "Mapa ng Tulong",
    barangayFocus: "Nakatutok sa Barangay:",
    confirmedTitle: "KUMPIRMADO NG KONSEHO NG IP/KATUTUBO",
    confirmedSub: "Kinumpirma ni Datu Makusog para sa",
    notConfirmedTitle: "HINDI PA KUMPIRMADO",
    notConfirmedSub: "Wala pang lokal na pinuno na nagpapatunay sa babalang ito para sa lugar na ito.",
    confirmButton: "Kumpirmahin ang Babala",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agusan-Surigao Upland Zone • Sundan ang Bagyo",
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
  },
  english: {
    statusLine: "Typhoon approaching. Secure homes and prepare to move to high ground.",
    tabDashboard: "Main Dashboard",
    tabSources: "Sources",
    tabSupply: "Recovery Map",
    barangayFocus: "Barangay Focus:",
    confirmedTitle: "CONFIRMED BY TRIBAL COUNCIL",
    confirmedSub: "Verified by Datu Makusog for",
    notConfirmedTitle: "NOT YET CONFIRMED",
    notConfirmedSub: "No local leader has confirmed the current alert for this area yet.",
    confirmButton: "Confirm Alert",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agusan-Surigao Upland Zone • Typhoon Track",
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
  },
  cebuano: {
    statusLine: "Nagka-duol ang bagyo. Siguroha ang inyong mga balay ug pangandam sa pag-bakwit sa taas nga dapit.",
    tabDashboard: "Pangunang Dashboard",
    tabSources: "Mga Tinubdan",
    tabSupply: "Mapa sa Tabang",
    barangayFocus: "Gipunting nga Barangay:",
    confirmedTitle: "GIKUMPIRMA SA KONSEHO SA TRIBAL",
    confirmedSub: "Gikumpirma ni Datu Makusog alang sa",
    notConfirmedTitle: "WALA PA GIKUMPIRMA",
    notConfirmedSub: "Wala pay lokal nga lider nga nagkumpirma sa pahimangno niining dapita.",
    confirmButton: "Kumpirmaha ang Alert",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agusan-Surigao Upland Zone • Dagan sa Bagyo",
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
    verifiedReviewer: "GIKUMPIRMA NGA NAGTAN-AW"
  },
  ilocano: {
    statusLine: "Umay ti bagyo. I-sigurado dagiti balay yo ken agsagana nga mapan iti nangato a lugar.",
    tabDashboard: "Kangrunaan a Dashboard",
    tabSources: "Paggapuan Ti Damag",
    tabSupply: "Mapa Ti Tulong",
    barangayFocus: "Nakatutukan a Barangay:",
    confirmedTitle: "KINUMPIRMA TI KONSEHO TI IP",
    confirmedSub: "Kinumpirma ni Datu Makusog para iti",
    notConfirmedTitle: "SAAN PAY A KINUMPIRMA",
    notConfirmedSub: "Awan pay ti lokal a dadaulo a nangpasingked iti daytoy a pakaammo.",
    confirmButton: "Kumpirmaen Ti Alert",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agusan-Surigao Upland Zone • Dalan Ti Bagyo",
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
    verifiedReviewer: "NAPASINGKEDAN A NANGSURI"
  },
  hiligaynon: {
    statusLine: "Hapit na ang bagyo. Siguraduha ang inyo mga balay kag maghanda sa pag-evacuate sa mataas nga lugar.",
    tabDashboard: "Pangunang Dashboard",
    tabSources: "Ginhalinan Sang Impormasyon",
    tabSupply: "Mapa Sang Bulig",
    barangayFocus: "Ginapokus Nga Barangay:",
    confirmedTitle: "GINKUMPIRMAR SANG KONSEHO",
    confirmedSub: "Ginkumpirmar ni Datu Makusog para sa",
    notConfirmedTitle: "WALA PA GINKUMPIRMAR",
    notConfirmedSub: "Wala pa sang lokal nga lider nga nagkumpirmar sini nga paandam.",
    confirmButton: "Kumpirmaha Ang Paandam",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agusan-Surigao Upland Zone • Alagyan Sang Bagyo",
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
    verifiedReviewer: "GINKUMPIRMAR NGA TAGA-USISA"
  },
  bicolano: {
    statusLine: "Haranihon na ang bagyo. Seguruhon ang mga harong asin mag-andam sa pagbalyo sa halangkaw na lugar.",
    tabDashboard: "Panginot na Dashboard",
    tabSources: "Mga Ginikanan nin Bareta",
    tabSupply: "Mapa nin Tabang",
    barangayFocus: "Tinututukan na Barangay:",
    confirmedTitle: "KUMPIRMADO KAN KONSEHO",
    confirmedSub: "Kinumpirma ni Datu Makusog para sa",
    notConfirmedTitle: "DAI PA KUMPIRMADO",
    notConfirmedSub: "Mayong lokal na lider an nagkumpirma kan patanid na ini.",
    confirmButton: "Kumpirmahon an Patanid",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agusan-Surigao Upland Zone • Dalan kan Bagyo",
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
    verifiedReviewer: "BERIPIKADONG TAGA-SURI"
  },
  waray: {
    statusLine: "Ti-arabot na iton bagyo. Siguruha iton iyo mga balay ngan pag-andam ha pagbakwit ngadto ha hitaas nga lugar.",
    tabDashboard: "Pangunahon nga Dashboard",
    tabSources: "Gintikangan Han Impormasyon",
    tabSupply: "Mapa Han Bulig",
    barangayFocus: "Nakatutok nga Barangay:",
    confirmedTitle: "KUMPIRMADO HAN KONSEHO",
    confirmedSub: "Ginkumpirma ni Datu Makusog para ha",
    notConfirmedTitle: "WARAY PA KUMPIRMAHA",
    notConfirmedSub: "Waray pa lokal nga lider nga nagkumpirma hini nga pahibaro.",
    confirmButton: "Kumpirmaha Iton Alert",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agusan-Surigao Upland Zone • Dalan Han Bagyo",
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
    verifiedReviewer: "KUMPIRMADO NGA TAGA-SUSI"
  },
  kapampangan: {
    statusLine: "Darating ne ing bagyu. Siguradwan yo ring bale yo at magsadya kayong lumipat king matas a lugal.",
    tabDashboard: "Pun Dashboard",
    tabSources: "Pikukwanan Balita",
    tabSupply: "Mapa Ning Saup",
    barangayFocus: "Pakatalukyan A Barangay:",
    confirmedTitle: "KUMPIRMÁDU NING KONSEHO",
    confirmedSub: "Kinumpirma neng Datu Makusog para king",
    notConfirmedTitle: "ALI PA KUMPIRMÁDU",
    notConfirmedSub: "Ala pang lokal a pamuntuk a mikumpirma kening babala.",
    confirmButton: "Kumpirman Ya Ing Babala",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agusan-Surigao Upland Zone • Dalan Ning Bagyu",
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
    verifiedReviewer: "BERIPIKADUNG TAGA-SURI"
  },
  pangasinan: {
    statusLine: "Oonla so bagyo. Iseguro iray abong yo tan man-akseb ya onalis ed atagey ya pasen.",
    tabDashboard: "Manunot A Dashboard",
    tabSources: "Pama-nengnengan Na Balita",
    tabSupply: "Mapa Na Tulong",
    barangayFocus: "Papatarokan A Barangay:",
    confirmedTitle: "AKUMPIRMA NA KONSEHO",
    confirmedSub: "Kinumpirma nen Datu Makusog para ed",
    notConfirmedTitle: "AGNI AKUMPIRMA",
    notConfirmedSub: "Anggapo ni'y lokal a lider ya akakumpirma ed sayan pasakbay.",
    confirmButton: "Kumpirmaen So Pasakbay",
    signalTitle: "Barangay Signal Level 3",
    signalSub: "Agusan-Surigao Upland Zone • Dalan Na Bagyo",
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
    verifiedReviewer: "AKUMPIRMAN TAGA-SURI"
  }
};

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function DisasterApp() {
  const { setTheme, theme } = useTheme();
  const [language, setLanguage] = useState<keyof typeof translations>("english");
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
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
    setReportName("");
    setReportLocation("");
    setReportText("");
    setIsRecording(false);
    handleClearRecording();
  };

  // Audio Playback states for simulation
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [communityMessages, setCommunityMessages] = useState<any[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || !timeInSeconds) return "0:00";
    const m = Math.floor(timeInSeconds / 60);
    const s = Math.floor(timeInSeconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Fetch mock messages from Mistral API backend
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/community-messages?lang=${language}`);
        const data = await res.json();
        setCommunityMessages(data);
      } catch (e) {
        console.error("Failed to fetch community messages", e);
      }
    };
    fetchMessages();
  }, [language]);

  const handlePlayAudio = (id: string, audioUrl?: string) => {
    if (playingAudioId === id) {
      // Pause
      setPlayingAudioId(null);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      // Play new
      setPlayingAudioId(id);
      if (audioUrl) {
        const fullAudioUrl = audioUrl.startsWith('/') ? `${BACKEND_URL}${audioUrl}` : audioUrl;
        if (!audioRef.current) {
          audioRef.current = new Audio(fullAudioUrl);
        } else {
          audioRef.current.src = fullAudioUrl;
        }
        
        setAudioProgress(0);
        setAudioDuration(0);
        
        audioRef.current.ontimeupdate = () => {
          setAudioProgress(audioRef.current?.currentTime || 0);
        };
        audioRef.current.onloadedmetadata = () => {
          setAudioDuration(audioRef.current?.duration || 0);
        };
        audioRef.current.onended = () => {
          setPlayingAudioId(null);
          setAudioProgress(0);
        };

        audioRef.current.play();
      }
    }
  };

  const t = translations[language] || translations.english;

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

          {/* Desktop: Sticky Language Selector & Settings */}
          <div className="hidden md:flex items-center gap-2">
            <Select value={language} onValueChange={(val) => val && setLanguage(val as keyof typeof translations)}>
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

          {/* Mobile: Hamburger Menu */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger className="h-9 w-9 rounded-md hover:bg-gray-100 dark:hover:bg-[#1f2937] text-gray-700 dark:text-gray-200 inline-flex items-center justify-center transition-colors">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </SheetTrigger>
              <SheetContent className="bg-white dark:bg-[#111827] border-[#e5e7eb] dark:border-[#1f2937] w-[280px]">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-[#0038a8] dark:text-[#60a5fa] font-bold text-left">App Menu</SheetTitle>
                </SheetHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Language</label>
                    <Select value={language} onValueChange={(val) => val && setLanguage(val as keyof typeof translations)}>
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

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Preferences</label>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Dark Theme</span>
                      <Switch 
                        checked={theme === "dark"} 
                        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Simulated Governance State</span>
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
        

      </header>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto p-4 max-w-3xl">
        <Tabs defaultValue="dashboard" className="w-full">
          
          {/* 3 Main Header Tabs */}
          <TabsList className="grid w-full grid-cols-3 h-14 mb-6 sticky top-[104px] z-40 bg-white/95 dark:bg-[#111827]/95 backdrop-blur shadow-xs border border-[#e5e7eb] dark:border-[#1f2937] rounded-xl p-1">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center justify-center gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-xs sm:text-sm rounded-lg transition-all"
            >
              <Activity className="h-4 w-4 text-[#ce2029]" />
              <span>{t.tabDashboard}</span>
            </TabsTrigger>

            <TabsTrigger 
              value="sources" 
              className="flex items-center justify-center gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-xs sm:text-sm rounded-lg transition-all"
            >
              <Volume2 className="h-4 w-4 text-[#0038a8]" />
              <span>{t.tabSources}</span>
            </TabsTrigger>

            <TabsTrigger 
              value="supply" 
              className="flex items-center justify-center gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-xs sm:text-sm rounded-lg transition-all"
            >
              <Map className="h-4 w-4 text-[#eab308]" />
              <span>{t.tabSupply}</span>
            </TabsTrigger>
          </TabsList>

          {/* ==================== TAB 1: MAIN DASHBOARD ==================== */}
          <TabsContent value="dashboard" className="outline-none">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-4">
            
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
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
          </TabsContent>

          {/* ==================== TAB 2: SOURCES (COMMUNITY + OFFICIAL INTAKE) ==================== */}
          <TabsContent value="sources" className="outline-none">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
            
            {/* 1. Community Intake */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base flex items-center gap-2 text-[#111827] dark:text-[#f9fafb]">
                  <Mic className="h-5 w-5 text-[#ce2029]" /> {t.communityVoiceTitle}
                </h3>
                <Badge variant="outline" className="text-[11px] font-bold border-[#ce2029]/30 text-[#ce2029] bg-[#fff1f2] dark:bg-[#881337]/20">
                  {t.unresynthesized}
                </Badge>
              </div>

              <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-2xs">
                <CardHeader className="pb-3 border-b border-[#e5e7eb] dark:border-[#374151] bg-[#f9fafb] dark:bg-[#111827]/50">
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {t.communityVoiceDesc}
                  </p>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {communityMessages.map((item) => (
                    <div key={item.id} className="p-3.5 rounded-xl border border-[#e5e7eb] dark:border-[#374151] bg-[#f9fafb] dark:bg-[#111827] space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-9 w-9 border border-[#0038a8]">
                            <AvatarFallback className="bg-[#0038a8] text-white text-xs font-bold">{item.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold leading-none">{item.author}</span>
                              <Badge className="bg-[#eff6ff] text-[#0038a8] dark:bg-[#1e3a8a] dark:text-[#93c5fd] border-none text-[9px] font-bold px-1.5 py-0 h-4">
                                {item.dialect}
                              </Badge>
                            </div>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-1 leading-none">{item.role} • {item.time}</span>
                          </div>
                        </div>
                        {item.verified && (
                          <span className="text-[10px] font-bold text-[#2563eb] dark:text-[#60a5fa] flex items-center gap-1 bg-[#eff6ff] dark:bg-[#1e3a8a]/50 px-2 py-1 rounded-md shrink-0">
                            <CheckCircle2 className="h-3 w-3 text-[#2563eb]" /> {t.verifiedVoice}
                          </span>
                        )}
                      </div>

                      {/* Text Post Above Audio */}
                      <p className="text-sm text-[#111827] dark:text-[#f9fafb] font-medium leading-relaxed pl-11">
                        "{item.transcript}"
                      </p>

                      {/* Voice Player */}
                      <div className="flex items-center gap-3 bg-white dark:bg-[#1f2937] p-2.5 rounded-lg border border-[#e5e7eb] dark:border-[#374151] ml-11">
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
                            <span>{playingAudioId === item.id ? `📍 ${selectedBarangay.replace('-', ' ').toUpperCase()}` : "Ready"}</span>
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
                  {communityMessages.length === 0 && (
                    <div className="text-center p-4 text-sm text-gray-500">Loading community voices...</div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 2. Official Intake & AI Disclosures */}
            <div>
              <h3 className="font-bold text-base flex items-center gap-2 mb-3 text-[#111827] dark:text-[#f9fafb]">
                <ShieldAlert className="h-5 w-5 text-[#0038a8]" /> {t.officialIntakeTitle}
              </h3>

              <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-2xs">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#0038a8]" />
                      <span className="text-xs font-bold">{t.bulletinTitle}</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] border-[#0038a8] text-[#0038a8] bg-[#eff6ff] dark:bg-[#1e3a8a]/30 font-bold">
                      {t.regionalFeed}
                    </Badge>
                  </div>

                  {/* AI Spoken Tag Disclosure */}
                  <div className="p-3.5 bg-[#fefce8] dark:bg-[#422006]/30 border border-[#fef08a] dark:border-[#713f12] rounded-xl space-y-2">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4 text-[#ca8a04] shrink-0" />
                      <p className="text-xs font-bold text-[#854d0e] dark:text-[#fde047]">
                        {t.aiDisclosureTitle}
                      </p>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      {t.aiDisclosureDesc}
                    </p>
                    <div className="p-2 bg-white dark:bg-[#111827] rounded-md border border-[#fef08a] dark:border-[#713f12] text-xs font-mono text-[#0038a8] dark:text-[#60a5fa] font-bold">
                      {t.aiAudioTag}
                    </div>

                    <Button
                      size="sm"
                      onClick={() => handlePlayAudio("official-ai")}
                      className="mt-2 bg-[#0038a8] hover:bg-[#1d4ed8] text-white text-xs h-8 font-bold"
                    >
                      {playingAudioId === "official-ai" ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1 fill-current" />}
                      {t.testDisclosureBtn}
                    </Button>
                  </div>

                  {/* Human Review Threshold */}
                  <div className="p-3.5 bg-[#eff6ff] dark:bg-[#1e3a8a]/30 border border-[#bfdbfe] dark:border-[#1e40af] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0038a8] dark:text-[#60a5fa] flex items-center gap-1.5">
                        <UserCheck className="h-4 w-4 text-[#2563eb]" /> {t.humanReviewTitle}
                      </span>
                      <Badge className="bg-[#2563eb] text-white text-[10px] font-bold">{t.verifiedReviewer}</Badge>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      {t.humanReviewDesc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

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
