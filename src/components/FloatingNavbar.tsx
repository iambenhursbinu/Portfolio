import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { ThemeType } from '../App';

interface FloatingNavbarProps {
  onHireClick: () => void;
  activeTheme: ThemeType;
  onChangeTheme: (theme: ThemeType) => void;
  onAdminClick: () => void;
}

export default function FloatingNavbar({ onHireClick, activeTheme, onChangeTheme, onAdminClick }: FloatingNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple intersection tracker
      const sections = navItems.map(item => item.href.substring(1));
      let currentSection = 'about';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetEl = document.querySelector(href);
    if (targetEl) {
      const offset = 80;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 px-4 md:px-12' 
          : 'py-5 px-4 md:px-12'
      }`}
      id="main-header"
    >
      <div 
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          isScrolled 
            ? 'glass-navbar px-6 py-2.5 shadow-2xl shadow-black/60 border border-white/10' 
            : 'px-4 py-3 bg-transparent border border-transparent'
        } flex items-center justify-between`}
      >
        {/* Brand Name */}
        <a 
          href="#about"
          onClick={(e) => handleNavClick(e, '#about')}
          className="flex items-center gap-2 group cursor-pointer"
          id="nav-logo"
        >
          <div 
            className="w-10 h-10 rounded-xl p-[1px] shadow-lg transition-all duration-300"
            style={{ 
              background: 'linear-gradient(135deg, var(--theme-color-1), var(--theme-color-2))',
              boxShadow: '0 4px 14px var(--theme-color-1-glow-dim)'
            }}
          >
            <div className="w-full h-full bg-brand-obsidian rounded-[11px] flex items-center justify-center font-black text-sm text-white font-mono">
              B
            </div>
          </div>
          <span className="font-black tracking-wider text-xl text-white group-hover:text-[var(--theme-color-1)] transition-colors duration-300">
            BINU<span style={{ color: 'var(--theme-color-2)' }}>.DEV</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1" id="desktop-nav">
          {navItems.map((item) => {
            const isCurrent = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                style={{ color: isCurrent ? 'var(--theme-color-1)' : undefined }}
                className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-lg hover:text-white ${
                  isCurrent ? 'text-white' : 'text-slate-400'
                }`}
              >
                {item.label}
                {isCurrent && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-[2px]"
                    style={{ background: 'linear-gradient(90deg, var(--theme-color-1), var(--theme-color-2))' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA Actions Container */}
        <div className="flex items-center gap-3">
          {/* Admin Lock Button (Visible on both Mobile and Desktop) */}
          <button
            onClick={onAdminClick}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95 duration-200"
            title="Admin Login Portal"
            id="nav-admin-btn"
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Hire Me (Desktop Only) */}
          <div className="hidden md:block">
            <button
              onClick={onHireClick}
              style={{ 
                background: 'linear-gradient(135deg, var(--theme-color-1), var(--theme-color-2))',
              }}
              className="px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide text-brand-obsidian shadow-lg hover:brightness-110 transition-all duration-300 flex items-center gap-1.5 cursor-pointer font-sans"
              id="nav-hire-btn"
            >
              Hire Me
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

