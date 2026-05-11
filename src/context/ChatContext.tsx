import { createContext, useContext, useState } from "react";

interface ChatContextType {
  selectedChannel: string | null;
  setSelectedChannel: (channel: string) => void;
}

const ChatContext = createContext<ChatContextType>({
  selectedChannel: null,
  setSelectedChannel: () => {},
});

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  return (
    <ChatContext.Provider value={{ selectedChannel, setSelectedChannel }}>
      {children}
    </ChatContext.Provider>
  );
};