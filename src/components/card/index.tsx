import React from 'react';
import { Paper } from '@mui/material';
import { IFeed } from '../../interfaces/IEpisodes';

import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';

interface IProps {
  feed?: IFeed;
  type?: 'Missing' | 'More';
  category?: string;
}

export const Card: React.FC<IProps> = ({ feed, type, category }) => {
  const navigate = useNavigate();
  return (
    <Paper variant='elevation' elevation={5} className={type ? style[`card${type}`] : style.card}>
      {!type && feed ? (
        <>
          <img className={style.image} src={feed.photoUrl} />
          <div className={style.labels}>
            <label className={style.labels__title} onClick={() => navigate(`/feed/${feed._id}`)}>
              {feed.title}
            </label>
            <label className={style.labels__author}>{feed.author}</label>
          </div>
        </>
      ) : type === 'Missing' ? (
        <>
          <p>Looking for a podcast that isn't here?</p>
          <p>Make sure to submit it!</p>
        </>
      ) : (
        <a className={style.findMore}>Find more programs about {category}</a>
      )}
    </Paper>
  );
};
