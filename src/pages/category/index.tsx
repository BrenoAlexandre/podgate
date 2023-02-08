import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IcBackward from '../../assets/icons/IcBackward';
import { Card } from '../../components/card';
import { IFeed } from '../../interfaces/Episodes';
import { FeedsService } from '../../services/server/feeds/feeds.service';

import style from './style.module.scss';

const Category: React.FC = () => {
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState<IFeed[]>([]);

  const category = 'Comedy';

  const fetchCategoryFeeds = async () => {
    const feedsData = await FeedsService.fetchCategoryFeeds(category);
    setFeeds(feedsData);
  };

  useEffect(() => {
    fetchCategoryFeeds();
  }, []);

  return (
    <div className={style.main}>
      <h3 className={style.title}>
        <a onClick={() => navigate('')}>
          <IcBackward />
        </a>
        <p>{category}</p>
      </h3>
      <div className={style.body}>
        {feeds.map((feed) => (
          <Card feed={feed} />
        ))}
        {feeds.map((feed) => (
          <Card feed={feed} />
        ))}
        {feeds.map((feed) => (
          <Card feed={feed} />
        ))}
        {feeds.map((feed) => (
          <Card feed={feed} />
        ))}
        {feeds.map((feed) => (
          <Card feed={feed} />
        ))}
        <Card type={'Missing'} />
      </div>
    </div>
  );
};

export default Category;
