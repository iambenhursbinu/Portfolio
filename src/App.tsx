import React, { useState, useEffect } from 'react';
import FloatingNavbar from './components/FloatingNavbar';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import CertificationsSection from './components/CertificationsSection';
import ContactSection from './components/ContactSection';
import AdminPortal from './components/AdminPortal';
import Toast from './components/Toast';
import { AnimatePresence } from 'motion/react';
import { Palette, Sparkles, Image, Check } from 'lucide-react';
import { defaultPortfolioData } from './data/defaultData';
import { PortfolioData } from './types';
import { db } from './firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}

export type ThemeType = 'payrix' | 'mint' | 'cyber' | 'sunset';

export default function App() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [activeTheme, setActiveTheme] = useState<ThemeType>('payrix');
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('portfolio_data_binutex');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback to default
      }
    }
    return defaultPortfolioData;
  });
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('portfolio_admin_auth') === 'true';
  });

  const triggerToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  // Synchronize with Firebase Firestore in real-time across devices
  useEffect(() => {
    const docRef = doc(db, 'portfolio', 'main');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as PortfolioData;
        setPortfolioData(data);
        localStorage.setItem('portfolio_data_binutex', JSON.stringify(data));
      } else {
        // Document doesn't exist yet, initialize it with the current portfolio data
        setDoc(docRef, portfolioData).catch((err) => {
          console.error("Error initializing Firestore document:", err);
        });
      }
    }, (error) => {
      console.error("Firestore snapshot listener error:", error);
    });

    return () => unsubscribe();
  }, []);

  const handleSavePortfolioData = async (newData: PortfolioData) => {
    setPortfolioData(newData);
    localStorage.setItem('portfolio_data_binutex', JSON.stringify(newData));
    try {
      const docRef = doc(db, 'portfolio', 'main');
      await setDoc(docRef, newData);
      triggerToast('Portfolio saved and synced to cloud successfully!', 'success');
    } catch (error) {
      console.error("Error saving portfolio data to Firestore:", error);
      triggerToast('Saved locally, but failed to sync to cloud.', 'error');
    }
  };

  const handleScrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Define styling theme maps
  const themeDetails = {
    payrix: {
      color1: '#0ea5e9',
      color2: '#f97316',
      alpha1: 'rgba(14, 165, 233, 0.18)',
      alpha2: 'rgba(249, 115, 22, 0.18)',
      text: 'from-[#0ea5e9] via-white to-[#f97316]',
      glow: 'rgba(14, 165, 233, 0.45)',
      glowDim: 'rgba(14, 165, 233, 0.15)'
    },
    mint: {
      color1: '#10b981',
      color2: '#06b6d4',
      alpha1: 'rgba(16, 185, 129, 0.18)',
      alpha2: 'rgba(6, 182, 212, 0.18)',
      text: 'from-[#10b981] via-white to-[#06b6d4]',
      glow: 'rgba(16, 185, 129, 0.45)',
      glowDim: 'rgba(16, 185, 129, 0.15)'
    },
    cyber: {
      color1: '#00f0ff',
      color2: '#8b5cf6',
      alpha1: 'rgba(0, 240, 255, 0.18)',
      alpha2: 'rgba(139, 92, 246, 0.18)',
      text: 'from-[#00f0ff] via-white to-[#8b5cf6]',
      glow: 'rgba(0, 240, 255, 0.45)',
      glowDim: 'rgba(0, 240, 255, 0.15)'
    },
    sunset: {
      color1: '#f43f5e',
      color2: '#3b82f6',
      alpha1: 'rgba(244, 63, 94, 0.18)',
      alpha2: 'rgba(59, 130, 246, 0.18)',
      text: 'from-[#f43f5e] via-white to-[#3b82f6]',
      glow: 'rgba(244, 63, 94, 0.45)',
      glowDim: 'rgba(244, 63, 94, 0.15)'
    }
  };

  // Inject CSS Custom Properties when theme changes
  useEffect(() => {
    const root = document.documentElement;
    const current = themeDetails[activeTheme];
    root.style.setProperty('--theme-color-1', current.color1);
    root.style.setProperty('--theme-color-2', current.color2);
    root.style.setProperty('--theme-color-1-alpha', current.alpha1);
    root.style.setProperty('--theme-color-2-alpha', current.alpha2);
    root.style.setProperty('--theme-color-1-glow', current.glow);
    root.style.setProperty('--theme-color-1-glow-dim', current.glowDim);
  }, [activeTheme]);

  return (
    <div 
      className="min-h-screen bg-brand-obsidian text-slate-100 font-sans relative selection:bg-brand-cyan selection:text-brand-obsidian overflow-x-hidden" 
      id="app-container"
    >
      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Dynamic Floating Mesh Overlay inspired by the fluid Payrix Glass designs */}
      <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none animate-float-slow opacity-60" style={{ backgroundColor: themeDetails[activeTheme].color1 + '1c' }} />
      <div className="absolute top-[30%] right-[5%] w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none animate-pulse opacity-50" style={{ animationDelay: '2.5s', backgroundColor: themeDetails[activeTheme].color2 + '18' }} />
      <div className="absolute bottom-[5%] left-[15%] w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none animate-float-slow opacity-65" style={{ animationDelay: '5s', backgroundColor: themeDetails[activeTheme].color1 + '1a' }} />
      <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none animate-pulse opacity-50" style={{ animationDelay: '7.5s', backgroundColor: themeDetails[activeTheme].color2 + '15' }} />

      {/* Floating Glass Navbar */}
      <FloatingNavbar 
        onHireClick={() => handleScrollTo('#contact')} 
        activeTheme={activeTheme}
        onChangeTheme={(theme) => {
          setActiveTheme(theme);
          triggerToast(`Theme switched to ${theme.toUpperCase()} style!`, 'success');
        }}
        onAdminClick={() => setIsAdminOpen(true)}
      />

      {/* Sleek Floating Theme Switcher Widget (Desktop & Mobile) */}
      <div className="fixed bottom-6 left-6 z-40">
        <div className="relative">
          <button
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            className="w-12 h-12 rounded-full glass-btn flex items-center justify-center text-white hover:text-brand-cyan shadow-xl cursor-pointer"
            title="Switch Visual Vibe / Theme"
            id="theme-trigger-btn"
          >
            <Palette className="w-5 h-5" style={{ color: themeDetails[activeTheme].color1 }} />
          </button>

          <AnimatePresence>
            {isThemeMenuOpen && (
              <div 
                className="absolute bottom-14 left-0 w-48 rounded-2xl liquid-glass-card p-3 space-y-2 border border-white/10"
                id="theme-selector-dropdown"
              >
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest pb-1.5 mb-1.5 border-b border-white/5">
                  Select Theme
                </div>
                {(['payrix', 'mint', 'cyber', 'sunset'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setActiveTheme(t);
                      setIsThemeMenuOpen(false);
                      triggerToast(`Theme switched to ${t === 'payrix' ? 'PAYRIX' : t.toUpperCase()} style!`, 'success');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-between transition-all cursor-pointer ${
                      activeTheme === t 
                        ? 'bg-white/10 text-white' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: themeDetails[t].color1 }} />
                      <span className="capitalize">{t === 'payrix' ? 'Payrix (Blue-Orange)' : t === 'mint' ? 'Mint Glass' : t}</span>
                    </span>
                    {activeTheme === t && <Check className="w-3.5 h-3.5 text-brand-cyan" style={{ color: themeDetails[t].color1 }} />}
                  </button>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Sections */}
      <main className="relative z-10" id="main-content">
        
        {/* Hero Section */}
        <HeroSection 
          onContactClick={() => handleScrollTo('#contact')} 
          onProjectsClick={() => handleScrollTo('#projects')} 
          activeTheme={activeTheme}
          themeDetails={themeDetails[activeTheme]}
          profile={portfolioData.profile}
          profilePhoto={portfolioData.profilePhoto}
          onUpdatePhoto={(url) => {
            const updated = { ...portfolioData, profilePhoto: url };
            handleSavePortfolioData(updated);
          }}
          isAdminAuthenticated={isAdminAuthenticated}
          onAdminLoginClick={() => setIsAdminOpen(true)}
        />

        {/* Tech Stack & Skills Grid */}
        <SkillsSection 
          activeTheme={activeTheme} 
          themeDetails={themeDetails[activeTheme]} 
          skills={portfolioData.skills}
        />

        {/* Featured Projects Section */}
        <ProjectsSection 
          activeTheme={activeTheme} 
          themeDetails={themeDetails[activeTheme]} 
          projects={portfolioData.projects}
        />

        {/* Certifications Section */}
        <CertificationsSection 
          activeTheme={activeTheme} 
          themeDetails={themeDetails[activeTheme]} 
          certifications={portfolioData.certifications}
        />

        {/* Contact & Footer Section */}
        <ContactSection 
          onShowToast={triggerToast} 
          activeTheme={activeTheme} 
          themeDetails={themeDetails[activeTheme]} 
          onAdminClick={() => setIsAdminOpen(true)}
          profile={portfolioData.profile}
        />

      </main>

      {/* Dynamic Admin Login & Portfolio Management Console Modal */}
      <AdminPortal 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        portfolioData={portfolioData}
        onSave={handleSavePortfolioData}
        onShowToast={triggerToast}
        themeDetails={themeDetails[activeTheme]}
        isAuthenticated={isAdminAuthenticated}
        onAuthChange={setIsAdminAuthenticated}
      />

      {/* Micro-interaction Toasts Feedback */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

