import React, { useState } from 'react';
import { FieldType } from '../types';
import { Copy, Check, Sparkles } from 'lucide-react';

interface OutputCardProps {
  type: FieldType;
  content: string;
}

const LABELS = {
  activity: "Versi Panjang (Aktivitas)",
  learning: "Versi Panjang (Pembelajaran)",
  obstacle: "Versi Panjang (Kendala)"
};

export const OutputCard: React.FC<OutputCardProps> = ({ type, content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!content) return null;

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl shadow-lg border border-indigo-900/50 overflow-hidden animation-fade-in relative group">
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
      
      <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wide">{LABELS[type]}</h3>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            copied 
              ? 'bg-green-900/30 text-green-400 border border-green-800' 
              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-200'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Disalin!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Salin
            </>
          )}
        </button>
      </div>
      
      <div className="p-5 flex-1 bg-slate-950/30">
        <div className="prose prose-sm prose-invert max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
};