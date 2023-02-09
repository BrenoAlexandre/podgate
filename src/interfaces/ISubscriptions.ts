export interface ISubscription {
  _id: string;
  userId: string;
  feedsId: string[];
  created_At?: Date;
  updated_At?: Date;
}
