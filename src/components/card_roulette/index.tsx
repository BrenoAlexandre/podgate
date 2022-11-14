import React from 'react';
import { Card } from '../card';
import style from './style.module.scss';

interface IShow {
  title: string;
  author: string;
  image: string;
}

export const CardRoulette = (props: { shows: IShow[]; theme: string }) => {
  const { shows, theme } = props;
  return (
    <div className={style.body}>
      <label className={style.themeLabel}>{theme}</label>
      <div className={style.cards}>
        {shows.map((show) => (
          <Card show={show} />
        ))}
      </div>
    </div>
  );
};
