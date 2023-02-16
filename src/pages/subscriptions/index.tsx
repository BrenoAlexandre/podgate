import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

import { Card } from '../../components/card';
import { IFeed } from '../../interfaces/IFeeds';
import { SubscriptionsService } from '../../services/server/subscriptions/subscriptions.service';

import style from './style.module.scss';

const Subscriptions: React.FC = () => {
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState<IFeed[]>([]);

  const { category = '' } = useParams();

  const fetchSubsFeeds = async () => {
    const feedsData = await SubscriptionsService.getSubscriptionData();
    setFeeds(feedsData[0].feeds);
  };

  useEffect(() => {
    fetchSubsFeeds();
  }, [category]);

  return (
    <div className={style.main}>
      <h3 className={style.title}>
        <p onClick={() => navigate('/')}>
          <FaArrowLeft />
          My Subscriptions
        </p>
      </h3>
      <div className={style.body}>
        {feeds.map((feed, index) => (
          <React.Fragment key={index}>
            <Card feed={feed} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
