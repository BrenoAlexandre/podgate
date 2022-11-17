import React from 'react';
import { Card } from '../../../../components/card';
import style from './style.module.scss';

interface IShow {
  title: string;
  author: string;
  image: string;
}

export const CardRoulette = (props: { shows: IShow[]; theme: string }): React.ReactElement => {
  const { shows, theme } = props;
  return (
    <div className={style.body}>
      <label className={style.themeLabel}>{theme}</label>
      <div className={style.cards}>
        {shows.map((show, index) => (
          <Card show={show} key={index * Math.random()} />
        ))}
      </div>
    </div>
  );
};
