import re

with open("backend/main.py", "r") as f:
    content = f.read()

# 1. Update lang_instruction logic
lang_logic = """            lang_instruction = "English"
            if lang == "tagalog":
                lang_instruction = "Tagalog"
            elif lang == "bisaya":
                lang_instruction = "Cebuano/Bisaya"
            elif lang == "cebuano":
                lang_instruction = "Cebuano"
            elif lang == "ilocano":
                lang_instruction = "Ilocano"
            elif lang == "hiligaynon":
                lang_instruction = "Hiligaynon/Ilonggo"
            elif lang == "bicolano":
                lang_instruction = "Bicolano"
            elif lang == "waray":
                lang_instruction = "Waray-Waray"
            elif lang == "kapampangan":
                lang_instruction = "Kapampangan"
            elif lang == "pangasinan":
                lang_instruction = "Pangasinense/Pangasinan"
            elif lang == "mamanwa":
                lang_instruction = "Minamanwa (or closely related Surigaonon/Bisaya)" """

# The original logic is lines 78-84
old_lang_logic_pattern = r'            lang_instruction = "English"\n.*?lang_instruction = "Minamanwa \(or closely related Surigaonon/Bisaya\)"'
content = re.sub(old_lang_logic_pattern, lang_logic, content, flags=re.DOTALL)


# 2. Update fallbacks dictionary
fallbacks_additions = """        "cebuano": [
            "Nagtubo na ug paspas ang tubig sa sapa sa ubos. Hiposa na ang mga baka ug kahoy.",
            "Nagtambag ang konseho nga ang tanang pamilya duol sa sapa magtigom sa sentral nga shelter.",
            "Naabot na ang mga tambal sa taas. Unaha ang mga tigulang ug mga bata."
        ],
        "ilocano": [
            "Pardas ti idadakkel ti danum iti karayan. I-sigurado dagiti ayup ita.",
            "Ibagbaga ti konseho nga amin a pamilya iti abay ti sapa ket mapan iti sentral a pag-evacuate-an.",
            "Nadanon dan dagiti agas. Un-unaen dagiti ubbing ken lallakay."
        ],
        "hiligaynon": [
            "Madasig nga nagataas ang tubig sa suba sa idalom. Siguraduha ang inyo mga sapat subong.",
            "Naglaygay ang konseho nga ang tanan nga pamilya lapit sa suba magtipon sa evacuation center.",
            "Nag-abot na ang mga bulong. Unaha palihog ang mga tigulang kag kabataan."
        ],
        "bicolano": [
            "Rikas an paglangkaw kan tubig sa salog sa ibaba. I-secure an mga atamang hayop ngunyan.",
            "Nag-aabiso an konseho sa gabos na pamilya harani sa sapa na mag-iribahan sa central shelter.",
            "Nakaabot na an mga bulong. Inuton tabi an mga gurang asin kaakian."
        ],
        "waray": [
            "Malaksi an pagsaka han tubig ha salog ha ubos. Siguruha iton mga hayop yana.",
            "Nagsasagdon an konseho ha ngatanan nga pamilya harani ha sapa nga magkatirok ha evacuation center.",
            "Inmabot na iton mga bulong. Unaha niyo iton mga lagas ngan kabataan."
        ],
        "kapampangan": [
            "Mabilis lang mangatas ring danum king sapa lalam. Siguradwan yo ring animal ngeni.",
            "Papaywan ning konseho ding eganaganang pamilya siping sapa a tipun king central shelter.",
            "Miras na la ring panulu. Unan yo ring mangatwa ampon anak."
        ],
        "pangasinan": [
            "Mabilis so isasa-gep na danum ed ilog ed leksab. I-seguro ray ayep natan.",
            "Mambabaga so konseho ed saray pamilya ya asingger ed sapa ya mantipon ed evacuation center.",
            "Akasabi la ray tambal. Unain yo pa ray matatken tan ugugaw."
        ]
    }"""

# Replace `    }` after `"mamanwa": [...]`
old_fallbacks_end = r'            "Naabot na ang mga tambal sa taas\. Unaha ang mga tigulang ug mga bata\."\n        \]\n    \}'
new_fallbacks_end = r'            "Naabot na ang mga tambal sa taas. Unaha ang mga tigulang ug mga bata."\n        ],\n' + fallbacks_additions

content = re.sub(old_fallbacks_end, new_fallbacks_end, content, flags=re.DOTALL)

with open("backend/main.py", "w") as f:
    f.write(content)

