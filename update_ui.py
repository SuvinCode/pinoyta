import re

with open("frontend/src/app/page.tsx", "r") as f:
    content = f.read()

# 1. Update imports
content = content.replace(
    'import { AlertTriangle, CheckCircle2, Play, Pause, Activity, Map, Settings, Volume2, ShieldAlert, FileText, UserCheck, Mic, HelpCircle, Sun, Star, Send, Pin, Menu, MapPin, Trash2 } from "lucide-react";',
    'import { AlertTriangle, CheckCircle2, Play, Pause, Activity, Map, Settings, Volume2, ShieldAlert, FileText, UserCheck, Mic, HelpCircle, Sun, Star, Send, Pin, Menu, MapPin, Trash2, Loader2 } from "lucide-react";'
)

# 2. Replace the icon inside the button
old_button_icon = '{playingAudioId === item.id ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}'
new_button_icon = '{loadingAudioId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : playingAudioId === item.id ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}'

content = content.replace(old_button_icon, new_button_icon)

with open("frontend/src/app/page.tsx", "w") as f:
    f.write(content)

print("Updated UI successfully")
