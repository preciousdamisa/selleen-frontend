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

export interface SimpleReqQuery {
  searchText?: string;
  pageNumber: number;
  pageSize: number;
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

export interface ApproveEntityReqBody {
  action: 'Approved' | 'Disapproved' | 'Suspended';
  comment: string;
}

export interface Image {
  url: string;
}

export interface Coords {
  lng: number;
  lat: number;
}

export interface Todo {
  message: string;
}

export interface GetTodosResBody {
  message: string;
  data: { todos: Todo[] };
}

export interface Creator {
  userId: string;
  name: Name;
}

export interface DropdownItem {
  id: string;
  name: string;
  iconName?: string;
}

export interface Tab {
  id: string;
  name: string;
}

export interface Price {
  original: number;
  sales: number;
}

export interface GetFileUploadURLResBody {
  message: string;
  data: {
    url: string;
    key: string;
  };
}

export interface GetFileUploadURLQueryParams {
  fileType: string;
  folderName: string;
}
