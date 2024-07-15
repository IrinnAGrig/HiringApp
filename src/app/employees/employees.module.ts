import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { SingleEmployeeInfoComponent } from './single-employee-info/single-employee-info.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployeesComponent,
    SingleEmployeeInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
