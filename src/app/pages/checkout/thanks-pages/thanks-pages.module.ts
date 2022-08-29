import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThanksPagesRoutingModule } from './thanks-pages-routing.module';
import { ThanksPagesComponent } from './thanks-pages.component';


@NgModule({
  declarations: [
    ThanksPagesComponent
  ],
  imports: [
    CommonModule,
    ThanksPagesRoutingModule
  ]
})
export class ThanksPagesModule { }
