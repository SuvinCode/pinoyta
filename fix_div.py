with open("frontend/src/app/page.tsx", "r") as f:
    lines = f.readlines()

# find the <div className="mt-8 space-y-4"> and see where it should close.
# Actually, since it's now just `community_text_block`, let's just append a `</div>` to it before the voice feed block in TAB 1.
# Specifically, we can insert the `</div>` right above `{/* 1. Community Intake */}`

for i, line in enumerate(lines):
    if "{/* 1. Community Intake */}" in line:
        lines.insert(i, "            </div>\n")
        break

with open("frontend/src/app/page.tsx", "w") as f:
    f.writelines(lines)

