import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { parseString } from 'xml2js';
import style from './style.module.scss';
import { CardRoulette } from './components/card_roulette';
import { useWindowSize } from 'usehooks-ts';
import { useDebounce } from '../../services/hooks/useDebounce';

interface IChannelList {
  theme: string;
  shows: IChannel[];
}

interface IChannel {
  image: string;
  title: string;
  author: string;
}

const App: React.FunctionComponent = () => {
  const fetchChannel = async () => {
    try {
      const feed = await Axios.get('https://anchor.fm/s/af2a9270/podcast/rss');
      return await new Promise((resolve, reject) =>
        parseString(feed.data, function (err, result) {
          if (err) {
            reject(err);
          }
          console.log('Meu feed:', result.rss.channel[0]);
          setEp(result.rss.channel[0]);
          resolve(result);
        })
      );
    } catch (err) {
      console.error('Feed error:', err);
    }
  };

  const { width } = useWindowSize();
  const windowWidth = useDebounce(width, 200);

  const [ep, setEp] = useState<any>();

  const fullData: IChannelList[] = [
    {
      theme: 'Educação',
      shows: [
        {
          title: ep?.title,
          author: ep?.author || ep?.['itunes:author'][0],
          image: ep?.image[0].url[0],
        },
        { title: 'História Em Meia Hora', author: 'Vitor Soares', image: '' },
        { title: 'História Em Meia Hora', author: 'Vitor Soares', image: '' },
        { title: 'História Em Meia Hora', author: 'Vitor Soares', image: '' },
        { title: 'História Em Meia Hora', author: 'Vitor Soares', image: '' },
        { title: 'História Em Meia Hora', author: 'Vitor Soares', image: '' },
      ],
    },
  ];

  const [data, setData] = useState<IChannelList[]>(fullData);

  useEffect(() => {
    fetchChannel();
  }, []);

  return (
    <div>
      {fullData.map((theme, index) => (
        <div key={index * Math.random()} className={style.roulette}>
          <CardRoulette shows={theme.shows} theme={theme.theme} />
        </div>
      ))}
      {data.map((theme, index) => (
        <div key={index * Math.random()} className={style.roulette}>
          <CardRoulette shows={theme.shows} theme={theme.theme} />
        </div>
      ))}
      {data.map((theme, index) => (
        <div key={index * Math.random()} className={style.roulette}>
          <CardRoulette shows={theme.shows} theme={theme.theme} />
        </div>
      ))}
    </div>
  );
};

export default App;
