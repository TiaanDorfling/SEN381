import React, { useState } from 'react';
import { type Message } from '../types';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { BotIcon } from './icons/BotIcon';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (input: string, file?: File | null) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading, onSendMessage }) => {
  const [userInput, setUserInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(userInput, selectedFile);
    setUserInput('');
    setSelectedFile(null);
  };

  return (
    <div className="w-full max-w-2xl h-[95vh] sm:h-[90vh] flex flex-col bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-2xl border border-blue-500/30">
      <header className="p-4 border-b border-slate-700 flex items-center space-x-4 bg-slate-800/80 rounded-t-lg">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center border-2 border-slate-400 flex-shrink-0">
           <BotIcon className="w-8 h-8 text-white"/>
        </div>
        <div>
          <h1 className="text-xl font-bold font-display text-white tracking-wide">OPTIMIST PRIME</h1>
          <p className="text-sm text-blue-300">Your Guide on the Path to Knowledge</p>
        </div>
      </header>
      <MessageList messages={messages} isLoading={isLoading} onSendMessage={(text) => onSendMessage(text)} />
      <MessageInput 
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        selectedFile={selectedFile}
        onFileSelect={setSelectedFile}
        onFileClear={() => setSelectedFile(null)}
      />
    </div>
  );
};