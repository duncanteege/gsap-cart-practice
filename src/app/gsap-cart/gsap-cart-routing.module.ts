import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GsapCartPage } from './gsap-cart.page';

const routes: Routes = [
  {
    path: '',
    component: GsapCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GsapCartPageRoutingModule {}
