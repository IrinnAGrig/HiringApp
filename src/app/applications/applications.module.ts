import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SingleApplicationComponent } from './single-application/single-application.component';


@NgModule({
  declarations: [
    ApplicationsComponent,
    SingleApplicationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ApplicationsRoutingModule,
    SharedModule
  ]
})
export class ApplicationsModule { }
