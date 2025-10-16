import React, { useRef } from 'react';
import { SendIcon } from './icons/SendIcon';
import { PaperclipIcon } from './icons/PaperclipIcon';

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  onFileClear: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading,
  selectedFile,
  onFileSelect,
  onFileClear,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    } else {
      onFileSelect(null);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // The form's onSubmit will be triggered by button click or enter on form controls,
      // but this allows enter in textarea to submit.
      // The cast to `any` is a shortcut as the event is compatible enough for handleSubmit.
      onSubmit(e as any);
    }
  };

  return (
    <div className="p-4 border-t border-slate-700 bg-slate-800/80 rounded-b-lg">
      <form onSubmit={onSubmit} className="relative">
        {selectedFile && (
          <div className="absolute bottom-full left-0 right-0 p-2 bg-slate-700/80 backdrop-blur-sm rounded-t-md flex justify-between items-center text-sm">
            <span className="text-slate-300 truncate pl-2">
              Attached: {selectedFile.name}
            </span>
            <button
              type="button"
              onClick={() => {
                onFileClear();
                if(fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className="text-slate-400 hover:text-white font-bold text-lg px-2"
              aria-label="Remove file"
              disabled={isLoading}
            >
              &times;
            </button>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={handleAttachClick}
            disabled={isLoading}
            className="p-2 text-slate-400 hover:text-blue-400 disabled:opacity-50 transition-colors"
            aria-label="Attach file"
          >
            <PaperclipIcon className="w-6 h-6" />
          </button>
          
          <textarea
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask Optimist Prime..."
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-slate-900/50 border border-slate-600 rounded-lg py-2 px-3 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-white scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800"
            style={{ maxHeight: '120px' }}
          />
          <button
            type="submit"
            disabled={isLoading || (!value.trim() && !selectedFile)}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed flex-shrink-0 transition-colors"
            aria-label="Send message"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
};
