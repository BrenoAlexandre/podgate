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
      {/* //TODO Supports */}
      {/* //TODO Subscriptions */}
      {/* //TODO! Card "..." para quando há menos do que 6 programas em uma categoria */}
      {data.map((category, index) => (
        <div key={index * Math.random()} className={style.episodes}>
          <CardRoulette feeds={category.feeds} theme={category._id} />
        </div>
      ))}
    </div>
  );
};

export default App;
