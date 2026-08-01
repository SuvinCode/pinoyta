import re

with open("frontend/src/app/page.tsx", "r") as f:
    content = f.read()

# Replace the old tab 1 structure
old_tab_pattern = r'          \{\/\* ==================== TAB 1: SOURCES \(COMMUNITY TEXT \+ VOICE\) ==================== \*\/\}.*?<\/motion\.div>\n          <\/TabsContent>'

old_tab_match = re.search(old_tab_pattern, content, flags=re.DOTALL)
if not old_tab_match:
    print("Could not find Tab 1")
    exit(1)
    
tab_content = old_tab_match.group(0)

# Extract blocks from tab_content
pinned_pattern = r'              \{\/\* Pinned Official Post \*\/\}.*?(?=              \{\/\* Recent Community Posts \*\/\})'
pinned_match = re.search(pinned_pattern, tab_content, flags=re.DOTALL)
pinned_block = pinned_match.group(0)

recent_posts_pattern = r'              \{\/\* Recent Community Posts \*\/\}.*?(?=            <\/div>\n            \{\/\* 1\. Community Intake \*\/\})'
recent_posts_match = re.search(recent_posts_pattern, tab_content, flags=re.DOTALL)
recent_posts_block = recent_posts_match.group(0)

voice_feed_pattern = r'            \{\/\* 1\. Community Intake \*\/\}.*?(?=            <\/motion\.div>)'
voice_feed_match = re.search(voice_feed_pattern, tab_content, flags=re.DOTALL)
voice_feed_block = voice_feed_match.group(0)

# Construct new Tab 1 content
new_tab_content = f"""          {{/* ==================== TAB 1: SOURCES ==================== */}}
          <TabsContent value="sources" className="outline-none">
            <motion.div initial={{{{ opacity: 0, y: 15 }}}} animate={{{{ opacity: 1, y: 0 }}}} transition={{{{ duration: 0.4 }}}} className="space-y-8">
            
            {{/* --- ELDER REPORTS SECTION --- */}}
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="h-5 w-5 text-[#b45309]" />
                <h2 className="text-lg font-bold text-[#111827] dark:text-[#f9fafb]">Elder Reports</h2>
              </div>
{pinned_block}
{voice_feed_block}
            </div>

            {{/* --- COMMUNITY REPORTS SECTION --- */}}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-[#ce2029]" />
                <h2 className="text-lg font-bold text-[#111827] dark:text-[#f9fafb]">Community Reports</h2>
              </div>
{recent_posts_block}
            </div>

            </motion.div>
          </TabsContent>"""

# Replace in content
content = content.replace(tab_content, new_tab_content)

# We also need to strip out the inner `<div>` wrapper inside voice_feed_block since we are nesting it.
# Actually it's fine, a nested div won't hurt, but the header inside voice_feed_block says `{t.communityVoiceTitle}`.
# I'll let it be, but I'll remove the redundant Mic header in the voice feed block because we already have "Elder Reports" at the top.
# Or better, keep it as "Voice Recordings" subheader. Let's just remove the Mic header from voice_feed_block.
content = re.sub(r'              <div className="flex items-center justify-between mb-3">\n                <h3 className="font-bold text-base flex items-center gap-2 text-\[\#111827\] dark:text-\[\#f9fafb\]">\n                  <Mic className="h-5 w-5 text-\[\#ce2029\]" \/> \{t\.communityVoiceTitle\}\n                <\/h3>\n                <Badge variant="outline" className="text-\[11px\] font-bold border-\[\#ce2029\]\/30 text-\[\#ce2029\] bg-\[\#fff1f2\] dark:bg-\[\#881337\]\/20">\n                  \{t\.unresynthesized\}\n                <\/Badge>\n              <\/div>', '', content)


with open("frontend/src/app/page.tsx", "w") as f:
    f.write(content)

print("Done")
