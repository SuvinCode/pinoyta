import re

with open("frontend/src/app/page.tsx", "r") as f:
    content = f.read()

new_keys = {
    "mamanwa": {
        "tabDashboardInfo": "Dashboard",
        "tabSourcesFeed": "Sources",
        "tabReportForm": "Report",
        "tabSupplyMap": "Recovery Map",
        "appTitle": "Pinoyta: Typhoon Preparation & Recovery App",
        "appPurpose": "Usa ka aplikasyon sa komunidad nga naka-focus sa pag-ayo human sa katalagman, nagtabang sa mga lumad ug lokal nga komunidad nga magpaambit og importanteng impormasyon, mag-coordinate sa pagtabang, ug makakita sa supply maps panahon ug pagkahuman sa bagyo.",
        "descDashboard": "Dashboard: Kinatibuk-ang pagtan-aw sa katuyoan sa aplikasyon ug giya sa pag-navigate.",
        "descSources": "Sources: Mga taho sa komunidad ug mga katigulangan alang sa tinuod nga mga update sa yuta.",
        "descReport": "Report: Pagpadala og mga taho sa peligro o pangayo og tabang, lakip na ang pag-record og tingog.",
        "descSupply": "Recovery Map: Usa ka interactive nga mapa nga nagpakita sa mga supply drops, luwas nga mga lugar, ug mga lugar nga adunay peligro."
    },
    "bisaya": {
        "tabDashboardInfo": "Dashboard",
        "tabSourcesFeed": "Sources",
        "tabReportForm": "Report",
        "tabSupplyMap": "Recovery Map",
        "appTitle": "Pinoyta: Typhoon Preparation & Recovery App",
        "appPurpose": "Usa ka aplikasyon sa komunidad nga naka-focus sa pag-ayo human sa katalagman, nagtabang sa mga lumad ug lokal nga komunidad nga magpaambit og importanteng impormasyon, mag-coordinate sa pagtabang, ug makakita sa supply maps panahon ug pagkahuman sa bagyo.",
        "descDashboard": "Dashboard: Kinatibuk-ang pagtan-aw sa katuyoan sa aplikasyon ug giya sa pag-navigate.",
        "descSources": "Sources: Mga taho sa komunidad ug mga katigulangan alang sa tinuod nga mga update.",
        "descReport": "Report: Pagpadala og mga taho sa peligro o pangayo og tabang, lakip na ang pag-record og tingog.",
        "descSupply": "Recovery Map: Usa ka interactive nga mapa nga nagpakita sa mga supply drops ug luwas nga mga lugar."
    },
    "tagalog": {
        "tabDashboardInfo": "Dashboard",
        "tabSourcesFeed": "Sources",
        "tabReportForm": "Report",
        "tabSupplyMap": "Recovery Map",
        "appTitle": "Pinoyta: Typhoon Preparation & Recovery App",
        "appPurpose": "Isang aplikasyong pinapatakbo ng komunidad na nakatutok sa pagbangon pagkatapos ng sakuna, tumutulong sa mga katutubo at lokal na komunidad na magbahagi ng mahalagang impormasyon at mapa ng suplay sa panahon at pagkatapos ng bagyo.",
        "descDashboard": "Dashboard: Pangkalahatang ideya ng layunin ng aplikasyon at gabay sa pag-navigate.",
        "descSources": "Sources: Mga ulat ng komunidad at matatanda para sa mga totoong update.",
        "descReport": "Report: Magsumite ng mga ulat sa panganib o humingi ng tulong, kasama ang pag-record ng boses.",
        "descSupply": "Recovery Map: Isang interactive na mapa na nagpapakita ng mga supply drop at ligtas na mga lugar."
    },
    "english": {
        "tabDashboardInfo": "Dashboard",
        "tabSourcesFeed": "Sources",
        "tabReportForm": "Report",
        "tabSupplyMap": "Recovery Map",
        "appTitle": "Pinoyta: Typhoon Preparation & Recovery App",
        "appPurpose": "A community-driven application focused on disaster recovery, helping indigenous and local communities share vital information, coordinate relief efforts, and access supply maps during and after typhoons.",
        "descDashboard": "Dashboard: Overview of the application's purpose and navigation guide.",
        "descSources": "Sources: A feed of community and elder reports, providing real-time, verified ground updates.",
        "descReport": "Report: Submit new hazard reports or requests for assistance, with voice recording capabilities.",
        "descSupply": "Recovery Map: An interactive map showing supply drops, safe zones, and hazard areas."
    },
    "cebuano": {
        "tabDashboardInfo": "Dashboard",
        "tabSourcesFeed": "Sources",
        "tabReportForm": "Report",
        "tabSupplyMap": "Recovery Map",
        "appTitle": "Pinoyta: Typhoon Preparation & Recovery App",
        "appPurpose": "Usa ka aplikasyon nga nag-focus sa disaster recovery, nagtabang sa mga lumad nga magpaambit og importanteng impormasyon ug makakita sa supply maps pagkahuman sa bagyo.",
        "descDashboard": "Dashboard: Kinatibuk-ang pagtan-aw sa aplikasyon ug giya.",
        "descSources": "Sources: Mga taho sa komunidad ug mga katigulangan alang sa mga update.",
        "descReport": "Report: Magpadala og mga taho sa peligro o pangayo og tabang gamit ang tingog.",
        "descSupply": "Recovery Map: Interactive nga mapa alang sa mga supply drops ug luwas nga mga lugar."
    },
    "ilocano": {
        "tabDashboardInfo": "Dashboard",
        "tabSourcesFeed": "Sources",
        "tabReportForm": "Report",
        "tabSupplyMap": "Recovery Map",
        "appTitle": "Pinoyta: Typhoon Preparation & Recovery App",
        "appPurpose": "Maysa nga aplikasyon ti komunidad para iti pannakabawi iti didigra, tumultulong kadagiti lallakay nga mangibingay iti napateg nga impormasion ken mapa ti suplay kabayatan ti bagyo.",
        "descDashboard": "Dashboard: Pakabuklan ti panggep ti aplikasyon ken pagalagadan.",
        "descSources": "Sources: Pakaammo dagiti komunidad ken lallakay para kadagiti update.",
        "descReport": "Report: Mangted ti pakaammo iti peligro wenno agkiddaw ti tulong.",
        "descSupply": "Recovery Map: Interaktibo a mapa para kadagiti supply drops ken natalged a lugar."
    },
    "hiligaynon": {
        "tabDashboardInfo": "Dashboard",
        "tabSourcesFeed": "Sources",
        "tabReportForm": "Report",
        "tabSupplyMap": "Recovery Map",
        "appTitle": "Pinoyta: Typhoon Preparation & Recovery App",
        "appPurpose": "Isa ka aplikasyon sang komunidad para sa disaster recovery, nagabulig sa mga pumuluyo nga magpaambit sang impormasyon kag makita ang supply maps sa tion sang bagyo.",
        "descDashboard": "Dashboard: Kabilugang pagtan-aw sa tinutuyo sang aplikasyon.",
        "descSources": "Sources: Mga taho sang komunidad kag kamagurangan para sa mga update.",
        "descReport": "Report: Magpadala sing taho ukon mangayo sing bulig gamit ang tingog.",
        "descSupply": "Recovery Map: Interactive nga mapa para sa mga supply drops kag luwas nga lugar."
    },
    "bicolano": {
        "tabDashboardInfo": "Dashboard",
        "tabSourcesFeed": "Sources",
        "tabReportForm": "Report",
        "tabSupplyMap": "Recovery Map",
        "appTitle": "Pinoyta: Typhoon Preparation & Recovery App",
        "appPurpose": "Sarong aplikasyon kan komunidad para sa pagbangon sa kalamidad, nagtatabang sa mga namamanwaan na ipaabot an importanteng impormasyon asin supply maps sa panahon nin bagyo.",
        "descDashboard": "Dashboard: Kabuuan na ideya kan aplikasyon.",
        "descSources": "Sources: Mga bareta kan komunidad asin mga gurang para sa mga update.",
        "descReport": "Report: Magpadara nin bareta sa peligro o maghagad nin tabang.",
        "descSupply": "Recovery Map: Interactive na mapa para sa mga supply drops."
    },
    "waray": {
        "tabDashboardInfo": "Dashboard",
        "tabSourcesFeed": "Sources",
        "tabReportForm": "Report",
        "tabSupplyMap": "Recovery Map",
        "appTitle": "Pinoyta: Typhoon Preparation & Recovery App",
        "appPurpose": "Usa nga aplikasyon han komunidad para han pagbangon ha kalamidad, nabulig ha mga mulupyo pagpakita hin impormasyon ug supply maps ha panahon han bagyo.",
        "descDashboard": "Dashboard: Kabug-usan nga pag-abot han aplikasyon.",
        "descSources": "Sources: Mga sumat han komunidad ug katigulangan para hin update.",
        "descReport": "Report: Magpadara hin sumat hin peligro o pangaro hin bulig.",
        "descSupply": "Recovery Map: Interactive nga mapa para han mga supply drops."
    },
    "kapampangan": {
        "tabDashboardInfo": "Dashboard",
        "tabSourcesFeed": "Sources",
        "tabReportForm": "Report",
        "tabSupplyMap": "Recovery Map",
        "appTitle": "Pinoyta: Typhoon Preparation & Recovery App",
        "appPurpose": "Metung a aplikasyon ning komunidad para king pamibangon king kalamidad, sasaup kareng tau ban ipaalam ing impormasyon at supply maps kabang bagyo.",
        "descDashboard": "Dashboard: Pangkabilugan a kaisipan ning aplikasyon.",
        "descSources": "Sources: Mga balita ning komunidad at matatua para update.",
        "descReport": "Report: Magpadala balita king peligro o manyad saup.",
        "descSupply": "Recovery Map: Interactive a mapa para kareng supply drops."
    },
    "pangasinan": {
        "tabDashboardInfo": "Dashboard",
        "tabSourcesFeed": "Sources",
        "tabReportForm": "Report",
        "tabSupplyMap": "Recovery Map",
        "appTitle": "Pinoyta: Typhoon Preparation & Recovery App",
        "appPurpose": "Sakey ya aplikasyon na komunidad para ed ibabangon ed kalamidad, ontutulong ed saray totoo ya ipaamta so impormasyon tan supply maps no walay bagyo.",
        "descDashboard": "Dashboard: Kabuuan ya gagala na aplikasyon.",
        "descSources": "Sources: Saray tanda na komunidad tan matatken para ed update.",
        "descReport": "Report: Mangipadara na tanda na peligro o onkerew na tulong.",
        "descSupply": "Recovery Map: Interactive ya mapa para ed saray supply drops."
    }
}


lines = content.split('\n')

for lang, keys in new_keys.items():
    lang_start = content.find(f'  {lang}: {{')
    if lang_start == -1: continue
    
    vr_start = content.find('    audioReady:', lang_start)
    if vr_start == -1: continue
    
    # We will find the line index
    pre = content[:vr_start]
    line_idx = pre.count('\n')
    
    new_lines = [f'    {k}: "{v}",' for k, v in keys.items()]
    lines = lines[:line_idx+1] + new_lines + lines[line_idx+1:]
    
content = "\n".join(lines)

with open("frontend/src/app/page.tsx", "w") as f:
    f.write(content)

print("Added dashboard translations")
