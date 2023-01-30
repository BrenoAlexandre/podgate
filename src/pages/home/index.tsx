import React, { useCallback, useEffect, useState } from 'react';
import style from './style.module.scss';
import { CardRoulette } from './components/card_roulette';
import { IHomeFeeds } from '../../interfaces/Episodes';
import { FeedsService } from '../../services/server/feeds/feeds.service';

const App: React.FunctionComponent = () => {
  const [data, setData] = useState<IHomeFeeds[]>([]);

  const fetchFeedData = useCallback(async () => {
    const feedsData = await FeedsService.fetchFeeds();
    console.log(feedsData); //TODO remove console
    setData(feedsData);
  }, []);

  useEffect(() => {
    fetchFeedData();
  }, []);

  return (
    <div>
      {data.map((category, index) => (
        <div key={index * Math.random()} className={style.roulette}>
          <CardRoulette feeds={category.feeds} theme={category._id} />
        </div>
      ))}
    </div>
  );
};

export default App;
