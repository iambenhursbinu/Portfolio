import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code, Terminal, Server, Sparkles, Cpu, Layers, Workflow, Cloud, Globe, Smartphone } from 'lucide-react';
import { ThemeType } from '../App';
import { SkillCategory, SkillItem } from '../types';

interface SkillsSectionProps {
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
  skills: SkillCategory[];
}

export default function SkillsSection({ activeTheme, themeDetails, skills }: SkillsSectionProps) {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const getCategoryIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('frontend') || lower.includes('web') || lower.includes('code')) return Code;
    if (lower.includes('ai') || lower.includes('workflow') || lower.includes('tool') || lower.includes('learn')) return Workflow;
    if (lower.includes('cloud') || lower.includes('infra') || lower.includes('network')) return Cloud;
    return Terminal;
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-brand-obsidian/40 border-t border-b border-white/5">
      {/* Decorative side lights matching theme */}
      <div 
        className="absolute top-[40%] -left-32 w-80 h-80 rounded-full blur-[80px] opacity-20 pointer-events-none"
        style={{ backgroundColor: themeDetails.color1 }} 
      />
      <div 
        className="absolute bottom-[20%] -right-32 w-80 h-80 rounded-full blur-[80px] opacity-20 pointer-events-none" 
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
              borderColor: `${themeDetails.color1}40`,
              color: themeDetails.color1
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-card text-xs font-mono uppercase tracking-widest mb-4"
          >
            <Cpu className="w-3.5 h-3.5" />
            Skills & Expertise
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold text-white font-sans tracking-tight"
          >
            My{' '}
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r"
              style={{ backgroundImage: `linear-gradient(to right, ${themeDetails.color1}, ${themeDetails.color2})` }}
            >
              Tech Stack
            </span>{' '}
            & Tools
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-400 text-sm md:text-base mt-3 font-sans"
          >
            Click any skill to view description and proficiency details.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {skills.map((category, catIdx) => {
            const Icon = getCategoryIcon(category.title);
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="liquid-glass-card rounded-[24px] p-6 relative overflow-hidden group hover:border-white/20 transition-all duration-300"
                id={`skills-category-${catIdx}`}
              >
                {/* Visual Glass Shimmer Glow */}
                <div 
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[40px] opacity-10 group-hover:opacity-25 transition-all duration-300 pointer-events-none"
                  style={{ backgroundColor: catIdx === 0 ? themeDetails.color1 : catIdx === 1 ? themeDetails.color2 : '#ffffff' }}
                />

                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                  <div 
                    className="p-2.5 rounded-xl text-brand-obsidian shadow-lg animate-pulse"
                    style={{ background: `linear-gradient(135deg, ${themeDetails.color1}, ${themeDetails.color2})` }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-lg text-white font-sans tracking-tight">
                    {category.title}
                  </h3>
                </div>

                {/* Skill List inside Category */}
                <div className="space-y-3.5">
                  {category.skills.map((skill, skillIdx) => {
                    const isSelected = selectedSkill?.name === skill.name;
                    return (
                      <div
                        key={skill.name}
                        onClick={() => setSelectedSkill(isSelected ? null : skill)}
                        className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-start relative group/skill ${
                          isSelected
                            ? 'bg-white/10 border-white/25 shadow-inner'
                            : 'bg-white/[0.01] border-white/5 hover:border-white/15 hover:bg-white/[0.03]'
                        }`}
                        id={`skill-item-${catIdx}-${skillIdx}`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-bold text-xs md:text-sm text-slate-200 group-hover/skill:text-white transition-colors duration-200 font-sans">
                            {skill.name}
                          </span>
                          <span 
                            style={{ 
                              color: isSelected ? themeDetails.color1 : undefined,
                              backgroundColor: isSelected ? `${themeDetails.color1}15` : undefined
                            }}
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 text-slate-400 group-hover/skill:bg-white/10 transition-all duration-300"
                          >
                            {skill.level}
                          </span>
                        </div>

                        {/* Expandable Explanation with micro motion animation */}
                        <div 
                          className={`overflow-hidden transition-all duration-300 ${
                            isSelected ? 'max-h-24 mt-2' : 'max-h-0'
                          }`}
                        >
                          <p className="text-xs text-slate-400 font-sans leading-relaxed pt-2 border-t border-white/5">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Optional helper text */}
        <div className="text-center mt-12">
          <p className="text-xs font-mono text-slate-500">
            * Continually learning and adapting to new technologies.
          </p>
        </div>

      </div>
    </section>
  );
}
