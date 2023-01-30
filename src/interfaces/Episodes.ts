import { EStatus } from './EStatus';

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
  episodes: IEpisode[];
  isPrivate: boolean;
  privateFeed?: string;
  caster: ICaster;
  created_At?: Date;
  updated_At?: Date;
}

interface ICaster {
  _id: string;
  userId: string;
  feeds: {
    feedId: string;
    proofUrl: string;
    status: EStatus;
    approvedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

interface IEpisode {
  _id: string;
  feedId: string;
  episodes: {
    photoUrl: string;
    title: string;
    description: string;
    length: string;
    pubDate: Date;
    audioUrl: string;
  }[];
  created_At?: Date;
  updated_At?: Date;
}
