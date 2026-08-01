import re

with open("frontend/src/app/page.tsx", "r") as f:
    content = f.read()

# 1. Add Menu icon to imports
content = content.replace("Pin } from \"lucide-react\";", "Pin, Menu } from \"lucide-react\";")

# 2. Replace Header right-side (Language + Settings) with a responsive Hamburger setup
header_start = """          {/* Sticky Language Selector & Settings */}
          <div className="flex items-center gap-2">"""
header_end = """              </SheetContent>
            </Sheet>
          </div>"""

# Extract the chunk to replace
chunk_pattern = r'          \{\/\* Sticky Language Selector & Settings \*\/\}.*?<\/Sheet>\n          <\/div>'
# Note: Since there is a lot of code, I'll provide an exact replacement string instead of relying on complex regex that might fail.

new_header_controls = """          {/* Desktop: Sticky Language Selector & Settings */}
          <div className="hidden md:flex items-center gap-2">
            <Select value={language} onValueChange={(val) => val && setLanguage(val as keyof typeof translations)}>
              <SelectTrigger className="w-[145px] h-9 text-xs border-[#d1d5db] dark:border-[#374151] bg-white dark:bg-[#1f2937] font-semibold shadow-2xs text-[#111827] dark:text-[#f9fafb]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151]">
                <SelectItem value="mamanwa">Minamanwa (Native)</SelectItem>
                <SelectItem value="bisaya">Bisaya</SelectItem>
                <SelectItem value="cebuano">Cebuano</SelectItem>
                <SelectItem value="ilocano">Ilocano</SelectItem>
                <SelectItem value="hiligaynon">Hiligaynon</SelectItem>
                <SelectItem value="bicolano">Bicolano</SelectItem>
                <SelectItem value="waray">Waray-Waray</SelectItem>
                <SelectItem value="kapampangan">Kapampangan</SelectItem>
                <SelectItem value="pangasinan">Pangasinan</SelectItem>
                <SelectItem value="tagalog">Tagalog</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger className="h-9 w-9 rounded-full hover:bg-gray-100 dark:hover:bg-[#1f2937] text-gray-700 dark:text-gray-200 inline-flex items-center justify-center transition-colors">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </SheetTrigger>
              <SheetContent className="bg-white dark:bg-[#111827] border-[#e5e7eb] dark:border-[#1f2937]">
                <SheetHeader>
                  <SheetTitle className="text-[#0038a8] dark:text-[#60a5fa] font-bold">Preferences & Governance</SheetTitle>
                  <SheetDescription>Indigenous Community & App Settings</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Dark Theme</span>
                    <Switch 
                      checked={theme === "dark"} 
                      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">Simulated Governance State</span>
                    <div className="flex items-center justify-between bg-blue-50/50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200/50 dark:border-blue-900/50">
                      <span className="text-xs font-medium">Alert Tribal Confirmation</span>
                      <Switch 
                        checked={isAlertConfirmed} 
                        onCheckedChange={setIsAlertConfirmed}
                      />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile: Hamburger Menu */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger className="h-9 w-9 rounded-md hover:bg-gray-100 dark:hover:bg-[#1f2937] text-gray-700 dark:text-gray-200 inline-flex items-center justify-center transition-colors">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </SheetTrigger>
              <SheetContent className="bg-white dark:bg-[#111827] border-[#e5e7eb] dark:border-[#1f2937] w-[280px]">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-[#0038a8] dark:text-[#60a5fa] font-bold text-left">App Menu</SheetTitle>
                </SheetHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Language</label>
                    <Select value={language} onValueChange={(val) => val && setLanguage(val as keyof typeof translations)}>
                      <SelectTrigger className="w-full h-10 text-sm border-[#d1d5db] dark:border-[#374151] bg-white dark:bg-[#1f2937] font-semibold text-[#111827] dark:text-[#f9fafb]">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151]">
                        <SelectItem value="mamanwa">Minamanwa (Native)</SelectItem>
                        <SelectItem value="bisaya">Bisaya</SelectItem>
                        <SelectItem value="cebuano">Cebuano</SelectItem>
                        <SelectItem value="ilocano">Ilocano</SelectItem>
                        <SelectItem value="hiligaynon">Hiligaynon</SelectItem>
                        <SelectItem value="bicolano">Bicolano</SelectItem>
                        <SelectItem value="waray">Waray-Waray</SelectItem>
                        <SelectItem value="kapampangan">Kapampangan</SelectItem>
                        <SelectItem value="pangasinan">Pangasinan</SelectItem>
                        <SelectItem value="tagalog">Tagalog</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Preferences</label>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Dark Theme</span>
                      <Switch 
                        checked={theme === "dark"} 
                        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Simulated Governance State</span>
                    <div className="flex items-center justify-between bg-blue-50/50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200/50 dark:border-blue-900/50">
                      <span className="text-xs font-medium">Alert Tribal Confirmation</span>
                      <Switch 
                        checked={isAlertConfirmed} 
                        onCheckedChange={setIsAlertConfirmed}
                      />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>"""

content = re.sub(chunk_pattern, new_header_controls, content, flags=re.DOTALL)


# 3. Add Framer Motion Animations to Tabs Content
content = content.replace('<TabsContent value="dashboard" className="space-y-4 outline-none">', 
                          '<TabsContent value="dashboard" className="outline-none">\n            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-4">')
content = content.replace('</TabsContent>\n\n          {/* ==================== TAB 2', 
                          '</motion.div>\n          </TabsContent>\n\n          {/* ==================== TAB 2')

content = content.replace('<TabsContent value="sources" className="space-y-6 outline-none">',
                          '<TabsContent value="sources" className="outline-none">\n            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">')
content = content.replace('</TabsContent>\n\n          {/* ==================== TAB 3',
                          '</motion.div>\n          </TabsContent>\n\n          {/* ==================== TAB 3')

content = content.replace('<TabsContent value="supply" className="space-y-4 outline-none">',
                          '<TabsContent value="supply" className="outline-none">\n            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="space-y-4">')
content = content.replace('</TabsContent>\n\n        </Tabs>',
                          '</motion.div>\n          </TabsContent>\n\n        </Tabs>')

with open("frontend/src/app/page.tsx", "w") as f:
    f.write(content)

