import re

with open("frontend/src/app/page.tsx", "r") as f:
    content = f.read()

replacements = [
    # Section headers
    ('Elder Reports</h2>', '{t.elderReportsTitle}</h2>'),
    ('Community Reports</h2>', '{t.communityReportsTitle}</h2>'),
    # Report tab card
    ('Send a Report</CardTitle>', '{t.reportTitle}</CardTitle>'),
    ('>Alert the community about hazards or needs in your area.</CardDescription>', '>{t.reportDesc}</CardDescription>'),
    # Success
    ('> Report submitted safely!\n', '> {t.reportSuccess}\n'),
    # Form labels
    ('Name (Optional)</label>', '{t.reportNameLabel}</label>'),
    ('placeholder="Anonymous"', 'placeholder={t.reportNamePlaceholder}'),
    ('>Location *\n', '>{t.reportLocationLabel} *\n'),
    ('> Auto\n', '> {t.reportLocationAuto}\n'),
    ('Details</label>', '{t.reportDetailsLabel}</label>'),
    ('placeholder="What is happening? Do you need help?"', 'placeholder={t.reportDetailsPlaceholder}'),
    # Buttons
    ('"Voice Record"', '{t.voiceRecord}'),
    ('"Stop Recording..."', '{t.stopRecording}'),
    ('> Submit\n', '> {t.submitBtn}\n'),
    # Empty states
    ('No elder reports yet.</div>', '{t.noElderReports}</div>'),
    ('No community reports yet.</div>', '{t.noCommunityReports}</div>'),
    # Settings panel
    ('>Dark Theme</span>', '>{t.darkTheme}</span>'),
    ('>Language</label>', '>{t.languageLabel}</label>'),
    ('>Preferences</label>', '>{t.preferencesLabel}</label>'),
    ('>Alert Tribal Confirmation</span>', '>{t.alertTribalConfirm}</span>'),
    # Audio player
    ('Original Dialect Recording', '{t.originalRecording}'),
    (': "Ready"', ': t.audioReady'),
    # Pinned badge
    ('/> PINNED\n', '/> {t.pinnedLabel}\n'),
]

for old, new in replacements:
    if old in content:
        content = content.replace(old, new, 1)
        print(f"✓ {old[:50]!r}")
    else:
        print(f"✗ NOT FOUND: {old[:50]!r}")

with open("frontend/src/app/page.tsx", "w") as f:
    f.write(content)
print("JSX swap done!")
