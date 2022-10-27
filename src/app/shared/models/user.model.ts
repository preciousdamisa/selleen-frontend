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
    private _tokenExpirationDate: Date,
    public address?: Address,
    public gender?: string,
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
    _tokenExpirationDate: string;
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
      new Date(userData._tokenExpirationDate),
      userData?.address,
      userData?.gender,
      userData?.image,
      userData?.cart,
      userData?.roles
    );
  }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  get tokenExpirationDate() {
    return this._tokenExpirationDate;
  }
}
