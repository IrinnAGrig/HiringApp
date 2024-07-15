import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { PlotlyViaCDNModule } from 'angular-plotly.js';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    PlotlyViaCDNModule,
    ReactiveFormsModule
  ]
})
export class ReportModule { }
