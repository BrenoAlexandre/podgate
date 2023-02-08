import React, { useEffect, useState } from 'react';
import { Button, Paper, TextField } from '@mui/material';
import styled from 'styled-components';
import { format } from 'date-fns';
import { FaPlay } from 'react-icons/fa';
import { IFeed } from '../../interfaces/Episodes';
import { FeedsService } from '../../services/server/feeds/feeds.service';

import style from './style.module.scss';
import CasterRequestModal from '../../components/caster_request_modal';
import SupportRequestModal from '../../components/support_request_modal';

const CustomTextField = styled(TextField)`
  & label.MuiOutlinedInput {
    color: '#e8e6e3';
  }
  & .MuiOutlinedInput-root {
    &.MuiOutlinedInput-root fieldset {
      border-color: '#e8e6e3';
    }
  }
`;

const emptyFeed: IFeed = {
  _id: '',
  url: '',
  title: '',
  description: '',
  photoUrl: '',
  category: '',
  author: '',
  episodesId: {
    _id: 'a',
    feedId: '',
    episodes: [],
    created_At: new Date(),
    updated_At: new Date(),
  },

  caster: { _id: '', userId: '', feeds: [], createdAt: new Date(), updatedAt: new Date() },
  isPrivate: false,
  privateFeed: '',
  created_At: new Date(),
  updated_At: new Date(),
};

const Feed: React.FC = () => {
  const [data, setData] = useState<IFeed>(emptyFeed);
  const [redeemIsOpen, setIsRedeemOpen] = useState<boolean>(false);

  const openRedeemModal = () => setIsRedeemOpen(true);
  const closeRedeemModal = () => setIsRedeemOpen(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const feedId = '63d738ed1a433ffacf8d3c22';

  const fetchFeed = async () => {
    const feedData = await FeedsService.fetchFeedById(feedId);
    setData(feedData);
  };

  const isSubscribed = true;

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className={style.main}>
      <Paper elevation={12} className={style.header}>
        <div className={style.feed_info}>
          <div className={style.texts}>
            <h3 className={style.title}>{data.title}</h3>
            <h4 className={style.author}>{data.author}</h4>
            <small
              className={style.description}
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
            <div className={style.actions}>
              <Button variant={isSubscribed ? 'outlined' : 'contained'}>
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </Button>
              <Button
                variant='contained'
                onClick={() => {
                  openModal();
                }}
              >
                Support
              </Button>
              {/* <Button
                variant='contained'
                onClick={() => {
                  openRedeemModal();
                }}
              >
                Redeem Feed
              </Button> */}
              <SupportRequestModal isOpen={isOpen} onClose={closeModal} feedTitle={data.title} />
              <CasterRequestModal isOpen={redeemIsOpen} onClose={closeRedeemModal} />
            </div>
          </div>
          <img className={style.photo} src={data.photoUrl} />
        </div>
      </Paper>
      <Paper elevation={12} className={style.search_bar}>
        <CustomTextField
          id='standard-episode_search'
          label='Search through episodes'
          variant='outlined'
          color='secondary'
          size='small'
          fullWidth
          className={style.search_input}
          InputLabelProps={{
            style: { color: '#e8e6e3' },
          }}
        />
        <Button variant='contained' className={style.search_button}>
          Search
        </Button>
      </Paper>
      {data.episodesId.episodes.map((episode, index) => (
        <Paper key={index} elevation={12} className={style.ep_card}>
          <img src={episode.photoUrl} />

          <div className={style.card_text}>
            <div className={style.main_info}>
              <h3>{episode.title}</h3>°<h3>{format(new Date(episode.pubDate), 'dd/MM/yyyy')}</h3>°
              <h3>{episode.length}</h3>
            </div>
            <h4 dangerouslySetInnerHTML={{ __html: episode.description }} />
          </div>

          <div className={style.button}>
            <Button variant='contained'>
              <FaPlay />
            </Button>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default Feed;
