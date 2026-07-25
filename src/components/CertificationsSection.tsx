import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, CheckCircle, ExternalLink, Sparkles, Cpu, CloudLightning } from 'lucide-react';
import { ThemeType } from '../App';
import { Certification } from '../types';

interface CertificationsSectionProps {
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
  certifications: Certification[];
}

export default function CertificationsSection({ activeTheme, themeDetails, certifications }: CertificationsSectionProps) {

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-brand-obsidian/20 border-b border-white/5">
      {/* Decorative Radial Grid */}
      <div 
        className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-25" 
        style={{ backgroundColor: themeDetails.color2 }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Section Heading */}
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
            <Award className="w-3.5 h-3.5" />
            Industry Standards
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-sans"
          >
            Microsoft{' '}
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r"
              style={{ backgroundImage: `linear-gradient(to right, ${themeDetails.color1}, ${themeDetails.color2})` }}
            >
              Certifications
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-400 text-sm md:text-base mt-2 font-sans"
          >
            Official cloud and artificial intelligence credentials issued directly by Microsoft.
          </motion.p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-[1px] rounded-[24px] overflow-hidden shadow-2xl group cursor-pointer transition-all duration-500 hover:border-white/20"
              style={{
                background: `linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.03) 100%)`,
                boxShadow: `0 15px 35px rgba(0,0,0,0.6), 0 0 20px ${themeDetails.glowDim}`
              }}
              id={`cert-card-${idx}`}
            >
              {/* Animated Inner Shimmer */}
              <div className="absolute inset-0 shimmer opacity-25 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

              <div className="bg-[#07080c]/95 p-6 rounded-[23px] border border-white/5 h-full flex flex-col justify-between">
                
                {/* Gold/Silver Badge Head */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl p-[1px] flex items-center justify-center shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${themeDetails.color1}, ${themeDetails.color2})` }}
                    >
                      <div className="w-full h-full bg-brand-obsidian rounded-[11px] flex items-center justify-center">
                        {cert.badgeType === 'Gold' ? (
                          <Cpu className="w-5 h-5" style={{ color: themeDetails.color1 }} />
                        ) : (
                          <CloudLightning className="w-5 h-5" style={{ color: themeDetails.color2 }} />
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                        {cert.issuer}
                      </span>
                      <h3 className="font-extrabold text-sm md:text-base text-white tracking-tight leading-snug mt-0.5 group-hover:text-[var(--theme-color-1)] transition-colors duration-300 font-sans">
                        {cert.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 font-bold" />
                    <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase">Valid</span>
                  </div>
                </div>

                {/* Skills verified section */}
                <div className="space-y-3 mb-6 flex-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Skills Assessed</span>
                  <div className="space-y-1.5">
                    {cert.skillsVerified.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 text-xs text-slate-300 font-sans">
                        <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: themeDetails.color1 }} />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer detail */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500 font-bold">
                  <div>
                    ID: <span className="text-slate-300 font-bold">{cert.verificationId}</span>
                  </div>
                  <div className="flex items-center gap-1" style={{ color: themeDetails.color1 }}>
                    <span>Credentials</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Microsoft Badge footer decorative tag */}
        <div className="text-center mt-12">
          <p className="text-xs text-slate-500 font-mono">
            * Officially accredited Microsoft Certified Professional credentials.
          </p>
        </div>

      </div>
    </section>
  );
}
