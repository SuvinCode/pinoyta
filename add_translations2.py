with open("frontend/src/app/page.tsx", "r") as f:
    content = f.read()

# Map language names to their verifiedReviewer line numbers (1-indexed)
lang_vr = {
    "mamanwa": 52,
    "bisaya": 86,
    "tagalog": 120,
    "english": 154,
    "cebuano": 188,
    "ilocano": 222,
    "hiligaynon": 256,
    "bicolano": 290,
    "waray": 324,
    "kapampangan": 358,
    "pangasinan": 392,
}

new_keys = {
    "mamanwa":    ("Mga Taho sa Katigulangan","Mga Taho sa Komunidad","Magpadala og Taho","Pahibawa ang komunidad mahitungod sa mga peligro sa inyong lugar.","Kalampusan ang pagsumite sa taho!","Ngalan (Opsyonal)","Anonimo","Lokasyon","Awtomatiko","Mga Detalye","Unsa ang nahitabo? Nagkinahanglan ka ba og tabang?","I-record ang Tingog","Hunong ang Pag-record...","Isumite","Wala pay mga taho gikan sa mga katigulangan.","Wala pay mga taho gikan sa komunidad.","Ngitngit nga Tema","Sinultihan","Mga Kagustuhan","Pagkumpirma sa Tribal Alert","PINNED","Orihinal nga Rekording","Andam"),
    "bisaya":     ("Mga Taho sa Katigulangan","Mga Taho sa Komunidad","Magpadala og Taho","Pahibawa ang komunidad mahitungod sa mga peligro sa inyong lugar.","Kalampusan ang pagsumite sa taho!","Ngalan (Opsyonal)","Anonimo","Lokasyon","Awtomatiko","Mga Detalye","Unsa ang nahitabo? Nagkinahanglan ka ba og tabang?","I-record ang Tingog","Hunong ang Pag-record...","Isumite","Wala pay mga taho gikan sa mga katigulangan.","Wala pay mga taho gikan sa komunidad.","Ngitngit nga Tema","Sinultihan","Mga Kagustuhan","Pagkumpirma sa Tribal Alert","PINNED","Orihinal nga Rekording","Andam"),
    "tagalog":    ("Mga Ulat ng Matatanda","Mga Ulat ng Komunidad","Magpadala ng Ulat","Balaan ang komunidad tungkol sa mga panganib sa inyong lugar.","Matagumpay na naipadala ang ulat!","Pangalan (Opsyonal)","Anonimo","Lokasyon","Auto","Detalye","Ano ang nangyayari? Kailangan mo ba ng tulong?","I-record ang Boses","Ihinto ang Pagre-record...","Isumite","Wala pang mga ulat mula sa matatanda.","Wala pang mga ulat mula sa komunidad.","Madilim na Tema","Wika","Mga Kagustuhan","Kumpirmasyon ng Tribal Alert","NAKA-PIN","Orihinal na Rekording","Handa"),
    "english":    ("Elder Reports","Community Reports","Send a Report","Alert the community about hazards or needs in your area.","Report submitted safely!","Name (Optional)","Anonymous","Location","Auto","Details","What is happening? Do you need help?","Voice Record","Stop Recording...","Submit","No elder reports yet.","No community reports yet.","Dark Theme","Language","Preferences","Alert Tribal Confirmation","PINNED","Original Dialect Recording","Ready"),
    "cebuano":    ("Mga Taho sa Katigulangan","Mga Taho sa Komunidad","Magpadala og Taho","Pahibawa ang komunidad mahitungod sa mga peligro sa inyong lugar.","Kalampusan ang pagsumite sa taho!","Ngalan (Opsyonal)","Anonimo","Lokasyon","Awtomatiko","Mga Detalye","Unsa ang nahitabo? Nagkinahanglan ka ba og tabang?","I-record ang Tingog","Hunong ang Pag-record...","Isumite","Wala pay mga taho gikan sa mga katigulangan.","Wala pay mga taho gikan sa komunidad.","Ngitngit nga Tema","Pinulongan","Mga Kagustuhan","Pagkumpirma sa Tribal Alert","PINNED","Orihinal nga Rekording","Andam"),
    "ilocano":    ("Pakaammo Dagiti Lallakay","Pakaammo Ti Komunidad","Mangted ti Pakaammo","Ipaaman ti komunidad maipapan kadagiti peligro iti lugar yo.","Napalampas ti panagipan ti pakaammo!","Nagan (Opsyonal)","Saan Napakaammo","Lugar","Awtomatiko","Detalye","Ania ti napasamak? Kasapulan mo ti tulong?","I-record Ti Boses","Iggam Ti Pag-record...","Ipan","Awan pay pakaammo dagiti lallakay.","Awan pay pakaammo dagiti komunidad.","Nangisit A Tema","Pagsasao","Kagustuan","Pagkumpirar Ti Tribal Alert","PINNED","Orihinal A Rekording","Naanay"),
    "hiligaynon": ("Mga Taho sang Kamagurangan","Mga Taho sang Komunidad","Magpadala sing Taho","Ipahibalo sa komunidad ang mga peligro sa inyo lugar.","Nalampasan ang pagsumite sang taho!","Ngalan (Opsyonal)","Anonimo","Lokasyon","Awtomatiko","Mga Detalye","Ano ang nagakalatabo? Kinahanglan ka ba sing bulig?","I-record ang Tingog","Hunong ang Pag-record...","Isumite","Wala pa mga taho gikan sa kamagurangan.","Wala pa mga taho gikan sa komunidad.","Maitum nga Tema","Hambal","Mga Kagustuhan","Kumpirmasyon sang Tribal Alert","PINNED","Orihinal nga Rekording","Handa"),
    "bicolano":   ("Mga Bareta kan mga Gurang","Mga Bareta kan Komunidad","Magpadara nin Bareta","Ipaaram sa komunidad an mga peligro sa saindong lugar.","Maogma na naipadara an bareta!","Ngaran (Opsyonal)","Anonimo","Lugar","Awtomatiko","Mga Detalye","Ano an nangyayari? Kaipuhan mo nin tabang?","I-record an Boses","Iuntok an Pag-record...","Isumite","Mayong mga bareta pa hali sa mga gurang.","Mayong mga bareta pa hali sa komunidad.","Madiklom na Tema","Tataramon","Mga Kagustuhan","Kumpirmasyon kan Tribal Alert","PINNED","Orihinal na Rekording","Handa"),
    "waray":      ("Mga Sumat Han Katigulangan","Mga Sumat Han Komunidad","Magpadara hin Sumat","Ipahibaro ha komunidad iton mga peligro ha iyo lugar.","Kalampusan an pagsumite han sumat!","Ngaran (Opsyonal)","Anonimo","Lugar","Awtomatiko","Mga Detalye","Ano an nagkakalatabo? Kinahanglan ka ba hin bulig?","I-record iton Tingog","Undanga an Pag-record...","Isumite","Waray pa mga sumat hali ha katigulangan.","Waray pa mga sumat hali ha komunidad.","Malangkob nga Tema","Yinaknan","Mga Kagustuhan","Pagkumpirma Han Tribal Alert","PINNED","Orihinal nga Rekording","Andam"),
    "kapampangan":("Mga Balita Ning Matatua","Mga Balita Ning Komunidad","Magpadala Ning Balita","Ipaalam king komunidad ing mga peligro king lugal yu.","Malampus a naipamiye ing balita!","Lagyu (Opsyonal)","Anonimo","Lugal","Awtomatiko","Mga Detalye","Nanu ing nangyari? Kailangan mu ba ning tulung?","I-record Ing Bosis","Ipalto Ing Pag-record...","Isumite","Ala pang mga balita manibat king matatua.","Ala pang mga balita manibat king komunidad.","Maitum A Tema","Amanu","Mga Kagustuan","Kumpirmasyon Ning Tribal Alert","PINNED","Orihinal A Rekording","Maganap"),
    "pangasinan": ("Saray Tanda na Saray Matatken","Saray Tanda na Komunidad","Mangipadara na Tanda","Ipaala ed komunidad iray peligro ed lugar yo.","Maong ya naipan so tanda!","Ngaran (Opsyonal)","Anonimo","Lugar","Awtomatiko","Saray Detalye","Anto so nagagawa? Nankaukolan ka ba na tulong?","I-record So Boses","Iuntok So Pag-record...","Isumite","Anggapo ni saray tanda manlapud saray matatken.","Anggapo ni saray tanda manlapud komunidad.","Maitom Na Tema","Salita","Saray Kagustoan","Kumpirmasyon Na Tribal Alert","PINNED","Orihinal Na Rekording","Andam"),
}

key_names = [
    "elderReportsTitle","communityReportsTitle","reportTitle","reportDesc","reportSuccess",
    "reportNameLabel","reportNamePlaceholder","reportLocationLabel","reportLocationAuto",
    "reportDetailsLabel","reportDetailsPlaceholder","voiceRecord","stopRecording","submitBtn",
    "noElderReports","noCommunityReports","darkTheme","languageLabel","preferencesLabel",
    "alertTribalConfirm","pinnedLabel","originalRecording","audioReady"
]

lines = content.split("\n")

# Insert new keys AFTER each verifiedReviewer line
offsets = {}  # track line shifts
total_offset = 0

for lang, lineno in sorted(lang_vr.items(), key=lambda x: x[1]):
    adjusted = lineno - 1 + total_offset  # 0-indexed
    values = new_keys[lang]
    new_lines = [f'    {key_names[i]}: "{values[i]}",' for i in range(len(key_names))]
    # Ensure verifiedReviewer ends with comma
    if not lines[adjusted].rstrip().endswith(","):
        lines[adjusted] = lines[adjusted].rstrip() + ","
    lines = lines[:adjusted+1] + new_lines + lines[adjusted+1:]
    total_offset += len(new_lines)
    print(f"Inserted {len(new_lines)} keys for {lang}")

with open("frontend/src/app/page.tsx", "w") as f:
    f.write("\n".join(lines))

print("Done!")
