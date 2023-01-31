import React, { useCallback, useEffect, useState } from 'react';
import style from './style.module.scss';
import { CardRoulette } from '../../components/card_roulette';
import { IHomeFeeds } from '../../interfaces/Episodes';
import { FeedsService } from '../../services/server/feeds/feeds.service';

const App: React.FC = () => {
  const [data, setData] = useState<IHomeFeeds[]>([]);

  const fetchFeedData = useCallback(async () => {
    const feedsData = await FeedsService.fetchFeeds();
    setData(feedsData);
  }, []);

  useEffect(() => {
    fetchFeedData();
  }, []);

  return (
    <div className={style.body}>
      {/*//* Supports */}
      <div className={style.episodes}>
        <CardRoulette feeds={[]} category='My Supports' />
      </div>
      {/*//* Subscriptions */}
      <div className={style.episodes}>
        <CardRoulette feeds={[]} category='My Subscription' />
      </div>
      {data.map((category, index) => (
        //* Category
        <div key={index} className={style.episodes}>
          <CardRoulette feeds={category.feeds} category={category._id} />
        </div>
      ))}
    </div>
  );
};

export default App;
