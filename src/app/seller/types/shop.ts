export interface UserShop {
  name: string;
  id: string;
}

export interface Role {
  name: 'Owner' | 'Manager' | 'SupportStaff';
  shopId: string;
}
