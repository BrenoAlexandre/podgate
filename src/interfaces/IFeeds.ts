import { ICaster } from './ICaster';
import { IEpisode } from './IEpisodes';

export interface IHomeFeeds {
  _id: string;
  feeds: IFeed[];
}

export interface IFeed {
  _id: string;
  url: string;
  title: string;
  description: string;
  author: string;
  photoUrl: string;
  category: string;
  episodesId: IEpisode;
  isPrivate: boolean;
  privateFeed?: string;
  casterId: string;
  created_At?: Date;
  updated_At?: Date;
}
