import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartGsapComponent } from './shopping-cart-gsap/shopping-cart-gsap.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    ShoppingCartComponent,
    ShoppingCartGsapComponent
  ],
  exports: [
    ShoppingCartComponent,
    ShoppingCartGsapComponent
  ]
})
export class ComponentsModule {

}
