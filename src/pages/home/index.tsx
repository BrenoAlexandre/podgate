import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { parseString } from 'xml2js';
import style from './style.module.scss';
import Sidebar from '../main/components/sidebar';
import SearchBar from '../main/components/search_bar';
import BottomPlayer from '../main/components/bottom_player';
import { CardRoulette } from '../../components/card_roulette';

interface IChannelList {
  theme: string;
  shows: IChannel[];
}

interface IChannel {
  image: string;
  title: string;
  author: string;
}

const App = () => {
  const fetchChannel = async () => {
    try {
      // const feed = await Axios.get('https://anchor.fm/s/af2a9270/podcast/rss'); //? Meu feed
      const feed = await Axios.get('https://anchor.fm/s/af2a9270/podcast/rss');
      return await new Promise((resolve, reject) =>
        parseString(feed.data, function (err, result) {
          if (err) {
            reject(err);
          }
          console.log(result.rss.channel[0]);
          setEp(result.rss.channel[0]);
          resolve(result);
        })
      );
    } catch (err) {
      console.error('Feed: ', err);
    }
  };

  const [ep, setEp] = useState<any>();

  useEffect(() => {
    fetchChannel();
  }, []);

  const themes: IChannelList[] = [
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

  return (
    <div>
      {themes.map((theme, index) => (
        <div key={index * Math.random()} className={style.roulette}>
          <CardRoulette shows={theme.shows} theme={theme.theme} />
        </div>
      ))}
      {themes.map((theme, index) => (
        <div key={index * Math.random()} className={style.roulette}>
          <CardRoulette shows={theme.shows} theme={theme.theme} />
        </div>
      ))}
      {themes.map((theme, index) => (
        <div key={index * Math.random()} className={style.roulette}>
          <CardRoulette shows={theme.shows} theme={theme.theme} />
        </div>
      ))}
    </div>
  );
};

export default App;
