import React from 'react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'alert' | 'confirm';
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title = 'Peringatan',
  message,
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Batal',
  type = 'alert'
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div 
        className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl shadow-indigo-900/20 w-full max-w-md overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start">
            <div className="ml-0 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
              <p className="text-slate-300">{message}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900/50 px-6 py-4 flex justify-end space-x-3">
          {type === 'confirm' && (
            <button
              onClick={() => {
                onCancel?.();
                onClose();
              }}
              className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-700/50 border border-slate-700 transition-all"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={() => {
              if (type === 'confirm') {
                onConfirm?.();
              }
              onClose();
            }}
            className={`px-4 py-2 rounded-lg font-medium text-white ${
              type === 'confirm' 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            } transition-all`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};