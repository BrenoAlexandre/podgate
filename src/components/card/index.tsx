import React from 'react';
import { IFeed } from '../../interfaces/Episodes';
import style from './style.module.scss';

interface IProps {
  feed: IFeed;
}

export const Card: React.FC<IProps> = (props) => {
  const { feed } = props;
  return (
    <div className={style.card}>
      <img className={style.image} src={feed.photoUrl} />
      <div className={style.labels}>
        <label className={style.labels__title}>{feed.title}</label>
        <label className={style.labels__author}>{feed.author}</label>
      </div>
    </div>
  );
};
