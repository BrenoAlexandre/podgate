import React, { useState } from 'react';
import { Box, Button, Slider } from '@mui/material';
import {
  FaPause,
  FaPlay,
  FaRedo,
  FaUndo,
  FaVolumeDown,
  FaVolumeMute,
  FaVolumeOff,
  FaVolumeUp,
} from 'react-icons/fa';
import { Ring } from '@uiball/loaders';

import style from './style.module.scss';
import { usePlayer } from '../../../../contexts/PlayerContext';
import { useNavigate } from 'react-router-dom';

type IPlayerStates = 'playing' | 'paused' | 'loading';

const BottomPlayer = (): React.ReactElement => {
  const { epData } = usePlayer();

  const navigate = useNavigate();

  const [volume, setVolume] = useState<number>(50);
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [playerState, setPlayerState] = useState<IPlayerStates>('paused');

  const audioElement = document.querySelector<HTMLAudioElement>('audio');

  const handleVolume = (_: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
    audioElement!.volume = (newValue as number) / 100;
  };

  const handleStart = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    setDuration(e.target.duration);
    unpause();
  };

  const handleEnd = () => {
    setPlayerState('paused');
  };

  const handleProgress = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    setProgress(e.target.currentTime);
  };

  const handleSkip = (_: Event, newValue: number | number[]) => {
    const time = ((newValue as number) / 100) * duration;
    setProgress(time);
    audioElement!.currentTime = time;
  };

  const handleWind = () => {
    audioElement!.currentTime = progress + 10;
  };
  const handleUnwind = () => {
    audioElement!.currentTime = progress - 10;
  };

  const pause = () => {
    audioElement?.pause();
    setPlayerState('paused');
  };
  const unpause = () => {
    audioElement?.play();
    setPlayerState('playing');
  };

  const formatMSS = (s: number) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~s;
  };

  return (
    <footer className={style.bottom_player}>
      <div className={style.info}>
        <img src={epData.image} />
        <div className={style.ep_info}>
          <p title={epData.title}>{epData.title}</p>
          <small title={epData.channel} onClick={() => navigate(`/feed/${epData.feedId}`)}>
            {epData.channel}
          </small>
        </div>
      </div>
      <div className={style.controls}>
        <Box width={400} display='flex' alignItems='center' justifyContent='space-between'>
          <audio
            id='audioPlayer'
            src={epData.audioUrl}
            onTimeUpdate={handleProgress}
            onCanPlay={handleStart}
            onEnded={handleEnd}
            preload='true'
          />
          <Slider
            size='medium'
            value={duration ? (progress * 100) / duration : 0}
            onChange={handleSkip}
          />
        </Box>
        <div className={style.player_buttons}>
          <Button variant='contained' className={style.button}>
            <FaUndo onClick={handleUnwind} />
          </Button>
          <Button
            role='switch'
            variant='contained'
            className={style.button}
            onClick={() => {
              playerState === 'paused' ? unpause() : pause();
            }}
          >
            {playerState === 'paused' ? (
              <FaPlay />
            ) : playerState === 'playing' ? (
              <FaPause />
            ) : (
              <Ring size={20} color='#e8e6e3' />
            )}
          </Button>
          <Button variant='contained' className={style.button}>
            <FaRedo onClick={handleWind} />
          </Button>
        </div>
      </div>
      <div className={style.volume_control}>
        <span>
          {formatMSS(progress)} : {formatMSS(duration)}
        </span>
        {volume === 0 ? (
          <FaVolumeMute />
        ) : volume < 15 ? (
          <FaVolumeOff />
        ) : volume < 65 ? (
          <FaVolumeDown />
        ) : (
          <FaVolumeUp />
        )}
        <Slider
          id='volumeControl'
          className={style.volume_slider}
          size='medium'
          value={volume}
          onChange={handleVolume}
          valueLabelDisplay='auto'
        />
      </div>
    </footer>
  );
};
export default BottomPlayer;
