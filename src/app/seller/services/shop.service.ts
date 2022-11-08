import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import {
  GetFileUploadURLResBody,
  Image,
  SimpleResBody,
  UploadedFile,
} from 'src/app/shared/types/shared';
import {
  BankAccountDetails,
  GetShopByIdResBody,
  Shop,
  UpdateShopReqBody,
  UpdateSMLinksReqBody,
} from '../types/shop';
import { getFileType } from 'src/app/shared/utils/file';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private baseUrl = `${environment.apiUrl}`;
  currentShop?: Shop;
  shopUpdated = false;

  private logo?: UploadedFile;
  private banner?: UploadedFile;
  private personalId?: UploadedFile;

  constructor(private http: HttpClient) {}

  getShop(id: string) {
    let req: Observable<GetShopByIdResBody>;

    const storageResult = this.lookupStorage()?.pipe(
      map((shop) => ({ message: 'Successfully retrieved shop', data: shop }))
    );

    if (storageResult && !this.shopUpdated) req = storageResult;
    else req = this.http.get<GetShopByIdResBody>(`${this.baseUrl}shops/${id}`);

    return req.pipe(
      map((x) => x.data),
      tap((res) => this.handleShop(res))
    );
  }

  lookupStorage(): Observable<Shop> | null {
    const shopData = localStorage.getItem('shopData');
    if (!shopData) return null;

    const parsedShopData = JSON.parse(shopData);

    return new Observable<Shop>((subscriber) => {
      subscriber.next(parsedShopData);
      subscriber.complete();
    });
  }

  handleShop(shop: Shop) {
    // const shop = new Shop(
    //   res.data._id,
    //   res.data.name,
    //   res.data.alias,
    //   res.data.description,
    //   res.data.email,
    //   res.data.logo,
    //   res.data.coverImages,
    //   res.data.creator,
    //   res.data.owners,
    //   res.data.supportStaff,
    //   res.data.contactLines,
    //   res.data.tags,
    //   res.data.address,
    //   res.data.rating,
    //   res.data.socialMediaLinks,
    //   res.data.personalIds,
    //   res.data.approved,
    //   res.data.approval,
    //   res.data.status,
    //   res.data.paymentDetails
    // );

    // this.shop$.next(shop);
    this.currentShop = shop;
    this.shopUpdated = false;

    localStorage.setItem('shopData', JSON.stringify(shop));
  }

  updateShop(data: UpdateShopReqBody, shopId: string) {
    return this.http
      .patch<SimpleResBody>(`${this.baseUrl}shops/${shopId}`, data)
      .pipe(
        take(1),
        tap(() => (this.shopUpdated = true)),
        exhaustMap(() => this.getShop(shopId))
      );
  }

  updateLogo(img: File, shopId: string) {
    return this.deleteFileOnS3(shopId, 'logo').pipe(
      take(1),
      exhaustMap(() => {
        return this.uploadFileToS3(img, 'logos').pipe(
          take(1),
          exhaustMap(() => {
            return this.http.patch(`${this.baseUrl}shops/${shopId}/logo`, {
              url: this.logo!.url,
            });
          })
        );
      })
    );
  }

  updateBanner(img: File, shopId: string) {
    return this.deleteFileOnS3(shopId, 'banners').pipe(
      take(1),
      exhaustMap(() => {
        return this.uploadFileToS3(img, 'banners').pipe(
          take(1),
          exhaustMap(() => {
            return this.http.patch(`${this.baseUrl}shops/${shopId}/banners`, {
              url: this.banner!.url,
            });
          })
        );
      })
    );
  }

  deleteFileOnS3(
    shopId: string,
    urlSegment: 'logo' | 'banners' | 'personal-id'
  ) {
    return this.http.delete(`${this.baseUrl}shops/${shopId}/${urlSegment}`);
  }

  updateBankAccDetails(data: BankAccountDetails, shopId: string) {
    const paymentDetails = { paymentDetails: { bankAccountDetails: data } };

    return this.http
      .patch(`${this.baseUrl}shops/${shopId}/payment-details`, paymentDetails)
      .pipe(
        take(1),
        tap(() => (this.shopUpdated = true)),
        exhaustMap(() => this.getShop(shopId))
      );
  }

  updateSMLinks(data: UpdateSMLinksReqBody, shopId: string) {
    return this.http
      .patch(`${this.baseUrl}shops/${shopId}/social-media-links`, data)
      .pipe(
        take(1),
        tap(() => (this.shopUpdated = true)),
        exhaustMap(() => this.getShop(shopId))
      );
  }

  saveId(
    type: 'NationalId' | 'PVC' | 'DriverLicense',
    file: File,
    shopId: string
  ) {
    return this.deleteFileOnS3(shopId, 'personal-id').pipe(
      take(1),
      exhaustMap(() => {
        return this.uploadFileToS3(file, 'kyc-docs').pipe(
          take(1),
          exhaustMap(() => {
            return this.http.patch<SimpleResBody>(
              `${this.baseUrl}shops/${shopId}/personal-id`,
              {
                type,
                url: this.personalId?.url,
                originalName: file.name,
              }
            );
          })
        );
      })
    );
  }

  getUploadUrl(file: File, folderName: 'logos' | 'banners' | 'kyc-docs') {
    return this.http.get<GetFileUploadURLResBody>(
      `${this.baseUrl}files/upload-url?fileType=${getFileType(
        file
      )}&folderName=${folderName}`
    );
  }

  uploadFileToS3(file: File, folderName: 'logos' | 'banners' | 'kyc-docs') {
    return this.getUploadUrl(file, folderName).pipe(
      take(1),
      exhaustMap((res) => {
        const data: UploadedFile = { url: res.data.key };

        if (folderName === 'logos') this.logo = data;
        else if (folderName === 'banners') this.banner = data;
        else if (folderName === 'kyc-docs') this.personalId = data;

        return this.http.put(res.data.url, file);
      })
    );
  }
}
