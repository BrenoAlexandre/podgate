import React, { useCallback, useEffect, useState } from 'react';
import style from './style.module.scss';
import { CardRoulette } from '../../components/card_roulette';
import { IFeed, IHomeFeeds } from '../../interfaces/Episodes';
import { FeedsService } from '../../services/server/feeds/feeds.service';

const App: React.FC = () => {
  const [data, setData] = useState<IHomeFeeds[]>([]);

  const fetchFeedData = useCallback(async () => {
    const feedsData = await FeedsService.fetchFeeds();
    setData(feedsData);
  }, []);

  const userSupportList: IFeed[] = [];
  const userSubscriptionList: IFeed[] = [];

  useEffect(() => {
    fetchFeedData();
  }, []);

  return (
    <div className={style.body}>
      {/*//* Supports */}
      {userSupportList.length > 0 ? (
        <div className={style.episodes}>
          <CardRoulette feeds={userSupportList} category='My Supports' />
        </div>
      ) : null}
      {/*//* Subscriptions */}
      {userSubscriptionList.length > 0 ? (
        <div className={style.episodes}>
          <CardRoulette feeds={userSubscriptionList} category='My Subscription' />
        </div>
      ) : null}
      {data.length > 0
        ? data.map((category, index) => (
            //* Category
            <div key={index} className={style.episodes}>
              <CardRoulette feeds={category.feeds} category={category._id} />
            </div>
          ))
        : 'Algo imprevisto aconteceu! Recarregue a página ou tente novamente mais tarde.'}
    </div>
  );
};

export default App;
