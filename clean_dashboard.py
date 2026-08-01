import re

with open("frontend/src/app/page.tsx", "r") as f:
    content = f.read()

# 1. Remove the "1. ", "2. ", "3. " from the tab labels in translations
content = re.sub(r'tabDashboard: "1\. (.*?)"', r'tabDashboard: "\1"', content)
content = re.sub(r'tabSources: "2\. (.*?)"', r'tabSources: "\1"', content)
content = re.sub(r'tabSupply: "3\. (.*?)"', r'tabSupply: "\1"', content)

# 2. Remove the status line (from Plain-Language Status Line to </div> before </header>)
status_line_pattern = r'        \{\/\* Plain-Language Status Line with Dynamic Translation \*\/\}.*?<\/div>'
content = re.sub(status_line_pattern, '', content, flags=re.DOTALL)

# 3. Remove Location Selector, Verification Row, and Signal Level Card
# This is between `<motion.div ... className="space-y-4">` and `{/* --- NEW COMMUNITY REPORTING SECTION --- */}`
components_pattern = r'            \{\/\* Location Selector \*\/\}.*?(?=            \{\/\* --- NEW COMMUNITY REPORTING SECTION --- \*\/\})'
content = re.sub(components_pattern, '', content, flags=re.DOTALL)

with open("frontend/src/app/page.tsx", "w") as f:
    f.write(content)

