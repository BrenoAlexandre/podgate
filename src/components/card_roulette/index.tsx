import React from 'react';
import { Card } from '../card';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { IFeed } from '../../interfaces/IEpisodes';

import style from './style.module.scss';

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
        <FaArrowRight />
      </p>
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
