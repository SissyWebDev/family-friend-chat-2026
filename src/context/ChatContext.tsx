import { createContext, useContext, useState } from "react";

interface ChatContextType {
  selectedChannel: string | null;
  setSelectedChannel: (channel: string) => void;
  selectedChannelData: { name: string; type: string } | null;
  setSelectedChannelData: (data: { name: string; type: string } | null) => void;
}

const ChatContext = createContext<ChatContextType>({
  selectedChannel: null,
  setSelectedChannel: () => {},
  selectedChannelData: null,
  setSelectedChannelData: () => {},
});

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
 const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
 const [selectedChannelData, setSelectedChannelData] = useState<{ name: string; type: string } | null>(null);

  return (
    <ChatContext.Provider value={{ selectedChannel, setSelectedChannel, selectedChannelData, setSelectedChannelData }}>
      {children}
    </ChatContext.Provider>
  );
};

