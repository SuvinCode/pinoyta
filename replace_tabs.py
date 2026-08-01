with open("frontend/src/app/page.tsx", "r") as f:
    content = f.read()

import re

# 1. Update Tabs defaultValue
content = content.replace(
    '<Tabs defaultValue="sources" className="w-full">',
    '<Tabs defaultValue="dashboard" className="w-full">'
)

# 2. Replace TabsList
old_tabs_list = """          {/* 3 Main Header Tabs */}
          <TabsList className="grid w-full grid-cols-3 h-14 mb-6 bg-white/95 dark:bg-[#111827]/95 border border-[#e5e7eb] dark:border-[#1f2937] rounded-xl p-1 shadow-xs">
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

new_tabs_list = """          {/* 4 Main Header Tabs */}
          <TabsList className="grid w-full grid-cols-4 h-14 mb-6 bg-white/95 dark:bg-[#111827]/95 border border-[#e5e7eb] dark:border-[#1f2937] rounded-xl p-1 shadow-xs">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center justify-center gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-xs sm:text-sm rounded-lg transition-all"
            >
              <Activity className="h-4 w-4 text-[#10b981]" />
              <span className="hidden sm:inline">{t.tabDashboardInfo}</span>
            </TabsTrigger>

            <TabsTrigger 
              value="sources" 
              className="flex items-center justify-center gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-xs sm:text-sm rounded-lg transition-all"
            >
              <Activity className="h-4 w-4 text-[#ce2029]" />
              <span className="hidden sm:inline">{t.tabSourcesFeed}</span>
            </TabsTrigger>

            <TabsTrigger 
              value="report" 
              className="flex items-center justify-center gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-xs sm:text-sm rounded-lg transition-all"
            >
              <Volume2 className="h-4 w-4 text-[#0038a8]" />
              <span className="hidden sm:inline">{t.tabReportForm}</span>
            </TabsTrigger>

            <TabsTrigger 
              value="supply" 
              className="flex items-center justify-center gap-2 data-[state=active]:text-[#0038a8] dark:data-[state=active]:text-[#60a5fa] data-[state=active]:bg-[#eff6ff] dark:data-[state=active]:bg-[#1e3a8a]/40 font-bold text-xs sm:text-sm rounded-lg transition-all"
            >
              <Map className="h-4 w-4 text-[#eab308]" />
              <span className="hidden sm:inline">{t.tabSupplyMap}</span>
            </TabsTrigger>
          </TabsList>"""

content = content.replace(old_tabs_list, new_tabs_list)

# 3. Add Dashboard Tab Content
old_sources_tab = """          {/* ==================== TAB 1: SOURCES ==================== */}"""
new_dashboard_tab = """          {/* ==================== TAB 0: DASHBOARD ==================== */}
          <TabsContent value="dashboard" className="outline-none">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 mt-4">
              
              <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-sm">
                <CardHeader className="pb-4 border-b border-[#e5e7eb] dark:border-[#374151] bg-[#eff6ff] dark:bg-[#1e3a8a]/20">
                  <div className="flex items-center gap-3">
                    <Activity className="h-6 w-6 text-[#0038a8] dark:text-[#60a5fa]" />
                    <h2 className="text-xl font-bold text-[#0038a8] dark:text-[#60a5fa]">{t.appTitle}</h2>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-[#374151] dark:text-[#d1d5db] leading-relaxed text-sm sm:text-base">
                    {t.appPurpose}
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-[#ce2029]" />
                      <h3 className="font-bold text-[#111827] dark:text-[#f9fafb]">{t.tabSourcesFeed}</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.descSources}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-5 w-5 text-[#0038a8]" />
                      <h3 className="font-bold text-[#111827] dark:text-[#f9fafb]">{t.tabReportForm}</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.descReport}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-[#1f2937] border-[#e5e7eb] dark:border-[#374151] shadow-sm hover:shadow-md transition-shadow md:col-span-2">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Map className="h-5 w-5 text-[#eab308]" />
                      <h3 className="font-bold text-[#111827] dark:text-[#f9fafb]">{t.tabSupplyMap}</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.descSupply}</p>
                  </CardContent>
                </Card>
              </div>

            </motion.div>
          </TabsContent>

          {/* ==================== TAB 1: SOURCES ==================== */}"""

content = content.replace(old_sources_tab, new_dashboard_tab)

with open("frontend/src/app/page.tsx", "w") as f:
    f.write(content)
print("UI updated.")
