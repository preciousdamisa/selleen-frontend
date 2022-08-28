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

export interface AuthResBody {
  message: string;
  data: {
    _id: string;
    token: string;
    expiresIn: string;
  };
}
