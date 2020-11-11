import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-gsap',
  templateUrl: './shopping-cart-gsap.component.html',
  styleUrls: ['./shopping-cart-gsap.component.scss'],
})
export class ShoppingCartGsapComponent implements OnInit {
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
    }, 2000);
  }
}
