import React from 'react';
import style from './style.module.scss';

interface IShow {
  title: string;
  author: string;
  image: string;
}

export const PodCard = (props: { show: IShow }) => {
  const { show } = props;
  return (
    <div className={style.card}>
      <img className={style.image} src={show.image} />
      <div className={style.labels}>
        <label className={style.title}>{show.title}</label>
        <label className={style.author}>{show.author}</label>
      </div>
    </div>
  );
};
