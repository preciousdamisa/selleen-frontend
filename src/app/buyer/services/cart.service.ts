import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

import {
  CartProduct,
  AddToCartReqBody,
  AddToCartResBody,
  BuyerProduct,
} from '../types/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = `${environment.apiUrl}`;

  cart: CartProduct[] = [];
  cartUpdated$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  addToCart(data: BuyerProduct) {
    const newProd: CartProduct = {
      name: data.name,
      price: data.price.sales,
      productId: data._id,
      quantity: 1,
      shopId: data.shop.id,
    };

    const modifiedProds = [...this.cart];
    const prod = modifiedProds.find((p) => p.productId === newProd.productId);
    if (prod) {
      this.modifyProductQty(prod.productId, 'Add');
      return;
    }

    modifiedProds.push(newProd);
    this.cart = modifiedProds;
    this.notifyCartUpdateListeners();
    this.saveCartToStorage();
  }

  initializeCart() {
    const cartJson = localStorage.getItem('cart');
    if (!cartJson) return;

    const cart = JSON.parse(cartJson);
    this.cart = cart;
    this.notifyCartUpdateListeners();
  }

  notifyCartUpdateListeners() {
    const totalQty = this.cart
      .map((prod) => prod.quantity)
      .reduce((a, b) => a + b, 0);

    this.cartUpdated$.next(totalQty);
  }

  modifyProductQty(id: string, operation: 'Add' | 'Subtract') {
    const modifiedProds = [...this.cart];
    const prodIndex = modifiedProds.findIndex((p) => p.productId === id);
    const prod = modifiedProds.find((p) => p.productId === id)!;
    let modifiedProd;
    if (operation === 'Add') {
      modifiedProd = { ...prod, quantity: prod.quantity + 1 };
    } else {
      modifiedProd = { ...prod, quantity: prod.quantity - 1 };
    }

    if (modifiedProd.quantity < 1) {
      this.removeProduct(id);
      return;
    }

    modifiedProds[prodIndex] = modifiedProd;
    this.cart = modifiedProds;
    this.notifyCartUpdateListeners();
    this.saveCartToStorage();
  }

  removeProduct(id: string) {
    const modifiedProds = [...this.cart];
    const prodIndex = modifiedProds.findIndex((p) => p.productId === id);
    modifiedProds.splice(prodIndex, 1);
    this.cart = modifiedProds;
    this.notifyCartUpdateListeners();
    this.saveCartToStorage();
  }

  getProdsTotalAmt() {
    return this.cart
      .map((prod) => prod.price * prod.quantity)
      .reduce((a, b) => a + b, 0);
  }

  saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart() {
    this.cart = [];
    this.notifyCartUpdateListeners();
    localStorage.removeItem('cart');
  }
}
