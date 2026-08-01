import re

with open("frontend/src/app/page.tsx", "r") as f:
    content = f.read()


# Fix 1: Add useEffect for loading localStorage language, and fix state definition
# Find: const [language, setLanguage] = useState<keyof typeof translations>("english");
content = content.replace(
    'const [language, setLanguage] = useState<keyof typeof translations>("english");',
    '''const [language, setLanguage] = useState<keyof typeof translations>("english");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("app_language");
    if (savedLang && Object.keys(translations).includes(savedLang)) {
      setLanguage(savedLang as keyof typeof translations);
    }
  }, []);'''
)

# Fix 2: Change the onValueChange logic for Select elements (desktop and mobile)
# Find: onValueChange={(val) => val && setLanguage(val as keyof typeof translations)}
new_onchange = '''onValueChange={(val) => {
                if (val) {
                  localStorage.setItem("app_language", val);
                  window.location.reload();
                }
              }}'''
content = content.replace('onValueChange={(val) => val && setLanguage(val as keyof typeof translations)}', new_onchange)

# Fix 3: Update transcript render logic to use transcripts object
# Find: "{item.transcript}"
content = content.replace('"{item.transcript}"', '"{item.transcripts[language] || item.transcripts.english}"')


# Avoid hydration mismatch for language dependent stuff by just returning a loader if not mounted
# Wrap return block? No, just the translations are fine to be mismatched initially. But Next.js might complain about text content differing.
# Actually, it's safer to just let it hydrate as English and swap, or if we want no warnings, we can just return null if !mounted.
content = content.replace('  const t = translations[language] || translations.english;\n\n  return (', '  const t = translations[language] || translations.english;\n\n  if (!mounted) return null;\n\n  return (')

with open("frontend/src/app/page.tsx", "w") as f:
    f.write(content)

print("page.tsx updated!")
