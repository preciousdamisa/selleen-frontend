import { CartProduct } from 'src/app/buyer/types/product.types';
import { Role, UserShop } from 'src/app/seller/types/shop';
import { Address, Name, Image } from 'src/app/shared/types/shared';

export class User {
  constructor(
    public _id: string,
    public name: Name,
    public phone: string,
    public email: string,
    public hasShop: boolean,
    public shops: UserShop[],
    private _token: string,
    private tokenExpirationDate: Date,
    public gender?: string,
    public address?: Address,
    public image?: Image,
    public cart?: CartProduct[],
    public roles?: Role[]
  ) {}

  static fromJson(userData: {
    _id: string;
    name: Name;
    phone: string;
    email: string;
    hasShop: boolean;
    shops: UserShop[];
    _token: string;
    tokenExpirationDate: string;
    gender?: string;
    address?: Address;
    image?: Image;
    cart?: CartProduct[];
    roles?: Role[];
  }) {
    return new User(
      userData._id,
      userData.name,
      userData.phone,
      userData.email,
      userData.hasShop,
      userData.shops,
      userData._token,
      new Date(userData.tokenExpirationDate),
      userData?.gender,
      userData?.address,
      userData?.image,
      userData?.cart,
      userData?.roles
    );
  }

  get token() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
