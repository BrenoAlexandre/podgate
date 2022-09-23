import React from 'react';
import { PodCard } from '../card';
import style from './style.module.scss';

interface IShow {
  title: string;
  author: string;
  image: string;
}

export const CardRoulete = (props: { shows: IShow[]; label: string }) => {
  const { shows, label } = props;
  return (
    <div className={style.body}>
      <label>{label}</label>
      <div className={style.cards}>
        {shows.map((show) => (
          <PodCard show={show} />
        ))}
      </div>
    </div>
  );
};
