import React from 'react';
import { Card } from '../card';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { IFeed } from '../../interfaces/IFeeds';

import style from './style.module.scss';
import { Paper } from '@mui/material';

interface IProps {
  feeds: IFeed[];
  category: string;
}

export const CardRoulette: React.FC<IProps> = (props) => {
  const { feeds, category } = props;

  const navigate = useNavigate();

  return (
    <div className={style.body}>
      <p className={style.themeLabel} onClick={() => navigate(`/category/${category}`)}>
        {category}
      </p>
      <div className={style.cards}>
        {feeds.map((feed, index) => (
          <Card feed={feed} key={index} />
        ))}
        {feeds.length < 6 ? (
          <Card type={'Missing'} />
        ) : feeds.length > 5 ? (
          <Paper
            style={{
              borderRadius: '100px',
              padding: '8px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => navigate(`/category/${category}`)}
          >
            <FaArrowRight />
          </Paper>
        ) : null}
      </div>
    </div>
  );
};
