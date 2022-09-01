import * as sharedTypes from '../../shared/types/shared';

export interface AdminSignupReqBody {
  name: sharedTypes.Name;
  email: string;
  phone: string;
  address: sharedTypes.Address;
  password: string;
}

export interface GetAdminResBody {
  message: string;
  data: {
    _id: string;
    name: sharedTypes.Name;
    email: string;
    phone: string;
    address: sharedTypes.Address;
    password: string;
    permissions: string[];
  };
}
