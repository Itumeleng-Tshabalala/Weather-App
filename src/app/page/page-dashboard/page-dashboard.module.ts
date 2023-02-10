import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageDashboardRoutingModule } from './page-dashboard-routing.module';
import { PageDashboardComponent } from './page-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { WeatherApi } from 'src/app/shared/api/weather.api';

@NgModule({
  declarations: [PageDashboardComponent],
  imports: [
    CommonModule,
    PageDashboardRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [WeatherApi],
})
export class PageDashboardModule {}
