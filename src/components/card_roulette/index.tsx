import React from 'react';
import { Card } from '../card';
import { IFeed } from '../../interfaces/Episodes';

import style from './style.module.scss';

interface IProps {
  feeds: IFeed[];
  theme: string;
}

export const CardRoulette: React.FC<IProps> = (props) => {
  const { feeds, theme } = props;
  return (
    <div className={style.body}>
      <label className={style.themeLabel}>{theme}</label>
      <div className={style.cards}>
        {feeds.map((feed, index) => (
          <Card feed={feed} key={index * Math.random()} />
        ))}
      </div>
    </div>
  );
};
