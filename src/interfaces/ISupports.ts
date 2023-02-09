import { EStatus } from './EStatus';

export interface ISupport {
  _id: string;
  userId: string;
  feeds: {
    feedId: string;
    receiptUrl: string;
    status: EStatus;
    approvedAt?: Date;
    expiresAt?: Date;
  };
  created_At?: Date;
  updated_At?: Date;
}
