import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';

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
import { ShopService } from './shop.service';

@Injectable({
  providedIn: 'root',
})
export class SellerProductsService {
  private baseUrl = `${environment.apiUrl}`;

  private _selectedProduct: Product | null = null;
  private images: Image[] = [];

  constructor(private http: HttpClient, private shopService: ShopService) {}

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
        return this.http.post<SimpleResBody>(`${this.baseUrl}shop/products`, {
          ...data,
          images: [...this.images],
        });
      })
    );
  }

  deleteProductImages(prodId: string) {
    return this.http.delete(
      `${this.baseUrl}shop/products/${
        this.shopService.currentShop!._id
      }/${prodId}/images`
    );
  }

  editProduct(
    data: AddOrEditProductReqBody,
    prodId: string,
    imagesUpdate: {
      imagesChanged: boolean;
      newImageFiles: File[];
      oldImages: Image[];
    }
  ) {
    if (imagesUpdate.imagesChanged) {
      return this.deleteProductImages(prodId).pipe(
        take(1),
        exhaustMap(() => {
          return this.uploadProductImages(imagesUpdate.newImageFiles).pipe(
            take(1),
            exhaustMap(() => {
              return this.http.put<SimpleResBody>(
                `${this.baseUrl}shop/products/${prodId}`,
                { ...data, images: [...this.images] }
              );
            })
          );
        })
      );
    } else {
      const images = this.getImageKeysForUpdate(imagesUpdate.oldImages);
      return this.http.put<SimpleResBody>(
        `${this.baseUrl}shop/products/${prodId}`,
        { ...data, images: [...images] }
      );
    }
  }

  getProducts(data: SimpleReqQuery, shopId: string) {
    const params = new HttpParams({ fromObject: { ...data } });

    return this.http
      .get<GetProductsResBody>(`${this.baseUrl}shop/products/${shopId}`, {
        params,
      })
      .pipe(
        map((res) => {
          const modifiedProds = res.data.map((prod) => {
            const modifiedImages = this.tranformImageUrls(prod.images);
            return { ...prod, images: modifiedImages };
          });

          return modifiedProds;
        })
      );
  }

  getImageKeysForUpdate(images: Image[]): Image[] {
    return images.map((img) => {
      const folderName = img.url.split('/')[4];
      const fileName = img.url.split('/')[5];
      const key = folderName + '/' + fileName;

      return { url: key };
    });
  }

  tranformImageUrls(images: Image[]) {
    return images.map((img) => ({
      ...img,
      url: environment.sellenAwsBucketUrl + img.url,
    }));
  }
}
