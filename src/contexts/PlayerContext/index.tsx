import { createContext, useContext, useState } from 'react';

interface IEpInfo {
  audioUrl: string;
  image: string;
  title: string;
  channel: string;
  feedId: string;
}

interface PlayerContextData {
  epData: IEpInfo;
  playAudio: (newEpData: IEpInfo) => void;
}

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export function usePlayer(): PlayerContextData {
  const context = useContext(PlayerContext);

  return context;
}

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [epData, setEpData] = useState<IEpInfo>({
    audioUrl: '',
    image: '',
    title: '',
    channel: '',
    feedId: '',
  });

  const playAudio = async (newEpData: IEpInfo) => {
    setEpData(newEpData);
  };

  return <PlayerContext.Provider value={{ playAudio, epData }}>{children}</PlayerContext.Provider>;
};
