import React from 'react';
import { IFeed } from '../../interfaces/Episodes';
import IcRSS from '../../assets/icons/IcRSS';

import style from './style.module.scss';

interface IProps {
  feed?: IFeed;
  type?: 'Missing' | 'More';
  category?: string;
}

export const Card: React.FC<IProps> = (props) => {
  const { feed, type, category } = props;
  return (
    <div className={type ? style[`card${type}`] : style.card}>
      {!type && feed ? (
        <>
          <img className={style.image} src={feed.photoUrl} />
          <div className={style.labels}>
            <label className={style.labels__title}>{feed.title}</label>
            <label className={style.labels__author}>{feed.author}</label>
          </div>
        </>
      ) : type === 'Missing' ? (
        <>
          <p>Looking for a podcast that isn't here?</p>
          <p>Make sure to submit it!</p>
          <div className={style.icon}>
            <IcRSS />
          </div>
        </>
      ) : (
        <a className={style.findMore}>Find more programs about {category}</a>
      )}
    </div>
  );
};
