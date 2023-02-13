import React, { useCallback, useEffect, useState } from 'react';
import style from './style.module.scss';
import { CardRoulette } from '../../components/card_roulette';
import { FeedsService } from '../../services/server/feeds/feeds.service';
import { useAuth } from '../../contexts/AuthContext';
import { IHomeFeeds } from '../../interfaces/IFeeds';
import { SubscriptionsService } from '../../services/server/subscriptions/subscriptions.service';

const App: React.FC = () => {
  const { user } = useAuth();

  const [data, setData] = useState<IHomeFeeds[]>([]);
  const [userSupports, setUserSupports] = useState<IHomeFeeds[]>([]);
  const [userSubscriptions, setUserSubscriptions] = useState<IHomeFeeds[]>([]);

  const fetchFeedData = useCallback(async () => {
    const feedsData = await FeedsService.fetchFeeds();
    setData(feedsData);
  }, []);

  const fetchSupportsData = useCallback(async () => {
    console.log('fetchSupportsData');
    const supportsData = await FeedsService.fetchFeeds();
    setUserSupports(supportsData);
  }, []);

  const fetchSubscriptionsData = useCallback(async () => {
    const subscriptionsData = await SubscriptionsService.getSubscriptionData();
    setUserSubscriptions(subscriptionsData);
  }, []);

  useEffect(() => {
    fetchFeedData();
    // fetchSupportsData();
    // fetchSubscriptionsData();
  }, []);

  return (
    <div className={style.body}>
      {/*//* Supports */}
      {userSupports.length > 0 ? (
        <div className={style.episodes}>
          <CardRoulette feeds={userSupports} category='My Supports' />
        </div>
      ) : null}
      {/*//* Subscriptions */}
      {userSubscriptions.length > 0 ? (
        <div className={style.episodes}>
          <CardRoulette feeds={userSubscriptions.slice(0, 4)} category='My Subscription' />
        </div>
      ) : null}
      {data.length > 0 ? (
        data.map((category, index) => (
          //* Category
          <div key={index} className={style.episodes}>
            <CardRoulette feeds={category.feeds.slice(0, 6)} category={category._id} />
          </div>
        ))
      ) : (
        <div style={{ color: 'white' }} className={style.episodes}>
          Algo imprevisto aconteceu! Recarregue a página ou tente novamente mais tarde.
        </div>
      )}
    </div>
  );
};

export default App;
