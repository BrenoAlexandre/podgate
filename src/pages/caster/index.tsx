import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

import { Card } from '../../components/card';
import { IFeed } from '../../interfaces/IFeeds';
import { FeedsService } from '../../services/server/feeds/feeds.service';

import style from './style.module.scss';

const Caster: React.FC = () => {
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState<IFeed[]>([]);

  const { category = '' } = useParams();

  const fetchCategoryFeeds = async () => {
    const feedsData = await FeedsService.fetchCategoryFeeds(category);
    setFeeds(feedsData);
  };

  useEffect(() => {
    fetchCategoryFeeds();
  }, [category]);

  return (
    <div className={style.main}>
      <h3 className={style.title}>
        <p onClick={() => navigate('/')}>
          <FaArrowLeft />
          My Shows
        </p>
      </h3>
      <div className={style.body}>
        {feeds.map((feed, index) => (
          <React.Fragment key={index}>
            <Card feed={feed} />
          </React.Fragment>
        ))}
        <Card type={'Missing'} />
      </div>
    </div>
  );
};

export default Caster;
