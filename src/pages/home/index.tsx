import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { parseString } from 'xml2js';
import style from './style.module.scss';
import Sidebar from '../../components/sidebar';
import SearchBar from '../../components/search_bar';
import BottomPlayer from '../../components/bottom_player';
import { CardRoulete } from '../../components/card_roulete';

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
      // const feed = await Axios.get('https://anchor.fm/s/af2a9270/podcast/rss');
      const feed = await Axios.get('https://feeds.simplecast.com/qm_9xx0g');
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
        { title: 'Meia Hora em história', author: 'Vitinho Fessor', image: '' },
        { title: 'Meia Hora em história', author: 'Vitinho Fessor', image: '' },
        { title: 'Meia Hora em história', author: 'Vitinho Fessor', image: '' },
        { title: 'Meia Hora em história', author: 'Vitinho Fessor', image: '' },
        { title: 'Meia Hora em história', author: 'Vitinho Fessor', image: '' },
      ],
    },
  ];

  return (
    <div className={style.main}>
      <Sidebar />
      <div className={style.body}>
        <header>
          <SearchBar />
        </header>
        <div className={style.center_body}>
          {themes.map((theme, index) => (
            <div key={index * Math.random()} className={style.cards}>
              <CardRoulete shows={theme.shows} label={theme.theme} />
            </div>
          ))}
        </div>
        <BottomPlayer />
      </div>
    </div>
  );
};

export default App;
