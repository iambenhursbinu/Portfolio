import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Copy, Check, Send, Linkedin, Github, Sparkles } from 'lucide-react';
import { ThemeType } from '../App';
import { ProfileData } from '../types';

interface ContactSectionProps {
  onShowToast: (msg: string, type: 'success' | 'error' | 'info') => void;
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
  onAdminClick?: () => void;
  profile: ProfileData;
}

export default function ContactSection({ onShowToast, activeTheme, themeDetails, onAdminClick, profile }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const emailAddress = profile.email || 'iambenhursbinu@gmail.com';
  const phoneNumber = '+91 63744 23511';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    onShowToast('Email copied to clipboard successfully!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast('Please fill out all the fields in the contact form.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate server side transaction
    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast(`Message sent! ${profile.name} will get in touch with you soon.`, 'success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-brand-obsidian">
      {/* Dynamic glow mesh backgrounds */}
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none" 
        style={{ backgroundColor: themeDetails.color2 }}
      />
      <div 
        className="absolute top-[20%] right-0 w-80 h-80 rounded-full blur-[100px] opacity-10 pointer-events-none" 
        style={{ backgroundColor: themeDetails.color1 }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ 
              borderColor: `${themeDetails.color1}30`,
              color: themeDetails.color1
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-card text-xs font-mono uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            Let's Collaborate
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-sans"
          >
            Connect{' '}
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r"
              style={{ backgroundImage: `linear-gradient(to right, ${themeDetails.color1}, ${themeDetails.color2})` }}
            >
              With Me
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-400 text-sm md:text-base mt-2 font-sans"
          >
            Feel free to reach out for collaborations, job opportunities, or project inquiries.
          </motion.p>
        </div>

        {/* Info & Form Content block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Left Column: Coordinates */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
            id="contact-info"
          >
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-white tracking-tight font-sans">
                Contact Coordinates
              </h3>

              <div className="space-y-4">
                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-xl liquid-glass-card border-white/5">
                  <div 
                    className="p-3 rounded-lg text-brand-obsidian shrink-0"
                    style={{ background: `linear-gradient(135deg, ${themeDetails.color1}, ${themeDetails.color2})` }}
                  >
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Location</span>
                    <span className="text-sm text-slate-200 font-bold font-sans">{profile.location}</span>
                  </div>
                </div>

                {/* Email (with Copy action) */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl liquid-glass-card border-white/5 relative group">
                  <div className="flex items-center gap-4">
                    <div 
                      className="p-3 rounded-lg text-brand-obsidian shrink-0"
                      style={{ background: `linear-gradient(135deg, ${themeDetails.color1}, ${themeDetails.color2})` }}
                    >
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Email</span>
                      <span className="text-xs md:text-sm text-slate-200 font-mono font-bold">{emailAddress}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCopyEmail}
                    style={{ borderColor: copied ? themeDetails.color1 : undefined }}
                    className="p-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-brand-cyan/40 transition-all duration-300 cursor-pointer flex items-center justify-center"
                    title="Copy Email Address"
                    id="copy-email-btn"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 p-4 rounded-xl liquid-glass-card border-white/5">
                  <div 
                    className="p-3 rounded-lg text-brand-obsidian shrink-0"
                    style={{ background: `linear-gradient(135deg, ${themeDetails.color1}, ${themeDetails.color2})` }}
                  >
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Phone</span>
                    <span className="text-sm text-slate-200 font-mono font-bold">{phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social channels and brief bio info */}
            <div className="space-y-4 pt-8 lg:pt-0">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Digital Footprints</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com/in/benhurs-binu"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="p-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-brand-cyan/40 transition-all duration-300 cursor-pointer flex items-center gap-2 font-mono text-xs font-bold"
                  id="linkedin-profile-link"
                >
                  <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/benhursbinu"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="p-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-brand-violet/40 transition-all duration-300 cursor-pointer flex items-center gap-2 font-mono text-xs font-bold"
                  id="github-profile-link"
                >
                  <Github className="w-4 h-4 text-white" />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: `linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)`,
              boxShadow: `0 30px 60px rgba(0,0,0,0.8), 0 0 40px ${themeDetails.glowDim}`
            }}
            className="lg:col-span-7 p-6 md:p-8 rounded-[32px] border border-white/15 relative"
            id="contact-form-container"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-tr from-brand-cyan/5 to-brand-violet/5 blur-2xl pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0a0b10] text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/45 transition-all text-sm font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. johndoe@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0a0b10] text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/45 transition-all text-sm font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold" htmlFor="message">
                  Brief Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter your message here..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0a0b10] text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/45 transition-all text-sm font-sans resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ 
                  background: `linear-gradient(135deg, ${themeDetails.color1}, ${themeDetails.color2})`,
                  boxShadow: `0 8px 24px ${themeDetails.glowDim}`
                }}
                className="w-full py-4 rounded-xl text-brand-obsidian hover:brightness-110 active:scale-95 transition-all duration-300 font-black text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                id="contact-submit-btn"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-brand-obsidian border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

        {/* Footer info & copyrights */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 font-bold">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Status: Available for work</span>
            {onAdminClick && (
              <>
                <span className="text-slate-700">•</span>
                <button
                  onClick={onAdminClick}
                  className="hover:text-white transition-colors duration-200 cursor-pointer text-slate-400 font-bold"
                  id="footer-admin-btn"
                >
                  Admin Login
                </button>
              </>
            )}
          </div>
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>
          <div className="text-slate-400 flex items-center gap-1">
            <span>Built with</span>
            <span className="font-black" style={{ color: themeDetails.color1 }}>React & Tailwind</span>
          </div>
        </div>

      </div>
    </section>
  );
}
