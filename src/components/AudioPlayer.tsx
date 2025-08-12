import React, { useRef } from 'react';
import { SoundTwoTone } from '@ant-design/icons';

interface AudioPlayerProps {
  audioSrc: string; // Path or imported audio file URL
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <span>
      <button
        onClick={handlePlay}
        aria-label="Play Audio"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <SoundTwoTone style={{ fontSize: 20 }} />
      </button>
      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </span>
  );
};

export default AudioPlayer;
