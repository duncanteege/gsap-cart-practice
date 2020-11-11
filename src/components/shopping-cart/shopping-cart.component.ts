import {  Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {

  public isClosed = false;
  public isAnimating = false;

  constructor() { }

  ngOnInit() {
  }


  public toggleShoppingCart() {
    this.isClosed = !this.isClosed;
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    },2000);
  }
}
