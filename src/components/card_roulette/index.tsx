import React from 'react';
import { Card } from '../card';
import { IFeed } from '../../interfaces/Episodes';
import IcForward from '../../assets/icons/IcForward';

import style from './style.module.scss';

interface IProps {
  feeds: IFeed[];
  category: string;
}

export const CardRoulette: React.FC<IProps> = (props) => {
  const { feeds, category } = props;
  return (
    <div className={style.body}>
      <label className={style.themeLabel}>
        {category}
        <IcForward />
      </label>
      <div className={style.cards}>
        {feeds.map((feed, index) => (
          <Card feed={feed} key={index} />
        ))}
        {feeds.length < 6 ? (
          <Card type={'Missing'} />
        ) : feeds.length > 5 ? (
          <Card type={'More'} category={category} />
        ) : null}
      </div>
    </div>
  );
};
