import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CartProduct } from '../types/product.types';
import { BuyerProduct } from '../types/buyer.types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: CartProduct[] = [];
  cartUpdated$ = new BehaviorSubject<number>(0);

  addToCart(data: BuyerProduct, qty = 1) {
    const newProd: CartProduct = {
      name: data.name,
      price: data.price.sales,
      productId: data._id,
      quantity: qty,
      shopId: data.shop.id,
    };

    const modifiedProds = [...this.cart];
    const prod = modifiedProds.find((p) => p.productId === newProd.productId);
    if (prod) {
      this.modifyProductQty(prod.productId, 'Add', qty);
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

  modifyProductQty(id: string, opr: 'Add' | 'sub', qty = 1) {
    const modifiedProds = [...this.cart];
    const prodIndex = modifiedProds.findIndex((p) => p.productId === id);
    const prod = modifiedProds.find((p) => p.productId === id)!;
    let modifiedProd;
    if (opr === 'Add') {
      modifiedProd = { ...prod, quantity: prod.quantity + qty };
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
