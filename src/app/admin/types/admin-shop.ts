import { Shop } from 'src/app/seller/types/shop';

export interface GetShopsResBody {
  message: string;
  data: Shop[];
}

export interface ApproveShopReqBody {
  action: 'Approved' | 'Disapproved' | 'Suspended';
  comment: string;
}
