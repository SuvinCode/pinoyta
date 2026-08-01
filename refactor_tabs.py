import re

with open("frontend/src/app/page.tsx", "r") as f:
    content = f.read()

# 1. Update Translations
content = re.sub(r'tabDashboard: ".*?",', 'tabDashboard: "Sources",', content)
content = re.sub(r'tabSources: ".*?",', 'tabSources: "Report",', content)
content = re.sub(r'tabSupply: ".*?",', 'tabSupply: "Recovery Map",', content)

# Remove unused AI / official translations if they exist in tagalog/english etc to be thorough, but it's okay to leave them as dead keys.

# 2. Update Tabs Default Value
content = content.replace('<Tabs defaultValue="dashboard" className="w-full">', '<Tabs defaultValue="sources" className="w-full">')

# 3. Update TabsList Triggers
old_tabs_list = """          {/* 3 Main Header Tabs */}
          <TabsList className="grid w-full grid-cols-3 h-14 mb-6 sticky top-[104px] z-40 bg-white/95 dark:bg-[#111827]/95 backdrop-blur shadow-xs border border-[#e5e7eb] dark:border-[#1f2937] rounded-xl p-1">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center justify-center gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-xs sm:text-sm rounded-lg transition-all"
            >
              <Activity className="h-4 w-4 text-[#ce2029]" />
              <span>{t.tabDashboard}</span>
            </TabsTrigger>

            <TabsTrigger 
              value="sources" 
              className="flex items-center justify-center gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-xs sm:text-sm rounded-lg transition-all"
            >
              <Volume2 className="h-4 w-4 text-[#0038a8]" />
              <span>{t.tabSources}</span>
            </TabsTrigger>

            <TabsTrigger 
              value="supply" 
              className="flex items-center justify-center gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-xs sm:text-sm rounded-lg transition-all"
            >
              <Map className="h-4 w-4 text-[#eab308]" />
              <span>{t.tabSupply}</span>
            </TabsTrigger>
          </TabsList>"""

new_tabs_list = """          {/* 3 Main Header Tabs */}
          <TabsList className="grid w-full grid-cols-3 h-14 mb-6 sticky top-[104px] z-40 bg-white/95 dark:bg-[#111827]/95 backdrop-blur shadow-xs border border-[#e5e7eb] dark:border-[#1f2937] rounded-xl p-1">
            <TabsTrigger 
              value="sources" 
              className="flex items-center justify-center gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-xs sm:text-sm rounded-lg transition-all"
            >
              <Activity className="h-4 w-4 text-[#ce2029]" />
              <span>{t.tabDashboard}</span>
            </TabsTrigger>

            <TabsTrigger 
              value="report" 
              className="flex items-center justify-center gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-xs sm:text-sm rounded-lg transition-all"
            >
              <Volume2 className="h-4 w-4 text-[#0038a8]" />
              <span>{t.tabSources}</span>
            </TabsTrigger>

            <TabsTrigger 
              value="supply" 
              className="flex items-center justify-center gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-xs sm:text-sm rounded-lg transition-all"
            >
              <Map className="h-4 w-4 text-[#eab308]" />
              <span>{t.tabSupply}</span>
            </TabsTrigger>
          </TabsList>"""
content = content.replace(old_tabs_list, new_tabs_list)

# 4. Extracting and Rebuilding Tab Contents

# Get Community Reports UI Block (Pinned + Recent Posts)
community_text_pattern = r'            \{\/\* --- NEW COMMUNITY REPORTING SECTION --- \*\/\}.*?<\/div>\n\n              \{\/\* Submit Report Form \*\/\}'
community_text_match = re.search(community_text_pattern, content, flags=re.DOTALL)
if community_text_match:
    community_text_block = community_text_match.group(0).replace('              {/* Submit Report Form */}', '')

# Get Submit Report Form UI Block
submit_form_pattern = r'              \{\/\* Submit Report Form \*\/\}.*?<\/Card>\n            <\/div>'
submit_form_match = re.search(submit_form_pattern, content, flags=re.DOTALL)
if submit_form_match:
    submit_form_block = submit_form_match.group(0)
    # the trailing </div> belongs to the wrapper <div className="mt-8 space-y-4">, we can strip it.
    submit_form_block = submit_form_block.replace('\n            </div>', '')


# Get Community Voice Feed UI Block
voice_feed_pattern = r'            \{\/\* 1\. Community Intake \*\/\}.*?<\/Card>\n            <\/div>'
voice_feed_match = re.search(voice_feed_pattern, content, flags=re.DOTALL)
if voice_feed_match:
    voice_feed_block = voice_feed_match.group(0)


# Now build the new Tabs layout
new_tabs_content = f"""          {{/* ==================== TAB 1: SOURCES (COMMUNITY TEXT + VOICE) ==================== */}}
          <TabsContent value="sources" className="outline-none">
            <motion.div initial={{{{ opacity: 0, y: 15 }}}} animate={{{{ opacity: 1, y: 0 }}}} transition={{{{ duration: 0.4 }}}} className="space-y-6">
{community_text_block}
{voice_feed_block}
            </motion.div>
          </TabsContent>

          {{/* ==================== TAB 2: REPORT (SUBMIT FORM) ==================== */}}
          <TabsContent value="report" className="outline-none">
            <motion.div initial={{{{ opacity: 0, y: 15 }}}} animate={{{{ opacity: 1, y: 0 }}}} transition={{{{ duration: 0.4 }}}} className="space-y-6">
{submit_form_block}
            </motion.div>
          </TabsContent>"""

# Replace all old tabs (except supply) with new tabs
old_tabs_pattern = r'          \{\/\* ==================== TAB 1: MAIN DASHBOARD ==================== \*\/\}.*?(?=          \{\/\* ==================== TAB 3: RECOVERY \/ SUPPLY MAP ==================== \*\/\})'

content = re.sub(old_tabs_pattern, new_tabs_content + '\n\n', content, flags=re.DOTALL)


with open("frontend/src/app/page.tsx", "w") as f:
    f.write(content)

