import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Unlock, X, Save, LogOut, Plus, Trash2, 
  Sparkles, FileText, Cpu, Award, HardDrive, 
  Upload, Image as ImageIcon, CheckCircle, Sliders, Edit3
} from 'lucide-react';
import { PortfolioData, SkillCategory, Project, Certification, SkillItem } from '../types';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioData: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onShowToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  themeDetails: {
    color1: string;
    color2: string;
    alpha1: string;
    alpha2: string;
    text: string;
    glow: string;
    glowDim: string;
  };
  isAuthenticated: boolean;
  onAuthChange: (val: boolean) => void;
}

type AdminTab = 'profile' | 'skills' | 'projects' | 'certifications' | 'photo';

export default function AdminPortal({ 
  isOpen, 
  onClose, 
  portfolioData, 
  onSave, 
  onShowToast,
  themeDetails,
  isAuthenticated,
  onAuthChange
}: AdminPortalProps) {
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('profile');
  const [editedData, setEditedData] = useState<PortfolioData>({ ...portfolioData });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize internal form state when modal opens or raw state updates
  React.useEffect(() => {
    if (isOpen) {
      setEditedData(JSON.parse(JSON.stringify(portfolioData)));
    }
  }, [isOpen, portfolioData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'binu123') {
      onAuthChange(true);
      setLoginError('');
      localStorage.setItem('portfolio_admin_auth', 'true');
      onShowToast('Logged in as Admin successfully!', 'success');
    } else {
      setLoginError('Incorrect password. Please try again.');
      onShowToast('Access Denied: Invalid credentials.', 'error');
    }
  };

  const handleLogout = () => {
    onAuthChange(false);
    localStorage.removeItem('portfolio_admin_auth');
    onShowToast('Logged out of Admin Portal.', 'info');
  };

  const handleSave = () => {
    onSave(editedData);
    onShowToast('All modifications saved successfully!', 'success');
    onClose();
  };

  // Helper updaters
  const updateProfile = (field: keyof typeof editedData.profile, value: string) => {
    setEditedData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  // Process uploaded local image file to base64 with downscaling/compression to prevent Firestore size issues
  const processImageFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            
            // Set max dimension to 500px to keep it high-res yet very small in payload
            const maxDimension = 500;
            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              } else {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              // Compress to JPEG with 0.75 quality for super high optimization (usually ~20KB-40KB)
              const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
              
              setEditedData(prev => ({
                ...prev,
                profilePhoto: compressedBase64
              }));
              onShowToast('Profile image optimized and uploaded!', 'success');
            } else {
              setEditedData(prev => ({
                ...prev,
                profilePhoto: event.target?.result as string
              }));
              onShowToast('Profile image uploaded (uncompressed fallback).', 'info');
            }
          };
          img.onerror = () => {
            onShowToast('Error processing image for optimization.', 'error');
          };
          img.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    } else {
      onShowToast('Please select a valid image file.', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      
      {/* Background visual sparkles */}
      <div 
        className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ backgroundColor: themeDetails.color1 }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ backgroundColor: themeDetails.color2 }}
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-[24px] border border-white/10 bg-brand-obsidian/95 shadow-2xl overflow-hidden"
        id="admin-portal-card"
      >
        
        {/* Portal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
              style={{ background: `linear-gradient(135deg, ${themeDetails.color1}, ${themeDetails.color2})` }}
            >
              {isAuthenticated ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight font-sans">
                {isAuthenticated ? 'Admin Control Portal' : 'Admin Security Access'}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {isAuthenticated ? 'Modify portfolio layout & components in real-time' : 'Enter security credentials to continue'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            title="Close Portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SECURITY GATE / LOGIN SCREEN */}
        {!isAuthenticated ? (
          <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center text-center">
            <div className="max-w-md w-full liquid-glass-card p-8 border border-white/10 space-y-6">
              <div className="w-14 h-14 mx-auto rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Lock className="w-6 h-6 text-slate-300" style={{ color: themeDetails.color1 }} />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white font-sans">Enter Master Password</h3>
                <p className="text-xs text-slate-400">
                  Access is reserved solely for the portfolio owner <b className="text-white">Benhurs Binu R</b>.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Password</label>
                  <input 
                    type="password"
                    placeholder="Enter admin password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan placeholder-slate-500 font-sans"
                    autoFocus
                  />
                  {loginError && <p className="text-xs text-red-400 font-medium mt-1.5">{loginError}</p>}
                </div>



                <button
                  type="submit"
                  style={{ background: `linear-gradient(135deg, ${themeDetails.color1}, ${themeDetails.color2})` }}
                  className="w-full py-3.5 rounded-xl text-brand-obsidian font-extrabold text-sm tracking-wide shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  Unlock Admin Portal
                </button>
              </form>
            </div>
          </div>
        ) : (
          
          /* ADMIN DASHBOARD - FULL EDITING PANEL */
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 border-r border-white/10 bg-white/[0.02] p-4 flex flex-col justify-between gap-4">
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-3 mb-2">Sections</div>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2.5 transition-all cursor-pointer ${
                    activeTab === 'profile' 
                      ? 'bg-white/10 text-white border-l-2' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ borderLeftColor: activeTab === 'profile' ? themeDetails.color1 : 'transparent' }}
                >
                  <FileText className="w-4 h-4" style={{ color: activeTab === 'profile' ? themeDetails.color1 : undefined }} />
                  Profile & Bio
                </button>

                <button
                  onClick={() => setActiveTab('photo')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2.5 transition-all cursor-pointer ${
                    activeTab === 'photo' 
                      ? 'bg-white/10 text-white border-l-2' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ borderLeftColor: activeTab === 'photo' ? themeDetails.color1 : 'transparent' }}
                >
                  <ImageIcon className="w-4 h-4" style={{ color: activeTab === 'photo' ? themeDetails.color1 : undefined }} />
                  Profile Photo
                </button>

                <button
                  onClick={() => setActiveTab('skills')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2.5 transition-all cursor-pointer ${
                    activeTab === 'skills' 
                      ? 'bg-white/10 text-white border-l-2' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ borderLeftColor: activeTab === 'skills' ? themeDetails.color1 : 'transparent' }}
                >
                  <Cpu className="w-4 h-4" style={{ color: activeTab === 'skills' ? themeDetails.color1 : undefined }} />
                  Tech Skills
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2.5 transition-all cursor-pointer ${
                    activeTab === 'projects' 
                      ? 'bg-white/10 text-white border-l-2' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ borderLeftColor: activeTab === 'projects' ? themeDetails.color1 : 'transparent' }}
                >
                  <Sliders className="w-4 h-4" style={{ color: activeTab === 'projects' ? themeDetails.color1 : undefined }} />
                  My Projects
                </button>

                <button
                  onClick={() => setActiveTab('certifications')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2.5 transition-all cursor-pointer ${
                    activeTab === 'certifications' 
                      ? 'bg-white/10 text-white border-l-2' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ borderLeftColor: activeTab === 'certifications' ? themeDetails.color1 : 'transparent' }}
                >
                  <Award className="w-4 h-4" style={{ color: activeTab === 'certifications' ? themeDetails.color1 : undefined }} />
                  Certifications
                </button>
              </div>

              {/* Logout at bottom */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-all flex items-center gap-2.5 cursor-pointer mt-auto border border-rose-500/10"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>

            {/* Editing Screen Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[60vh] md:max-h-none">
              
              {/* TAB 1: PROFILE INFO */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div className="border-b border-white/5 pb-2 mb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Identity & Core Bio</h3>
                    <p className="text-xs text-slate-400">Update main display fields, location parameters, and contact values.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Full Name</label>
                      <input 
                        type="text"
                        value={editedData.profile.name}
                        onChange={(e) => updateProfile('name', e.target.value)}
                        className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Professional Title / Role</label>
                      <input 
                        type="text"
                        value={editedData.profile.role}
                        onChange={(e) => updateProfile('role', e.target.value)}
                        className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Location</label>
                      <input 
                        type="text"
                        value={editedData.profile.location}
                        onChange={(e) => updateProfile('location', e.target.value)}
                        className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Available Status Badge</label>
                      <input 
                        type="text"
                        value={editedData.profile.availableStatus}
                        onChange={(e) => updateProfile('availableStatus', e.target.value)}
                        className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Contact Email Address</label>
                    <input 
                      type="email"
                      value={editedData.profile.email}
                      onChange={(e) => updateProfile('email', e.target.value)}
                      className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Bio Description</label>
                    <textarea 
                      rows={4}
                      value={editedData.profile.bio}
                      onChange={(e) => updateProfile('bio', e.target.value)}
                      className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan font-sans leading-relaxed resize-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: PROFILE PHOTO */}
              {activeTab === 'photo' && (
                <div className="space-y-4">
                  <div className="border-b border-white/5 pb-2 mb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Profile Portrait Photo</h3>
                    <p className="text-xs text-slate-400">Set the exact photo you want visible on your portfolio. No edits needed, display your actual portrait directly.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border border-white/15 bg-black/40 flex items-center justify-center shrink-0">
                      {editedData.profilePhoto ? (
                        <img src={editedData.profilePhoto} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono">No Image</span>
                      )}
                    </div>

                    <div className="flex-1 w-full space-y-4">
                      {/* Direct drag drop / upload local photo */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Option A: Upload Image File</label>
                        <input 
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) processImageFile(e.target.files[0]);
                          }}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Upload className="w-3.5 h-3.5 text-brand-cyan" />
                          Choose photo from computer...
                        </button>
                      </div>

                      {/* URL Paste */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Option B: Paste Image URL</label>
                        <input 
                          type="url"
                          placeholder="Paste a direct image web link (e.g. from postimg, unsplash, etc.)"
                          value={editedData.profilePhoto}
                          onChange={(e) => setEditedData(prev => ({ ...prev, profilePhoto: e.target.value }))}
                          className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: TECH SKILLS */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="border-b border-white/5 pb-2 mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Tech Skills & Frameworks</h3>
                      <p className="text-xs text-slate-400">Modify expertise levels, categories, and descriptions.</p>
                    </div>
                  </div>

                  {editedData.skills.map((category, catIdx) => (
                    <div key={catIdx} className="liquid-glass-card p-4 border border-white/5 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <input 
                          type="text"
                          value={category.title}
                          onChange={(e) => {
                            const newSkills = [...editedData.skills];
                            newSkills[catIdx].title = e.target.value;
                            setEditedData(prev => ({ ...prev, skills: newSkills }));
                          }}
                          className="bg-transparent font-bold text-xs text-white font-sans focus:outline-none focus:border-brand-cyan pb-0.5 border-b border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newSkills = editedData.skills.filter((_, idx) => idx !== catIdx);
                            setEditedData(prev => ({ ...prev, skills: newSkills }));
                          }}
                          className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Skills listed under this category */}
                      <div className="space-y-3 pt-1">
                        {category.skills.map((skill, skillIdx) => (
                          <div key={skillIdx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                            <div className="sm:col-span-4">
                              <input 
                                type="text"
                                placeholder="Skill Name"
                                value={skill.name}
                                onChange={(e) => {
                                  const newSkills = [...editedData.skills];
                                  newSkills[catIdx].skills[skillIdx].name = e.target.value;
                                  setEditedData(prev => ({ ...prev, skills: newSkills }));
                                }}
                                className="w-full bg-[#0a0b10] border border-white/5 rounded-lg px-2 py-1 text-[11px] text-white font-bold"
                              />
                            </div>
                            <div className="sm:col-span-3">
                              <select
                                value={skill.level}
                                onChange={(e) => {
                                  const newSkills = [...editedData.skills];
                                  newSkills[catIdx].skills[skillIdx].level = e.target.value;
                                  setEditedData(prev => ({ ...prev, skills: newSkills }));
                                }}
                                className="w-full bg-[#0a0b10] border border-white/5 rounded-lg px-2 py-1 text-[11px] text-slate-300 focus:outline-none"
                              >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                              </select>
                            </div>
                            <div className="sm:col-span-4">
                              <input 
                                type="text"
                                placeholder="Brief description of experience..."
                                value={skill.description}
                                onChange={(e) => {
                                  const newSkills = [...editedData.skills];
                                  newSkills[catIdx].skills[skillIdx].description = e.target.value;
                                  setEditedData(prev => ({ ...prev, skills: newSkills }));
                                }}
                                className="w-full bg-[#0a0b10] border border-white/5 rounded-lg px-2 py-1 text-[11px] text-slate-300"
                              />
                            </div>
                            <div className="sm:col-span-1 flex justify-end">
                              <button
                                type="button"
                                onClick={() => {
                                  const newSkills = [...editedData.skills];
                                  newSkills[catIdx].skills = newSkills[catIdx].skills.filter((_, idx) => idx !== skillIdx);
                                  setEditedData(prev => ({ ...prev, skills: newSkills }));
                                }}
                                className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                                title="Remove Skill"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => {
                            const newSkills = [...editedData.skills];
                            newSkills[catIdx].skills.push({ name: '', level: 'Beginner', description: '' });
                            setEditedData(prev => ({ ...prev, skills: newSkills }));
                          }}
                          className="px-3 py-1.5 rounded-lg border border-dashed border-white/15 hover:border-white/20 text-slate-400 hover:text-white transition-all flex items-center gap-1.5 text-[10px] font-mono cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Skill
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      setEditedData(prev => ({
                        ...prev,
                        skills: [...prev.skills, { title: 'New Skill Category', skills: [] }]
                      }));
                    }}
                    className="w-full py-2.5 rounded-xl border border-dashed border-white/20 text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold cursor-pointer hover:bg-white/5"
                  >
                    <Plus className="w-4 h-4" /> Add New Skill Category Group
                  </button>
                </div>
              )}

              {/* TAB 4: MY PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="border-b border-white/5 pb-2 mb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Dynamic Projects</h3>
                    <p className="text-xs text-slate-400">Edit titles, stack lists, highlight descriptions, and links.</p>
                  </div>

                  {editedData.projects.map((project, projIdx) => (
                    <div key={project.id} className="liquid-glass-card p-4 border border-white/5 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest px-2.5 py-1 rounded bg-brand-cyan/10 border border-brand-cyan/20">
                          Project #{project.id}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const newProjects = editedData.projects.filter(p => p.id !== project.id);
                            setEditedData(prev => ({ ...prev, projects: newProjects }));
                          }}
                          className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Project Name</label>
                          <input 
                            type="text"
                            value={project.title}
                            onChange={(e) => {
                              const newProjects = [...editedData.projects];
                              newProjects[projIdx].title = e.target.value;
                              setEditedData(prev => ({ ...prev, projects: newProjects }));
                            }}
                            className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Category Type</label>
                          <input 
                            type="text"
                            value={project.category}
                            onChange={(e) => {
                              const newProjects = [...editedData.projects];
                              newProjects[projIdx].category = e.target.value;
                              setEditedData(prev => ({ ...prev, projects: newProjects }));
                            }}
                            className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Live Demo Link</label>
                          <input 
                            type="url"
                            value={project.liveLink}
                            onChange={(e) => {
                              const newProjects = [...editedData.projects];
                              newProjects[projIdx].liveLink = e.target.value;
                              setEditedData(prev => ({ ...prev, projects: newProjects }));
                            }}
                            className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">GitHub Repo Link</label>
                          <input 
                            type="url"
                            value={project.githubLink}
                            onChange={(e) => {
                              const newProjects = [...editedData.projects];
                              newProjects[projIdx].githubLink = e.target.value;
                              setEditedData(prev => ({ ...prev, projects: newProjects }));
                            }}
                            className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Tech Stack List */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Technologies / Stack (Comma-Separated)</label>
                        <input 
                          type="text"
                          value={project.techStack.join(', ')}
                          onChange={(e) => {
                            const newProjects = [...editedData.projects];
                            newProjects[projIdx].techStack = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            setEditedData(prev => ({ ...prev, projects: newProjects }));
                          }}
                          placeholder="e.g. React.js, Tailwind, TypeScript"
                          className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Key Features / Highlights</label>
                        <div className="space-y-2">
                          {project.highlights.map((highlight, highIdx) => (
                            <div key={highIdx} className="flex gap-2">
                              <input 
                                type="text"
                                value={highlight}
                                onChange={(e) => {
                                  const newProjects = [...editedData.projects];
                                  newProjects[projIdx].highlights[highIdx] = e.target.value;
                                  setEditedData(prev => ({ ...prev, projects: newProjects }));
                                }}
                                className="flex-1 bg-[#0a0b10] border border-white/5 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newProjects = [...editedData.projects];
                                  newProjects[projIdx].highlights = newProjects[projIdx].highlights.filter((_, idx) => idx !== highIdx);
                                  setEditedData(prev => ({ ...prev, projects: newProjects }));
                                }}
                                className="p-1 rounded hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition-all cursor-pointer"
                                title="Remove Highlight"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const newProjects = [...editedData.projects];
                              newProjects[projIdx].highlights.push('');
                              setEditedData(prev => ({ ...prev, projects: newProjects }));
                            }}
                            className="px-3 py-1.5 rounded-lg border border-dashed border-white/10 hover:border-white/15 text-slate-400 hover:text-white transition-all flex items-center gap-1 text-[10px] font-mono cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add Highlight Bullet
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      const nextId = editedData.projects.length > 0 
                        ? Math.max(...editedData.projects.map(p => p.id)) + 1 
                        : 1;
                      setEditedData(prev => ({
                        ...prev,
                        projects: [...prev.projects, {
                          id: nextId,
                          title: 'New Project',
                          category: 'Frontend Project',
                          highlights: ['Added basic component logic'],
                          techStack: ['React', 'Tailwind'],
                          liveLink: '#',
                          githubLink: '#'
                        }]
                      }));
                    }}
                    className="w-full py-2.5 rounded-xl border border-dashed border-white/20 text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold cursor-pointer hover:bg-white/5"
                  >
                    <Plus className="w-4 h-4" /> Create New Project Card
                  </button>
                </div>
              )}

              {/* TAB 5: CERTIFICATIONS */}
              {activeTab === 'certifications' && (
                <div className="space-y-6">
                  <div className="border-b border-white/5 pb-2 mb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Microsoft Certifications</h3>
                    <p className="text-xs text-slate-400">Manage credentials and verified skills.</p>
                  </div>

                  {editedData.certifications.map((cert, certIdx) => (
                    <div key={certIdx} className="liquid-glass-card p-4 border border-white/5 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest px-2 py-0.5 rounded bg-amber-300/10 border border-amber-300/25">
                          Credential #{certIdx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const newCerts = editedData.certifications.filter((_, idx) => idx !== certIdx);
                            setEditedData(prev => ({ ...prev, certifications: newCerts }));
                          }}
                          className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                          title="Delete Cert"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Certification Title</label>
                          <input 
                            type="text"
                            value={cert.title}
                            onChange={(e) => {
                              const newCerts = [...editedData.certifications];
                              newCerts[certIdx].title = e.target.value;
                              setEditedData(prev => ({ ...prev, certifications: newCerts }));
                            }}
                            className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Issuer Partner</label>
                          <input 
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => {
                              const newCerts = [...editedData.certifications];
                              newCerts[certIdx].issuer = e.target.value;
                              setEditedData(prev => ({ ...prev, certifications: newCerts }));
                            }}
                            className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Date Scope</label>
                          <input 
                            type="text"
                            value={cert.date}
                            onChange={(e) => {
                              const newCerts = [...editedData.certifications];
                              newCerts[certIdx].date = e.target.value;
                              setEditedData(prev => ({ ...prev, certifications: newCerts }));
                            }}
                            className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Verification ID</label>
                          <input 
                            type="text"
                            value={cert.verificationId}
                            onChange={(e) => {
                              const newCerts = [...editedData.certifications];
                              newCerts[certIdx].verificationId = e.target.value;
                              setEditedData(prev => ({ ...prev, certifications: newCerts }));
                            }}
                            className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Badge Priority</label>
                          <select
                            value={cert.badgeType}
                            onChange={(e) => {
                              const newCerts = [...editedData.certifications];
                              newCerts[certIdx].badgeType = e.target.value as 'Gold' | 'Silver' | 'Bronze';
                              setEditedData(prev => ({ ...prev, certifications: newCerts }));
                            }}
                            className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          >
                            <option value="Gold">Gold (Highest)</option>
                            <option value="Silver">Silver</option>
                            <option value="Bronze">Bronze</option>
                          </select>
                        </div>
                      </div>

                      {/* Verified Skills */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Skills Verified (Comma-Separated)</label>
                        <input 
                          type="text"
                          value={cert.skillsVerified.join(', ')}
                          onChange={(e) => {
                            const newCerts = [...editedData.certifications];
                            newCerts[certIdx].skillsVerified = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            setEditedData(prev => ({ ...prev, certifications: newCerts }));
                          }}
                          placeholder="e.g. Cloud Security, SQL Queries"
                          className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      setEditedData(prev => ({
                        ...prev,
                        certifications: [...prev.certifications, {
                          title: 'New Microsoft Certified Credential',
                          issuer: 'Microsoft Learn',
                          date: 'Verified Partner Scope',
                          badgeType: 'Silver',
                          verificationId: 'MS-NEW-VALID',
                          skillsVerified: ['Core Concepts']
                        }]
                      }));
                    }}
                    className="w-full py-2.5 rounded-xl border border-dashed border-white/20 text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold cursor-pointer hover:bg-white/5"
                  >
                    <Plus className="w-4 h-4" /> Add Certification Record
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Footer Actions */}
        {isAuthenticated && (
          <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              Local Storage Sync Active
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all cursor-pointer"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                style={{ background: `linear-gradient(135deg, ${themeDetails.color1}, ${themeDetails.color2})` }}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-extrabold text-brand-obsidian shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                Apply & Save Changes
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}
