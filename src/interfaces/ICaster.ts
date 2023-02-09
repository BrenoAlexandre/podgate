import { EStatus } from './EStatus';

export interface ICaster {
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
