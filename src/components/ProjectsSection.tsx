import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Monitor, Layout, ArrowRight, Settings, Plus, Users, BarChart3, Radio, Power, Eye, CheckCircle, Terminal } from 'lucide-react';
import { ThemeType } from '../App';
import { Project } from '../types';

interface ProjectsSectionProps {
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
  projects: Project[];
}

export default function ProjectsSection({ activeTheme, themeDetails, projects }: ProjectsSectionProps) {
  const [activeProject, setActiveProject] = useState<number>(1);
  const [pingState, setPingState] = useState<'idle' | 'pinging' | 'success'>('idle');

  // Kanban state for Project 1 Mockup
  const [kanbanTasks, setKanbanTasks] = useState([
    { id: 1, text: 'Complete Auth Module', status: 'done' },
    { id: 2, text: 'Optimize Recharts FPS', status: 'review' },
    { id: 3, text: 'Integrate Live Chat Help', status: 'todo' },
  ]);

  // Move Kanban task around in the interactive mockup
  const cycleKanbanTask = (id: number) => {
    setKanbanTasks(prev => prev.map(task => {
      if (task.id === id) {
        const nextStatus = task.status === 'todo' ? 'review' : task.status === 'review' ? 'done' : 'todo';
        return { ...task, status: nextStatus };
      }
      return task;
    }));
  };

  // CNC operations state for Project 2 Mockup
  const [cncMachineStatus, setCncMachineStatus] = useState<'Active' | 'Idle' | 'Maintenance'>('Active');
  const [rpm, setRpm] = useState(4800);
  const [temperature, setTemperature] = useState(62);

  // Handler to cycle through mock statuses in the CNC component
  const cycleCncStatus = () => {
    if (cncMachineStatus === 'Active') {
      setCncMachineStatus('Idle');
      setRpm(1200);
      setTemperature(42);
    } else if (cncMachineStatus === 'Idle') {
      setCncMachineStatus('Maintenance');
      setRpm(0);
      setTemperature(24);
    } else {
      setCncMachineStatus('Active');
      setRpm(5200);
      setTemperature(65);
    }
  };

  const handlePingTest = () => {
    setPingState('pinging');
    setTimeout(() => {
      setPingState('success');
    }, 1500);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-brand-obsidian">
      {/* Dynamic Background mesh glows */}
      <div 
        className="absolute top-[10%] right-[15%] w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none" 
        style={{ backgroundColor: themeDetails.color1 }}
      />
      <div 
        className="absolute bottom-[10%] left-[15%] w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ backgroundColor: themeDetails.color2 }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div 
              style={{ 
                borderColor: `${themeDetails.color1}30`,
                color: themeDetails.color1
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-card text-xs font-mono uppercase tracking-widest mb-4"
            >
              <Layout className="w-3.5 h-3.5" />
              Featured Works
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-sans">
              Featured{' '}
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r"
                style={{ backgroundImage: `linear-gradient(to right, ${themeDetails.color1}, ${themeDetails.color2})` }}
              >
                Projects
              </span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl font-sans">
              Explore responsive web applications that focus on clean user interface design and high-performance frontend engineering.
            </p>
          </div>

          {/* Quick tab switchers */}
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10 overflow-x-auto max-w-full scrollbar-none">
            {projects.map((proj) => {
              const isActive = activeProject === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    setActiveProject(proj.id);
                    setPingState('idle');
                  }}
                  style={{
                    background: isActive ? `linear-gradient(135deg, ${themeDetails.color1}15, ${themeDetails.color2}15)` : undefined,
                    borderColor: isActive ? `${themeDetails.color1}30` : 'transparent'
                  }}
                  className={`px-4 py-2 text-xs md:text-sm font-bold rounded-lg transition-all duration-300 border cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? 'text-white' 
                      : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                  id={`project-tab-${proj.id}`}
                >
                  Project 0{proj.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Layout Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Side: Information */}
          <div className="lg:col-span-6 flex flex-col justify-between" id="project-details">
            <AnimatePresence mode="wait">
              {projects.map((proj) => proj.id === activeProject && (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <span 
                      style={{ color: themeDetails.color1 }}
                      className="font-mono text-xs tracking-wider font-extrabold uppercase"
                    >
                      {proj.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-1 font-sans">
                      {proj.title}
                    </h3>
                  </div>

                  {/* Highlights Bullet List inside liquid glass panel */}
                  <div className="space-y-3.5 bg-white/[0.01] border border-white/10 p-5 rounded-2xl liquid-glass-card">
                    <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">Key Pillars & Highlights</h4>
                    <ul className="space-y-2.5">
                      {proj.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed font-sans">
                          <CheckCircle className="mt-1 w-4 h-4 shrink-0" style={{ color: themeDetails.color1 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2">
                    {proj.techStack.map((tech) => (
                      <span 
                        key={tech} 
                        style={{ borderColor: `${themeDetails.color1}20` }}
                        className="px-3 py-1 rounded-md text-[11px] font-mono font-bold bg-brand-obsidian border text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 pt-4">
                    <a
                      href={proj.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      style={{ 
                        background: `linear-gradient(135deg, ${themeDetails.color1}, ${themeDetails.color2})`,
                        boxShadow: `0 8px 24px ${themeDetails.glowDim}`
                      }}
                      className="px-6 py-3 rounded-xl text-brand-obsidian font-extrabold text-sm flex items-center gap-2 tracking-wide transition-all duration-300 hover:brightness-110 cursor-pointer"
                      id={`project-${proj.id}-live-link`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                    <a
                      href={proj.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold text-sm flex items-center gap-2 transition-all duration-300 cursor-pointer"
                      id={`project-${proj.id}-github-link`}
                    >
                      <Github className="w-4 h-4" />
                      GitHub Code
                    </a>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Side: High-fidelity interactive widget mockup preview card */}
          <div className="lg:col-span-6 flex flex-col justify-center" id="project-interactive-preview">
            <div 
              className="relative rounded-3xl p-[1px] shadow-2xl h-full min-h-[380px] flex flex-col justify-between overflow-hidden transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.05) 100%)`,
                boxShadow: `0 25px 50px rgba(0,0,0,0.7), 0 0 35px ${themeDetails.glowDim}`
              }}
            >
              {/* Dynamic Gradient glow mesh background inside the preview */}
              <div 
                className="absolute top-0 right-0 w-48 h-48 blur-[40px] pointer-events-none transition-all duration-500" 
                style={{ background: `radial-gradient(circle, ${themeDetails.color1}25 0%, transparent 70%)` }}
              />
              
              {/* Mockup Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono text-slate-400 font-bold">interactive_preview_widget</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: themeDetails.color1 }} />
                  <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest font-bold">
                    {activeProject === 1 ? 'Kanban View' : activeProject === 2 ? 'CNC Panel View' : 'Deployment Terminal'}
                  </span>
                </div>
              </div>

              {/* Dynamic Mockup Body */}
              <div className="p-6 flex-1 flex flex-col justify-center bg-[#07080c]/90">
                {activeProject === 1 ? (
                  /* BUSINESS DASHBOARD KANBAN BOARD PREVIEW */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2 font-bold">
                      <span>Click items to cycle statuses:</span>
                      <span style={{ color: themeDetails.color1 }}>Todo ➜ Review ➜ Done</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {/* TODO Column */}
                      <div className="space-y-2 bg-black/40 p-2.5 rounded-xl border border-white/5">
                        <div className="text-[10px] font-bold font-mono text-slate-400 flex items-center gap-1 uppercase">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          Todo
                        </div>
                        <div className="space-y-2 min-h-[120px]">
                          {kanbanTasks.filter(t => t.status === 'todo').map(task => (
                            <motion.div
                              layoutId={`kanban-${task.id}`}
                              key={task.id}
                              onClick={() => cycleKanbanTask(task.id)}
                              className="p-2 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all cursor-pointer text-[10px] text-slate-200 font-sans"
                            >
                              {task.text}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* REVIEW Column */}
                      <div className="space-y-2 bg-black/40 p-2.5 rounded-xl border border-white/5">
                        <div className="text-[10px] font-bold font-mono text-slate-400 flex items-center gap-1 uppercase">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeDetails.color1 }} />
                          Review
                        </div>
                        <div className="space-y-2 min-h-[120px]">
                          {kanbanTasks.filter(t => t.status === 'review').map(task => (
                            <motion.div
                              layoutId={`kanban-${task.id}`}
                              key={task.id}
                              onClick={() => cycleKanbanTask(task.id)}
                              style={{ borderColor: `${themeDetails.color1}30` }}
                              className="p-2 rounded-lg bg-white/[0.03] border hover:bg-white/[0.05] transition-all cursor-pointer text-[10px] text-slate-200 font-sans"
                            >
                              {task.text}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* DONE Column */}
                      <div className="space-y-2 bg-black/40 p-2.5 rounded-xl border border-white/5">
                        <div className="text-[10px] font-bold font-mono text-slate-400 flex items-center gap-1 uppercase">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Done
                        </div>
                        <div className="space-y-2 min-h-[120px]">
                          {kanbanTasks.filter(t => t.status === 'done').map(task => (
                            <motion.div
                              layoutId={`kanban-${task.id}`}
                              key={task.id}
                              onClick={() => cycleKanbanTask(task.id)}
                              className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-white/[0.05] transition-all cursor-pointer text-[10px] text-emerald-300 font-sans font-semibold"
                            >
                              {task.text}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : activeProject === 2 ? (
                  /* CNC OPERATIONS IoT DASHBOARD PREVIEW */
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-4 relative overflow-hidden">
                      {/* Active Status Display */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/5">
                        <div className="flex items-center gap-2">
                          <Radio 
                            className="w-4 h-4 animate-pulse" 
                            style={{ color: themeDetails.color2 }}
                          />
                          <span className="text-xs font-mono font-bold text-slate-300">CNC Machine No. 12</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase transition-all duration-300 ${
                          cncMachineStatus === 'Active' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                            : cncMachineStatus === 'Idle' 
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}>
                          {cncMachineStatus}
                        </span>
                      </div>

                      {/* Gauges */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-brand-obsidian/40 p-3 rounded-xl border border-white/5 text-center">
                          <span className="text-[10px] font-mono text-slate-400 block">Spindle Speed</span>
                          <span className="text-sm md:text-base font-mono font-bold text-white mt-1 block">
                            {rpm.toLocaleString()} <span style={{ color: themeDetails.color1 }} className="text-[10px] font-bold">RPM</span>
                          </span>
                        </div>
                        <div className="bg-brand-obsidian/40 p-3 rounded-xl border border-white/5 text-center">
                          <span className="text-[10px] font-mono text-slate-400 block">Temperature</span>
                          <span className="text-sm md:text-base font-mono font-bold text-white mt-1 block">
                            {temperature}°C
                          </span>
                        </div>
                      </div>

                      {/* Interactive Button */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={cycleCncStatus}
                          style={{ backgroundColor: themeDetails.color2 }}
                          className="px-4 py-2 text-brand-obsidian text-xs font-black rounded-xl flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                          <Power className="w-3.5 h-3.5" />
                          Cycle CNC State
                        </button>
                        <span className="text-[9px] font-mono text-slate-500 font-bold">
                          Click to toggle state
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* UNIVERSAL TERMINAL PREVIEW FOR CUSTOM PROJECTS */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1 font-bold">
                      <span>Server Integration test:</span>
                      <span className="text-brand-cyan">● Handshake Node</span>
                    </div>

                    <div className="bg-black/40 p-4 rounded-2xl border border-white/10 space-y-4 relative overflow-hidden">
                      <div className="bg-brand-obsidian/60 p-3 rounded-xl border border-white/5 font-mono text-[10px] text-slate-300 space-y-1.5 leading-relaxed">
                        <p className="text-slate-500">&gt; curl -I -L {projects.find(p => p.id === activeProject)?.liveLink || 'https://domain.app'}</p>
                        {pingState === 'idle' && (
                          <p className="text-slate-400">&gt; [Press "Run Health Check" to trace handshake]</p>
                        )}
                        {pingState === 'pinging' && (
                          <p className="text-amber-300 animate-pulse">&gt; HANDSHAKE: Resolving DNS record... routing active...</p>
                        )}
                        {pingState === 'success' && (
                          <>
                            <p className="text-emerald-400">&gt; HTTP/2 200 OK • SSL Verified via Cloudflare</p>
                            <p className="text-brand-cyan">&gt; Server Response: "Active Frontend Node running flawlessly on Client Port"</p>
                          </>
                        )}
                      </div>

                      {/* Interactive Button */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={handlePingTest}
                          style={{ 
                            background: `linear-gradient(135deg, ${themeDetails.color1}, ${themeDetails.color2})`,
                          }}
                          className="px-4 py-2 text-brand-obsidian text-xs font-black rounded-xl flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          {pingState === 'pinging' ? 'Checking...' : pingState === 'success' ? 'Re-run Check' : 'Run Health Check'}
                        </button>
                        <span className="text-[9px] font-mono text-slate-500 font-bold">
                          Ping project server
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mockup Footer Info */}
              <div className="px-6 py-4 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1 font-bold" style={{ color: themeDetails.color1 }}>
                  <Monitor className="w-3.5 h-3.5" />
                  Interactive Component Demo
                </span>
                <span className="text-slate-500 font-bold">binutex.vercel.app</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
