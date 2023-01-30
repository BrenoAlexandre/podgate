import React from 'react';
import { Card } from '../../../../components/card';
import { IFeed } from '../../../../interfaces/Episodes';

import style from './style.module.scss';

export const CardRoulette = (props: { feeds: IFeed[]; theme: string }): React.ReactElement => {
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
