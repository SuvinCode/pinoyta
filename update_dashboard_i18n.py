with open("frontend/src/app/page.tsx", "r") as f:
    content = f.read()

# All audioReady line numbers and what follows them, grouped by language
# We'll insert new keys AFTER each audioReady line

# Language data: (audioReady_value, new_keys_dict)
lang_data = {
    "mamanwa": {
        "audioReady_val": "Andam",
        "dashboardTitle": "Dashboard",
        "appTagline": "Paghanda ug Pagbawi sa Bagyo",
        "appAbout": "Ang Pinoyta usa ka plataporma para sa paghanda ug pagbawi sa bagyo nga gitukod alang sa mga katutubo nga Agta. Giuna namo ang grassroots nga voice reporting ug multilingual nga accessibility.",
        "tabDashboard": "Mga Tinubdan",
        "tabSources": "Magtaho",
        "tabSupply": "Mapa sa Pagbawi",
        "tabSourcesDesc": "Mga taho sa peligro, baha, ug emergency gikan sa mga katigulangan ug komunidad.",
        "tabReportDesc": "Isumite ang imong kaugalingong taho pinaagi sa teksto o tingog bahin sa kahimtang sa inyong lugar.",
        "tabMapDesc": "Pangitaa ang pinakalapit nga relief center, supply point, ug evacuation route.",
    },
    "bisaya": {
        "audioReady_val": "Andam",
        "dashboardTitle": "Dashboard",
        "appTagline": "Paghanda ug Pagbawi sa Bagyo",
        "appAbout": "Ang Pinoyta usa ka community-driven nga plataporma alang sa paghanda ug pagbawi sa bagyo nga gitukod alang sa mga katutubo nga Agta. Giuna namo ang grassroots nga voice reporting ug multilingual nga accessibility.",
        "tabDashboard": "Mga Tinubdan",
        "tabSources": "Magtaho",
        "tabSupply": "Mapa sa Pagbawi",
        "tabSourcesDesc": "Mga taho sa peligro, baha, ug emergency mula sa mga katigulangan ug komunidad.",
        "tabReportDesc": "Isumite ang imong kaugalingong taho pinaagi sa teksto o tingog bahin sa kahimtang sa inyong lugar.",
        "tabMapDesc": "Pangitaa ang pinakalapit nga relief center, supply point, ug evacuation route.",
    },
    "tagalog": {
        "audioReady_val": "Handa",
        "dashboardTitle": "Dashboard",
        "appTagline": "App para sa Paghahanda at Pagbabawi sa Bagyo",
        "appAbout": "Ang Pinoyta ay isang community-driven na plataporma para sa paghahanda at pagbabawi sa bagyo na itinayo para sa mga katutubo ng Agta. Inuuna namin ang grassroots na pag-uulat at multilingual na accessibility.",
        "tabDashboard": "Mga Pinagkukunan",
        "tabSources": "Mag-ulat",
        "tabSupply": "Mapa ng Pagbabawi",
        "tabSourcesDesc": "Mga ulat ng panganib, baha, at emergency mula sa mga matatanda at komunidad.",
        "tabReportDesc": "Isumite ang iyong sariling ulat sa pamamagitan ng text o boses tungkol sa mga kondisyon sa inyong lugar.",
        "tabMapDesc": "Hanapin ang pinakamalapit na relief center, supply point, at evacuation route.",
    },
    "english": {
        "audioReady_val": "Ready",
        "dashboardTitle": "Dashboard",
        "appTagline": "Typhoon Preparation & Recovery App",
        "appAbout": "Pinoyta is a community-driven typhoon preparedness and recovery platform built for indigenous Agta communities. We prioritize grassroots voice reporting and multilingual accessibility.",
        "tabDashboard": "Sources",
        "tabSources": "Report",
        "tabSupply": "Recovery Map",
        "tabSourcesDesc": "Community and elder reports of hazards, flooding, and emergency updates from your area.",
        "tabReportDesc": "Submit your own text or voice report about current conditions in your area.",
        "tabMapDesc": "Find the nearest relief centers, supply points, and evacuation routes near you.",
    },
    "cebuano": {
        "audioReady_val": "Andam",
        "dashboardTitle": "Dashboard",
        "appTagline": "Paghanda ug Pagbawi sa Bagyo",
        "appAbout": "Ang Pinoyta usa ka community-driven nga plataporma alang sa paghanda ug pagbawi sa bagyo nga gitukod alang sa mga katutubo nga Agta.",
        "tabDashboard": "Mga Tinubdan",
        "tabSources": "Magtaho",
        "tabSupply": "Mapa sa Pagbawi",
        "tabSourcesDesc": "Mga taho sa peligro, baha, ug emergency gikan sa mga katigulangan ug komunidad.",
        "tabReportDesc": "Isumite ang imong kaugalingong taho pinaagi sa teksto o tingog.",
        "tabMapDesc": "Pangitaa ang pinakalapit nga relief center, supply point, ug evacuation route.",
    },
    "ilocano": {
        "audioReady_val": "Naanay",
        "dashboardTitle": "Dashboard",
        "appTagline": "App ti Pannakaipan iti Bagyo ken Pannakabawi",
        "appAbout": "Ti Pinoyta ket community-driven a plataporma para iti pannakaipan iti bagyo ken pannakabawi a napabalin para iti naindigenous nga Agta a komunidad.",
        "tabDashboard": "Mga Pagkuanan",
        "tabSources": "Agpaaramat",
        "tabSupply": "Mapa ti Pannakabawi",
        "tabSourcesDesc": "Pakaammo maipapan kadagiti peligro, layus, ken emergency manipud kadagiti lallakay ken komunidad.",
        "tabReportDesc": "Ipan ti bukod mo a pakaammo babaen iti teksto wenno boses maipapan iti kasasaad iti lugar yo.",
        "tabMapDesc": "Birokna ti naranay a relief center, supply point, ken evacuation route.",
    },
    "hiligaynon": {
        "audioReady_val": "Handa",
        "dashboardTitle": "Dashboard",
        "appTagline": "App sa Paghanda kag Pagbawi sa Bagyo",
        "appAbout": "Ang Pinoyta isa ka community-driven nga plataporma para sa paghanda kag pagbawi sa bagyo nga natukod para sa mga katutubo nga Agta.",
        "tabDashboard": "Mga Tinubdan",
        "tabSources": "Mag-report",
        "tabSupply": "Mapa sang Pagbawi",
        "tabSourcesDesc": "Mga taho sang peligro, baha, kag emergency gikan sa mga kamagurangan kag komunidad.",
        "tabReportDesc": "Isumite ang imo kaugalingon nga taho paagi sa teksto o tingog bahin sa kahimtang sa inyo lugar.",
        "tabMapDesc": "Pangitaa ang pinakamalapit nga relief center, supply point, kag evacuation route.",
    },
    "bicolano": {
        "audioReady_val": "Handa",
        "dashboardTitle": "Dashboard",
        "appTagline": "App para sa Paghanda asin Pagbalik sa Bagyo",
        "appAbout": "Ang Pinoyta usa na community-driven na plataporma para sa paghanda asin pagbalik sa bagyo na itinatag para sa saindong katutubo na Agta.",
        "tabDashboard": "Mga Pinagkukunan",
        "tabSources": "Mag-report",
        "tabSupply": "Mapa kan Pagbalik",
        "tabSourcesDesc": "Mga bareta kan peligro, baha, asin emergency hali sa mga gurang asin komunidad.",
        "tabReportDesc": "Isumite an saindong bareta paagi sa teksto o boses maipapan sa kahimtang sa saindong lugar.",
        "tabMapDesc": "Hanapon an pinakamalapit na relief center, supply point, asin evacuation route.",
    },
    "waray": {
        "audioReady_val": "Andam",
        "dashboardTitle": "Dashboard",
        "appTagline": "App para ha Paghanda ug Pagbawi han Bagyo",
        "appAbout": "An Pinoyta usa ka community-driven nga plataporma para ha paghanda ug pagbawi han bagyo nga itinukod para ha mga katutubo nga Agta.",
        "tabDashboard": "Mga Tinubdan",
        "tabSources": "Mag-report",
        "tabSupply": "Mapa Han Pagbawi",
        "tabSourcesDesc": "Mga sumat han peligro, baha, ug emergency tikang ha mga katigulangan ug komunidad.",
        "tabReportDesc": "Isumite an iyo sariling sumat paagi ha teksto o tingog bahin ha kahimtang han iyo lugar.",
        "tabMapDesc": "Pangita an pinakamalapit nga relief center, supply point, ug evacuation route.",
    },
    "kapampangan": {
        "audioReady_val": "Maganap",
        "dashboardTitle": "Dashboard",
        "appTagline": "App para king Pamiharap ug Panyabyan king Bagyo",
        "appAbout": "Ing Pinoyta metung yang community-driven a plataporma para king pamiharap ug panyabyan king bagyo a iniatag para kadang katutubo a Agta.",
        "tabDashboard": "Mga Pinggagawan",
        "tabSources": "Mag-report",
        "tabSupply": "Mapa ning Panyabyan",
        "tabSourcesDesc": "Mga balita maipapan kadang peligro, baha, ug emergency manibat kadang matatua ug komunidad.",
        "tabReportDesc": "Isumite ing sarili mung balita paagi king teksto o bosis maipapan king kasasapan king lugar yu.",
        "tabMapDesc": "Hanapin ing pinakamalapit a relief center, supply point, ug evacuation route.",
    },
    "pangasinan": {
        "audioReady_val": "Andam",
        "dashboardTitle": "Dashboard",
        "appTagline": "App para ed Panggawa tan Pananguman ed Bagyo",
        "appAbout": "So Pinoyta et sakey ya community-driven ya plataporma para ed panggawa tan pananguman ed bagyo ya iniyagel para ed saray katutubo nga Agta.",
        "tabDashboard": "Saray Pinanlapuan",
        "tabSources": "Mag-report",
        "tabSupply": "Mapa na Pananguman",
        "tabSourcesDesc": "Saray tanda na peligro, baha, tan emergency manlapud saray matatken tan komunidad.",
        "tabReportDesc": "Isumite so sarili moy tanda panamegley na teksto o boses nipaakar ed kondisyon ed lugar yo.",
        "tabMapDesc": "Bilanon so asingger ya relief center, supply point, tan evacuation route.",
    },
}

key_names_ordered = [
    "dashboardTitle","appTagline","appAbout",
    "tabDashboard","tabSources","tabSupply",
    "tabSourcesDesc","tabReportDesc","tabMapDesc",
]

lines = content.split("\n")
total_offset = 0

# Find each audioReady occurrence and match to language
# We process them in order of their line numbers
audio_ready_lines = []
for i, line in enumerate(lines):
    if "audioReady:" in line:
        audio_ready_lines.append(i)

lang_order = ["mamanwa","bisaya","tagalog","english","cebuano","ilocano","hiligaynon","bicolano","waray","kapampangan","pangasinan"]

if len(audio_ready_lines) != len(lang_order):
    print(f"WARNING: found {len(audio_ready_lines)} audioReady lines but have {len(lang_order)} languages")

for idx, lang in enumerate(lang_order):
    if idx >= len(audio_ready_lines):
        break
    adjusted = audio_ready_lines[idx] + total_offset
    data = lang_data[lang]
    new_lines = [f'    {k}: "{data[k]}",' for k in key_names_ordered]

    # Fix tabDashboard/tabSources/tabSupply: update the EXISTING lines instead of adding duplicates
    # We need to update the existing tab keys, not add new ones
    # They appear ~5 lines AFTER audioReady in the file (they come before audioReady in the object)
    # Actually tabDashboard/tabSources/tabSupply come BEFORE audioReady in the original structure
    # Let's just insert the new dashboard keys after audioReady
    # But we must NOT add duplicate tabDashboard/tabSources/tabSupply - those already exist
    # So only insert keys that don't already exist in this block
    new_lines_filtered = [l for l in new_lines if "tabDashboard" not in l and "tabSources" not in l and "tabSupply" not in l]

    # Ensure audioReady has a comma
    if not lines[adjusted].rstrip().endswith(","):
        lines[adjusted] = lines[adjusted].rstrip() + ","
    lines = lines[:adjusted+1] + new_lines_filtered + lines[adjusted+1:]
    total_offset += len(new_lines_filtered)
    print(f"Inserted {len(new_lines_filtered)} keys for {lang} at line {adjusted+1}")

# Now update the existing tabDashboard/tabSources/tabSupply values
content2 = "\n".join(lines)

# Update tab labels for each language
tab_updates = {
    "mamanwa":    ("Mga Tinubdan", "Magtaho", "Mapa sa Pagbawi"),
    "bisaya":     ("Mga Tinubdan", "Magtaho", "Mapa sa Pagbawi"),
    "tagalog":    ("Mga Pinagkukunan", "Mag-ulat", "Mapa ng Pagbabawi"),
    "english":    ("Sources", "Report", "Recovery Map"),
    "cebuano":    ("Mga Tinubdan", "Magtaho", "Mapa sa Pagbawi"),
    "ilocano":    ("Mga Pagkuanan", "Agpaaramat", "Mapa ti Pannakabawi"),
    "hiligaynon": ("Mga Tinubdan", "Mag-report", "Mapa sang Pagbawi"),
    "bicolano":   ("Mga Pinagkukunan", "Mag-report", "Mapa kan Pagbalik"),
    "waray":      ("Mga Tinubdan", "Mag-report", "Mapa Han Pagbawi"),
    "kapampangan":("Mga Pinggagawan", "Mag-report", "Mapa ning Panyabyan"),
    "pangasinan": ("Saray Pinanlapuan", "Mag-report", "Mapa na Pananguman"),
}

# Find and replace each language's tab values
for lang, (src, rep, sup) in tab_updates.items():
    lang_pos = content2.find(f'  {lang}:')
    if lang_pos == -1:
        continue
    # Find tabDashboard within 2000 chars of the language start
    block = content2[lang_pos:lang_pos+2000]
    new_block = block
    import re
    new_block = re.sub(r'tabDashboard: ".*?"', f'tabDashboard: "{src}"', new_block, count=1)
    new_block = re.sub(r'tabSources: ".*?"', f'tabSources: "{rep}"', new_block, count=1)
    new_block = re.sub(r'tabSupply: ".*?"', f'tabSupply: "{sup}"', new_block, count=1)
    content2 = content2[:lang_pos] + new_block + content2[lang_pos+2000:]
    print(f"Updated tab labels for {lang}")

with open("frontend/src/app/page.tsx", "w") as f:
    f.write(content2)

print("All done!")
