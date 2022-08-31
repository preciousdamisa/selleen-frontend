import { Address, Name } from 'src/app/shared/types/shared';

export class Admin {
  constructor(
    public _id: string,
    public name: Name,
    public email: string,
    public phone: string,
    public address: Address,
    public permissions: string[],
    private _token: string,
    private tokenExpirationDate: Date
  ) {}

  static fromJson(userData: {
    _id: string;
    name: Name;
    email: string;
    phone: string;
    address: Address;
    permissions: string[];
    _token: string;
    tokenExpirationDate: string;
  }) {
    return new Admin(
      userData._id,
      userData.name,
      userData.email,
      userData.phone,
      userData.address,
      userData.permissions,
      userData._token,
      new Date(userData.tokenExpirationDate)
    );
  }

  get token() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
