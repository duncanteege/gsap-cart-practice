import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GsapCartPageRoutingModule } from './gsap-cart-routing.module';

import { GsapCartPage } from './gsap-cart.page';
import { ComponentsModule } from 'src/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    GsapCartPageRoutingModule
  ],
  declarations: [GsapCartPage]
})
export class GsapCartPageModule {}
