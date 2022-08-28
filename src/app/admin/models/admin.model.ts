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

  get token() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
