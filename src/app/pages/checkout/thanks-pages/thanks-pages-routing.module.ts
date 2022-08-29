import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThanksPagesComponent } from './thanks-pages.component';

const routes: Routes = [{ path: '', component: ThanksPagesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThanksPagesRoutingModule { }
