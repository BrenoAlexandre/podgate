import React, { useCallback, useEffect, useState } from 'react';
import { Button, Paper, TextField, Tooltip } from '@mui/material';
import styled from 'styled-components';
import { format } from 'date-fns';
import { FaPlay } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Ring } from '@uiball/loaders';

import { Episode } from '../../interfaces/IEpisodes';
import { IFeed } from '../../interfaces/IFeeds';
import { FeedsService } from '../../services/server/feeds/feeds.service';
import CasterRequestModal from '../../components/caster_request_modal';
import SupportRequestModal from '../../components/support_request_modal';
import { usePlayer } from '../../contexts/PlayerContext';

import style from './style.module.scss';
import { useAuth } from '../../contexts/AuthContext';
import { SubscriptionsService } from '../../services/server/subscriptions/subscriptions.service';
import { useDebounce } from '../../services/hooks/useDebounce';

const CustomTextField = styled(TextField)`
  & label.MuiOutlinedInput {
    color: #e8e6e3;
  }
  & .MuiOutlinedInput-root {
    &.MuiOutlinedInput-root fieldset {
      color: #e8e6e3;
      border-color: #e8e6e3;
    }
  }
  & .MuiInputBase-input {
    color: #e8e6e3;
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

  casterId: '',
  isPrivate: false,
  privateFeed: '',
  created_At: new Date(),
  updated_At: new Date(),
};

const Feed: React.FC = () => {
  const [data, setData] = useState<IFeed>(emptyFeed);
  const [privateData, setPrivateData] = useState<IFeed>(emptyFeed);

  const [allEpisodes, setAllEpisodes] = useState<Episode[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>([]);
  const [filter, setFilter] = useState<string>('');

  const [isSubscribed, setIsSubscribed] = useState(false);

  const [redeemIsOpen, setIsRedeemOpen] = useState<boolean>(false);
  const openRedeemModal = () => setIsRedeemOpen(true);
  const closeRedeemModal = () => setIsRedeemOpen(false);

  const [supportIsOpen, setSupportIsOpen] = useState<boolean>(false);
  const openSupportModal = () => setSupportIsOpen(true);
  const closeSupportModal = () => setSupportIsOpen(false);

  const [isSubTooltipOpen, setSubIsTooltipOpen] = useState<boolean>(false);
  const handleSubTooltip = () => setSubIsTooltipOpen(!isSubTooltipOpen);
  const [isAcTooltipOpen, setAcIsTooltipOpen] = useState<boolean>(false);
  const handleAcTooltip = () => setAcIsTooltipOpen(!isAcTooltipOpen);

  const { playAudio } = usePlayer();
  const { user, logged } = useAuth();
  const { feedId = '' } = useParams();

  const isClaimed = !!data.casterId;

  const handleFilter = useCallback(
    async (newFilter: string) => {
      if (!newFilter) setFilteredEpisodes(allEpisodes);
      else {
        const lowerFilter = newFilter.toLowerCase();

        const filteredDataOptions: Episode[] = [];

        allEpisodes.map((option) => {
          const match = option.title
            .toLowerCase()
            .startsWith(lowerFilter.slice(0, Math.max(option.title.length - 1, 1)));

          if (match) filteredDataOptions.push(option);
          return option;
        });

        setFilteredEpisodes(filteredDataOptions);
      }
    },
    [filter]
  );

  const fetchFeed = async () => {
    const feedData = await FeedsService.fetchFeedById(feedId);
    setData(feedData);
    setAllEpisodes(feedData.episodesId.episodes);
    setFilteredEpisodes(feedData.episodesId.episodes);

    if (user._id && user.subscriptionsId) fetchUserSubscriptions(feedData._id);

    console.log(data);
    if (data.privateFeed) {
      const privateFeedData = await FeedsService.fetchFeedById(data.privateFeed);
      setPrivateData(privateFeedData);

      let allEps = [];
      allEps.push(...feedData.episodesId.episodes, ...privateFeedData.episodesId.episodes);
      allEps.sort(function (a, b) {
        var keyA = new Date(a.pubDate),
          keyB = new Date(b.pubDate);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      setAllEpisodes(allEps);
      setFilteredEpisodes(allEps);
    }
  };

  const fetchUserSubscriptions = async (feed_id: string) => {
    const userSubs = await SubscriptionsService.getSubscriptionData();
    const isSubbed = userSubs[0].feedsId.filter((feedId: string) => feedId === feed_id)[0];
    setIsSubscribed(!!isSubbed);
  };

  const subscribe = async () => {
    await SubscriptionsService.subscribe(data._id);
    setIsSubscribed(true);
  };

  const unsubscribe = async () => {
    await SubscriptionsService.unsubscribe(data._id);
    setIsSubscribed(false);
  };

  useEffect(() => {
    fetchFeed();
  }, [feedId]);

  return (
    <div className={style.main}>
      <Paper elevation={12} className={style.header}>
        <div className={style.feed_info}>
          <div className={style.left}>
            <div className={style.texts}>
              <h3 className={style.title}>{data.title}</h3>
              <h4 className={style.author}>{data.author}</h4>
              <small
                className={style.description}
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
            <div className={style.actions}>
              <Tooltip
                title='Login to subscribe'
                arrow
                disableHoverListener
                open={isSubTooltipOpen}
                onClose={handleSubTooltip}
              >
                <Button
                  variant={isSubscribed ? 'outlined' : 'contained'}
                  onClick={() => {
                    logged ? (isSubscribed ? unsubscribe() : subscribe()) : handleSubTooltip();
                  }}
                >
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </Button>
              </Tooltip>
              <Tooltip
                title='Login to proceed further'
                arrow
                disableHoverListener
                open={isAcTooltipOpen}
                onClose={handleAcTooltip}
              >
                {isClaimed ? (
                  <Button
                    variant='contained'
                    onClick={() => (logged ? openSupportModal() : handleAcTooltip())}
                  >
                    Support
                  </Button>
                ) : (
                  <Button
                    variant='contained'
                    onClick={() => (logged ? openRedeemModal() : handleAcTooltip())}
                  >
                    Redeem Feed
                  </Button>
                )}
              </Tooltip>
              <SupportRequestModal
                isOpen={supportIsOpen}
                onClose={closeSupportModal}
                feedTitle={data.title}
                feedId={data._id}
              />
              <CasterRequestModal
                isOpen={redeemIsOpen}
                onClose={closeRedeemModal}
                feedId={data._id}
              />
            </div>
          </div>
          <div className={style.image}>
            {data.photoUrl ? <img src={data.photoUrl} /> : <Ring color='white' size={200} />}
          </div>
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
          value={filter}
          onChange={(e) => {
            let filter = e.target.value;
            setFilter(filter);
            handleFilter(filter);
          }}
        />
        <Button variant='contained' className={style.search_button}>
          Search
        </Button>
      </Paper>
      {filteredEpisodes.map((episode: Episode, index: number) => (
        <Paper key={index} elevation={12} className={style.ep_card}>
          <div className={style['ep_image']}>
            <img src={episode.photoUrl} />
          </div>

          <div className={style.card_text}>
            <div className={style.main_info}>
              <h3>{episode.title}</h3>•<h3>{format(new Date(episode.pubDate), 'dd/MM/yyyy')}</h3>•
              <h3>{episode.length}</h3>
            </div>
            <h4 dangerouslySetInnerHTML={{ __html: episode.description }} />
          </div>

          <div className={style.button}>
            <Button
              variant='contained'
              sx={{ p: 3, borderRadius: 100 }}
              onClick={() => {
                playAudio({
                  audioUrl: episode.audioUrl,
                  image: episode.photoUrl,
                  title: episode.title,
                  channel: data.title,
                  feedId: data._id,
                });
              }}
            >
              <FaPlay />
            </Button>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default Feed;
