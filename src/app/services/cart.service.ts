import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCounter: number = 0;

  constructor() { }

  increaseCartCounter(): void {
    this.cartCounter = this.cartCounter + 1;
  }

  decreaseCartCounter(): void {
    if(this.cartCounter === 0) return;
    this.cartCounter = this.cartCounter - 1;
  }

  getCartCounter(): number {
    return this.cartCounter;
  }

}
