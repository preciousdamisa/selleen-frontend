import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, Observable, of, pipe } from 'rxjs';
import { concatAll, exhaustMap, map, take, tap } from 'rxjs/operators';

import {
  GetImageUploadURLQueryParams,
  GetImageUploadURLResBody,
  Image,
  SimpleReqQuery,
  SimpleResBody,
} from 'src/app/shared/types/shared';
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
  private image!: Image;

  constructor(private http: HttpClient) {}

  get selectedProduct() {
    return this._selectedProduct;
  }

  set selectedProduct(p) {
    this._selectedProduct = p;
  }

  getProductImageUploadURLs(image: File): Observable<GetImageUploadURLResBody> {
    return this.http.get<GetImageUploadURLResBody>(
      `${this.baseUrl}shop/products/image-upload-url?fileType=${image.type}`
    );
  }

  uploadProductImages(image: File): Observable<any> {
    return this.getProductImageUploadURLs(image).pipe(
      take(1),
      exhaustMap((res) => {
        this.image = { url: res.data.key };
        return this.http.put(res.data.url, image);
      })
    );
  }

  addProduct(data: AddOrEditProductReqBody, images: File[]) {
    return this.uploadProductImages(images[0]).pipe(
      take(1),
      exhaustMap(() => {
        console.log(this.image);

        const images = [this.image];
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
