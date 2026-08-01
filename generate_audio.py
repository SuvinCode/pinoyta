import json
import os
from gtts import gTTS

def main():
    db_path = "frontend/src/data/db.json"
    audio_dir = "frontend/public/audio"
    
    with open(db_path, "r") as f:
        data = json.load(f)
        
    for category in ["elderReports", "communityReports"]:
        for item in data[category]:
            text = item["transcripts"]["english"]
            filename = f"{item['id']}.mp3"
            filepath = os.path.join(audio_dir, filename)
            
            print(f"Generating audio for {item['id']}...")
            try:
                tts = gTTS(text=text, lang='en', slow=False)
                tts.save(filepath)
                item["audioUrl"] = f"/audio/{filename}"
            except Exception as e:
                print(f"Failed to generate audio for {item['id']}: {e}")
                
    with open(db_path, "w") as f:
        json.dump(data, f, indent=2)
        
if __name__ == "__main__":
    main()
