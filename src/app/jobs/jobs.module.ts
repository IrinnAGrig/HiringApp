import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    JobsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JobsRoutingModule,
    SharedModule,
    QuillModule.forRoot(),
  ]
})
export class JobsModule { }
