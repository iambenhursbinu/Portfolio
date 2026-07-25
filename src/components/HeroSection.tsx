import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Sparkles, Code, Layout, Cpu, Database, Play, CheckCircle, Image, Link2, Upload, Trash2, Camera, MapPin, Briefcase, Lock, Edit3 } from 'lucide-react';
import { ThemeType } from '../App';
import { ProfileData } from '../types';

interface HeroSectionProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
  activeTheme: ThemeType;
  themeDetails: {
    color1: string;
    color2: string;
    alpha1: string;
    alpha2: string;
    text: string;
    glow: string;
    glowDim: string;
  };
  profile: ProfileData;
  profilePhoto: string;
  onUpdatePhoto: (url: string) => void;
  isAdminAuthenticated: boolean;
  onAdminLoginClick: () => void;
}

export default function HeroSection({ 
  onContactClick, 
  onProjectsClick, 
  activeTheme, 
  themeDetails,
  profile,
  profilePhoto,
  onUpdatePhoto,
  isAdminAuthenticated,
  onAdminLoginClick
}: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'editor'>('preview');

  return (
    <section 
      id="about" 
      className="relative min-h-screen pt-32 pb-20 md:py-40 flex items-center justify-center overflow-hidden glow-mesh"
    >
      {/* Dynamic Background Blurs */}
      <div 
        className="absolute top-[20%] left-[10%] w-72 h-72 md:w-96 md:h-96 rounded-full blur-[100px] animate-pulse-glow" 
        style={{ backgroundColor: themeDetails.alpha1 }}
      />
      <div 
        className="absolute bottom-[20%] right-[10%] w-80 h-80 md:w-[450px] md:h-[450px] rounded-full blur-[120px] animate-pulse-glow" 
        style={{ animationDelay: '2.5s', backgroundColor: themeDetails.alpha2 }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start text-left"
          id="hero-content"
        >
          {/* Status Badge & Admin Edit Controls */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-card border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.1)]"
              id="hero-status-badge"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {profile.availableStatus}
            </motion.div>

            {/* Quick Edit Indicator Badge - Only visible when Admin is logged in */}
            {isAdminAuthenticated && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                onClick={onAdminLoginClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 transition-all text-xs font-mono font-bold cursor-pointer active:scale-95"
                title="Edit Profile Identity & Info (Requires Security Auth)"
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Edit Profile</span>
                <span className="text-[10px] text-emerald-400 font-bold ml-1">• Active</span>
              </motion.button>
            )}
          </div>

          {/* Sparkly Welcome Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-1.5 text-xs md:text-sm font-mono font-bold tracking-widest uppercase mb-3"
            style={{ color: themeDetails.color1 }}
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            Welcome to my professional portfolio
          </motion.div>

          {/* Dynamic Rich Text Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 font-sans">
            Hi, I'm <br className="sm:hidden" />
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r font-black transition-all duration-500"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${themeDetails.color1}, #ffffff, ${themeDetails.color2})`
              }}
            >
              {profile.name}
            </span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl text-slate-300 font-medium tracking-tight mt-2 block">
              {profile.role}
            </span>
          </h1>

          {/* Tagline showing profile description and bio */}
          <p className="text-base md:text-lg text-slate-400 font-sans leading-relaxed max-w-xl mb-10">
            {profile.bio}
          </p>

          {/* CTA Glass buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto" id="hero-actions">
            <button
              onClick={onProjectsClick}
              style={{ 
                background: `linear-gradient(135deg, ${themeDetails.color1}, ${themeDetails.color2})`,
                boxShadow: `0 10px 30px ${themeDetails.glowDim}`
              }}
              className="px-8 py-4 rounded-xl text-brand-obsidian hover:brightness-110 hover:shadow-2xl transition-all duration-300 font-bold tracking-wide flex items-center justify-center gap-2 group cursor-pointer text-sm font-sans"
              id="hero-view-projects"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            <button
              onClick={onContactClick}
              className="px-8 py-4 rounded-xl liquid-glass-card text-white border border-white/10 hover:bg-white/5 transition-all duration-300 font-bold tracking-wide flex items-center justify-center gap-2 cursor-pointer text-sm font-sans"
              id="hero-contact"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </button>
          </div>

          {/* Location & Quick Contact details */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs md:text-sm text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" style={{ color: themeDetails.color1 }} />
              <span>{profile.location}</span>
            </div>
            <div className="hidden sm:block text-slate-800">|</div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" style={{ color: themeDetails.color2 }} />
              <span>{profile.role}</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Ultra 3D Glossy Liquid Glass Frame (Portrait Photo Frame) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          id="hero-visual"
        >
          <div 
            className="relative w-full max-w-[400px] rounded-[32px] p-[1.5px] shadow-2xl transition-all duration-500 glass-shine"
            style={{
              background: `linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%)`,
              boxShadow: `0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px ${themeDetails.glowDim}`
            }}
          >
            {/* Glossy liquid droplets decor */}
            <div className="absolute top-8 right-6 w-3.5 h-3.5 rounded-full bg-white/20 blur-[1px] pointer-events-none z-10" />
            <div className="absolute top-16 right-4 w-2 h-2 rounded-full bg-white/20 blur-[1px] pointer-events-none z-10" />
            <div className="absolute bottom-20 left-6 w-4 h-4 rounded-full bg-white/25 blur-[1px] pointer-events-none z-10" />

            <div className="bg-[#08090d]/95 rounded-[30px] overflow-hidden p-5">
              
              {/* Controls bar inside the Glass frame */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex bg-white/5 rounded-xl p-0.5 border border-white/10">
                  {(['preview', 'editor'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 text-[10px] md:text-xs font-mono font-bold rounded-lg capitalize transition-all duration-200 cursor-pointer ${
                        activeTab === tab 
                          ? 'bg-white/10 text-white shadow-sm' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Contents */}
              <div className="min-h-[260px] flex flex-col justify-between">
                
                {/* 1. Preview Tab: Renders the developer portrait */}
                {activeTab === 'preview' && (
                  <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d12]">
                    {/* Portrait Frame Label */}
                    <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md text-[9px] font-mono font-bold px-2.5 py-1 rounded-full text-slate-300 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>PROFILE_IMAGE</span>
                    </div>

                    <div className="relative w-full aspect-square overflow-hidden rounded-2xl flex items-center justify-center">
                      {profilePhoto ? (
                        <img 
                          src={profilePhoto} 
                          alt="Benhurs Binu R Portrait" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        /* Premium custom interactive vector placeholder when no custom photo is specified */
                        <div className="w-full h-full bg-gradient-to-br from-slate-900 to-[#0e1017] flex flex-col items-center justify-center p-6 text-center relative">
                          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                          
                          <div 
                            className="w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-500"
                            style={{ 
                              background: `linear-gradient(135deg, ${themeDetails.color1}22, ${themeDetails.color2}22)`,
                              border: `2px solid ${themeDetails.color1}`
                            }}
                          >
                            <Camera className="w-10 h-10" style={{ color: themeDetails.color1 }} />
                          </div>

                          <span className="text-sm font-extrabold text-white font-sans">
                            {profile.name}
                          </span>
                          <span className="text-xs text-slate-400 font-mono mt-1 max-w-[220px]">
                            {profile.role} • {profile.location}
                          </span>
                        </div>
                      )}

                      {/* Liquid glass light shine swept across image */}
                      <div className="absolute inset-0 pointer-events-none shimmer opacity-30 mix-blend-overlay" />
                    </div>

                    {/* Developer Nameplate inside preview */}
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between border-t border-white/5">
                      <div>
                        <div className="text-xs font-bold text-white font-sans">{profile.name}</div>
                        <div className="text-[9px] font-mono text-slate-400">{profile.location.toUpperCase()}</div>
                      </div>
                      <div 
                        className="w-2 h-2 rounded-full animate-ping"
                        style={{ backgroundColor: themeDetails.color1 }}
                      />
                    </div>
                  </div>
                )}

                {/* 2. Editor Tab: Interactive simulated React Code block */}
                {activeTab === 'editor' && (
                  <div className="font-mono text-[10px] leading-relaxed text-slate-300 bg-[#06080b] p-3.5 rounded-2xl border border-white/5 overflow-x-auto min-h-[260px]">
                    <div className="flex items-center justify-between text-[9px] text-slate-500 pb-1.5 mb-2 border-b border-white/5">
                      <span>src/components/Developer.tsx</span>
                      <span style={{ color: themeDetails.color1 }}>React_TS</span>
                    </div>
                    <p className="text-slate-500">// Profile Details</p>
                    <p><span className="text-blue-400">const</span> DeveloperIdentity = &#123;</p>
                    <p className="pl-4">name: <span className="text-amber-300">"{profile.name.toUpperCase()}"</span>,</p>
                    <p className="pl-4">role: <span className="text-amber-300">"{profile.role}"</span>,</p>
                    <p className="pl-4">location: <span className="text-amber-300">"{profile.location}"</span>,</p>
                    <p className="pl-4">theme: <span style={{ color: themeDetails.color2 }}>"{activeTheme.toUpperCase()}"</span></p>
                    <p>&#125;;</p>
                    <p className="text-slate-500 mt-2">// Render main app entry point</p>
                    <p><span className="text-blue-400">export default function</span> <span className="text-emerald-400">Portfolio</span>() &#123;</p>
                    <p className="pl-4">return (</p>
                    <p className="pl-8 text-slate-400">&lt;<span className="text-purple-400">MainLayout</span></p>
                    <p className="pl-12 text-slate-400">theme=<span className="text-brand-cyan">"{activeTheme}"</span></p>
                    <p className="pl-12 text-slate-400">responsive=<span className="text-brand-cyan">&#123;true&#125;</span></p>
                    <p className="pl-8 text-slate-400">/&gt;</p>
                    <p className="pl-4">);</p>
                    <p>&#125;</p>
                  </div>
                )}
              </div>

              {/* Bottom decorative bar */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Status: Active</span>
                </div>
                <span>React & Tailwind</span>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
