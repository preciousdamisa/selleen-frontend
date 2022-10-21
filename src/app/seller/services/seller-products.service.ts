import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';

import {
  GetFileUploadURLResBody,
  Image,
  SimpleReqQuery,
  SimpleResBody,
} from 'src/app/shared/types/shared';
import { getFileType } from 'src/app/shared/utils/file';
import { environment } from 'src/environments/environment';
import {
  AddOrEditProductReqBody,
  GetProductsResBody,
  Product,
} from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class SellerProductsService {
  private baseUrl = `${environment.apiUrl}`;

  private _selectedProduct: Product | null = null;
  private images: Image[] = [];

  constructor(private http: HttpClient) {}

  get selectedProduct() {
    return this._selectedProduct;
  }

  set selectedProduct(p) {
    this._selectedProduct = p;
  }

  getProductImageUploadURL(
    images: File[]
  ): Observable<GetFileUploadURLResBody[]> {
    const requests: Observable<GetFileUploadURLResBody>[] = [];

    images.forEach((img) => {
      const req = this.http.get<GetFileUploadURLResBody>(
        `${this.baseUrl}files/upload-url?fileType=${getFileType(
          img
        )}&folderName=products`
      );

      requests.push(req);
    });

    return forkJoin(requests);
  }

  uploadProductImages(images: File[]): Observable<any> {
    return this.getProductImageUploadURL(images).pipe(
      take(1),
      exhaustMap((res) => {
        res.forEach((data) => {
          this.images.push({ url: data.data.key });
        });

        const requests: Observable<any>[] = [];

        images.forEach((img, i) => {
          const req = this.http.put(res[i].data.url, img);
          requests.push(req);
        });

        return forkJoin(requests);
      })
    );
  }

  addProduct(data: AddOrEditProductReqBody, images: File[]) {
    return this.uploadProductImages(images).pipe(
      take(1),
      exhaustMap(() => {
        const images = [...this.images];
        const updatedData = { ...data, images };

        return this.http.post<SimpleResBody>(
          `${this.baseUrl}shop/products`,
          updatedData
        );
      })
    );
  }

  editProduct(data: AddOrEditProductReqBody, prodId: string) {
    return this.http.put<SimpleResBody>(
      `${this.baseUrl}shop/products/${prodId}`,
      data
    );
  }

  getProducts(data: SimpleReqQuery, shopId: string) {
    const params = new HttpParams({ fromObject: { ...data } });

    return this.http.get<GetProductsResBody>(
      `${this.baseUrl}shop/products/${shopId}`,
      { params }
    );
  }
}
