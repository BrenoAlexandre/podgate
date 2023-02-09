export interface IEpisode {
  _id: string;
  feedId: string;
  episodes: Episode[];
  created_At?: Date;
  updated_At?: Date;
}

export interface Episode {
  photoUrl: string;
  title: string;
  description: string;
  length: string;
  pubDate: Date;
  audioUrl: string;
}
