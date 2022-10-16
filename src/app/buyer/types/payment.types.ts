export interface BankTransferAuthorizationData {
  transfer_reference: string;
  transfer_account: string;
  transfer_bank: string;
  account_expiration: string;
  transfer_note: string;
  transfer_amount: number;
  mode: string;
}

export interface BankTransferResData {
  status: string;
  message: string;
  meta: {
    authorization: BankTransferAuthorizationData;
  };
}

export interface BankTransferResBody {
  message: string;
  data: BankTransferResData;
}
