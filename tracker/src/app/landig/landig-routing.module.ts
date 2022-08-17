import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandigPage } from './landig.page';

const routes: Routes = [
  {
    path: '',
    component: LandigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandigPageRoutingModule {}
