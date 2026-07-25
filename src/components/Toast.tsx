import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgStyles = {
    success: 'bg-brand-obsidian/90 border-emerald-500/40 text-emerald-300 shadow-emerald-500/10',
    error: 'bg-brand-obsidian/90 border-rose-500/40 text-rose-300 shadow-rose-500/10',
    info: 'bg-brand-obsidian/90 border-brand-cyan/40 text-brand-cyan shadow-brand-cyan/10',
  };

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: CheckCircle, // or standard info
  }[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-xl shadow-lg max-w-sm ${bgStyles[type]}`}
      id="toast-notification"
    >
      <Icon className="w-5 h-5 shrink-0" />
      <p className="text-sm font-medium tracking-wide">{message}</p>
      <button
        onClick={onClose}
        className="ml-3 text-slate-400 hover:text-white transition-colors duration-200"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
