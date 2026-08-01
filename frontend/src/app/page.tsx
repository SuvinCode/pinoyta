"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [backendStatus, setBackendStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkBackend = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/status");
      const data = await res.json();
      setBackendStatus(data.status);
    } catch (error) {
      setBackendStatus("Backend is offline. Please start it on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBackend();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-violet-900/20 blur-[120px]" />
      </div>

      <main className="relative z-10 container mx-auto px-6 py-24 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto space-y-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium bg-white/10 hover:bg-white/20 text-purple-200 border-none backdrop-blur-md">
              Test Application Ready
            </Badge>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-purple-400 drop-shadow-sm">
            Premium Next.js + Python Scaffold
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
            An elegant full-stack starting point. Blending the power of <span className="text-white font-medium">React</span>, the styling of <span className="text-white font-medium">Tailwind CSS</span>, fluid <span className="text-white font-medium">Framer Motion</span> animations, and the robust speed of <span className="text-white font-medium">FastAPI</span>.
          </p>

          <motion.div
            className="pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10 border-b border-white/5 pb-6">
                <CardTitle className="text-2xl font-semibold text-white">Backend Connection Status</CardTitle>
                <CardDescription className="text-zinc-400">
                  Pinging the Python FastAPI server to check its health.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pt-6 flex flex-col items-center justify-center gap-6">
                {loading ? (
                  <div className="w-full space-y-3">
                    <Skeleton className="h-12 w-full bg-white/10 rounded-xl" />
                  </div>
                ) : (
                  <motion.div
                    key={backendStatus}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-4 w-full rounded-xl border text-center font-medium ${
                      backendStatus?.includes("offline")
                        ? "bg-red-500/10 border-red-500/20 text-red-400"
                        : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {backendStatus || "Waiting for status..."}
                  </motion.div>
                )}
                
                <Button 
                  onClick={checkBackend} 
                  disabled={loading}
                  size="lg"
                  className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300"
                >
                  {loading ? "Pinging..." : "Ping Backend"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
