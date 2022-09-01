export interface SelectOption {
  label: string;
  value: string;
}

export interface Address {
  full: string;
  city: string;
  state: string;
  country: string;
}

export interface Name {
  first: string;
  last: string;
}

export interface SimpleResBody {
  message: string;
}

export interface AuthReqBody {
  email: string;
  password: string;
}

export interface AuthResBody {
  message: string;
  data: {
    _id: string;
    token: string;
    tokenExpirationDate: number;
  };
}

export interface GetEntityCountResBody {
  message: string;
  data: {
    count: number;
  };
}

export interface Coords {
  lng: number;
  lat: number;
}
