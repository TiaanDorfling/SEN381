//  just a demo chat
import { useState } from "react";
import api from "./api/axios";

export default function ChatWidget(){
  const [open,setOpen] = useState(false);
  const [text,setText] = useState("");
  const [messages,setMessages] = useState([]);

  const send = async () => {
    if(!text) return;
    setMessages(m=>[...m, { from: "user", text }]);
    setText("");
    const res = await api.post("/ai/chat", { message: text });
    setMessages(m=>[...m, { from: "bot", text: res.data.reply }]);
    if(res.data.escalate){

      await api.post("/notify", { /* ... */ });
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button onClick={()=>setOpen(o=>!o)} className="bg-blue-600 text-white p-3 rounded-full">Chat</button>
      {open && (
        <div className="w-80 h-96 bg-white shadow-lg rounded p-2 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {messages.map((m,i)=> <div key={i} className={m.from==="user" ? "text-right" : ""}>{m.text}</div>)}
          </div>
          <div className="flex">
            <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 border p-2"/>
            <button onClick={send} className="px-3">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
