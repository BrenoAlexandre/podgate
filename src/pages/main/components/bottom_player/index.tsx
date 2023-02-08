import React from 'react';
import { Box, Button, Slider } from '@mui/material';
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa';

import style from './style.module.scss';

const BottomPlayer = (): React.ReactElement => {
  const episode = {
    image:
      'https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_episode/20984499/6a1e4ecfcc48b49b.jpeg',
    title: 'ATUALIZAÇÃO: Família Poncio',
    feed: 'Coletivo de Najas',
  };
  const audioProgression = 19;
  return (
    <footer className={style.bottom_player}>
      <div className={style.info}>
        <img src={episode.image} />
        <div className={style.ep_info}>
          <p title={episode.title}>{episode.title}</p>
          <small title={episode.feed}>{episode.feed}</small>
        </div>
      </div>
      <div className={style.controls}>
        <Box width={400}>
          <Slider size='medium' value={audioProgression} />
        </Box>
        <div className={style.player_buttons}>
          <Button variant='contained' className={style.button}>
            <FaBackward />
          </Button>
          <Button variant='contained' className={style.button}>
            {/* <FaPause /> */}
            <FaPlay />
          </Button>
          <Button variant='contained' className={style.button}>
            <FaForward />
          </Button>
        </div>
      </div>
    </footer>
  );
};
export default BottomPlayer;
