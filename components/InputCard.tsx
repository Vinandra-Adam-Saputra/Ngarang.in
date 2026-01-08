import React from 'react';
import { FieldType } from '../types';
import { Pencil, BookOpen, AlertTriangle } from 'lucide-react';

interface InputCardProps {
  type: FieldType;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

const CONFIG = {
  activity: {
    label: "Ngapain Aja Hari Ini?",
    placeholder: "Contoh: Bantuin input data, ikut meeting pagi, bikin kopi buat senior...",
    icon: Pencil,
    // Dark mode colors: Blue
    color: "text-blue-400",
    bg: "bg-blue-950/30 border-blue-900/50", 
    focusRing: "focus:ring-blue-500/50 focus:border-blue-500"
  },
  learning: {
    label: "Dapet Ilmu Apa?",
    placeholder: "Contoh: Baru tau cara pakai Excel, belajar cara handle trouble...",
    icon: BookOpen,
    // Dark mode colors: Emerald
    color: "text-emerald-400",
    bg: "bg-emerald-950/30 border-emerald-900/50",
    focusRing: "focus:ring-emerald-500/50 focus:border-emerald-500"
  },
  obstacle: {
    label: "Ada Masalah / Kendala?",
    placeholder: "Contoh: Internet lemot parah, instruksi pembimbing kurang jelas...",
    icon: AlertTriangle,
    // Dark mode colors: Amber
    color: "text-amber-400",
    bg: "bg-amber-950/30 border-amber-900/50",
    focusRing: "focus:ring-amber-500/50 focus:border-amber-500"
  }
};

export const InputCard: React.FC<InputCardProps> = ({ type, value, onChange, disabled }) => {
  const config = CONFIG[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl shadow-lg border border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-slate-700 group">
      <div className={`px-4 py-3 border-b border-slate-800 flex items-center gap-2 ${config.bg}`}>
        <Icon className={`w-5 h-5 ${config.color}`} />
        <h3 className="font-semibold text-slate-200">{config.label}</h3>
      </div>
      <div className="p-4 flex-1">
        <textarea
          className={`w-full h-40 p-3 text-sm text-slate-200 placeholder:text-slate-600 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${config.focusRing}`}
          placeholder={config.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
        <div className={`mt-2 text-xs text-right transition-colors ${value.length > 0 ? 'text-slate-400' : 'text-slate-700'}`}>
          {value.length} karakter
        </div>
      </div>
    </div>
  );
};