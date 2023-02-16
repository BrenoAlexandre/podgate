import React, { useCallback, useEffect, useState } from 'react';
import style from './style.module.scss';
import { CardRoulette } from '../../components/card_roulette';
import { FeedsService } from '../../services/server/feeds/feeds.service';
import { useAuth } from '../../contexts/AuthContext';
import { IFeed, IHomeFeeds } from '../../interfaces/IFeeds';
import { SubscriptionsService } from '../../services/server/subscriptions/subscriptions.service';
import { SupportsService } from '../../services/server/supports/supports.service';
import { EStatus } from '../../interfaces/EStatus';

const App: React.FC = () => {
  const { user, logged } = useAuth();

  const [data, setData] = useState<IHomeFeeds[]>([]);
  const [userSupports, setUserSupports] = useState<IFeed[]>([]);
  const [activeSupportFeeds, setActiveSupportFeeds] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState<IFeed[]>([]);

  const fetchFeedData = useCallback(async () => {
    const feedsData = await FeedsService.fetchFeeds();
    setData(feedsData);
  }, []);

  const fetchSupportsData = useCallback(async () => {
    const supportsData = await SupportsService.getUserSupports();
    console.log('fetchSupportsData', supportsData[0]);
    setUserSupports(supportsData[0].supports);

    const activeFeeds = supportsData[0].supports.filter((f: any) => {
      let active = supportsData[0].feeds.filter((f: any) => f.status === EStatus.APPROVED);
      let activeIds = active.map((pf: any) => pf.feedId);
      if (activeIds.includes(f._id)) return f;
    });
    setActiveSupportFeeds(activeFeeds);
  }, []);

  const fetchSubscriptionsData = useCallback(async () => {
    const subscriptionsData = await SubscriptionsService.getSubscriptionData();
    setUserSubscriptions(subscriptionsData[0].feeds);
  }, []);

  const handleEffect = useCallback(async () => {
    fetchFeedData();
    if (user.name) {
      fetchSupportsData();
      fetchSubscriptionsData();
    }
  }, [logged]);

  useEffect(() => {
    handleEffect();
  }, [user]);

  useEffect(() => {
    if (logged === false) {
      setUserSupports([]);
      setUserSubscriptions([]);
    }
  }, [logged]);

  return (
    <div className={style.body}>
      {/*//* Supports */}
      {activeSupportFeeds.length > 0 ? (
        <div>
          <CardRoulette
            feeds={activeSupportFeeds.slice(0, 6)}
            category='My Supports'
            link='/supports'
          />
        </div>
      ) : null}
      {/*//* Subscriptions */}
      {userSubscriptions.length > 0 ? (
        <div>
          <CardRoulette
            feeds={userSubscriptions.slice(0, 6)}
            category='My Subscriptions'
            link='/subscriptions'
          />
        </div>
      ) : null}
      {data.length > 0 ? (
        data.map((category, index) => (
          //* Category
          <div key={index}>
            <CardRoulette feeds={category.feeds.slice(0, 6)} category={category._id} />
          </div>
        ))
      ) : (
        <div style={{ color: 'white' }}>
          Algo imprevisto aconteceu! Recarregue a página ou tente novamente mais tarde.
        </div>
      )}
    </div>
  );
};

export default App;
