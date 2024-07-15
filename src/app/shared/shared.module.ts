import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { SafeHtmlPipe } from "./pipes/safe-html/safe-html.component";
import { ListJobsComponent } from './components/list-jobs/list-jobs.component';
import { ReactiveFormsModule } from "@angular/forms";
import { QuillModule } from "ngx-quill";
import { SingleJobInfoComponent } from "../jobs/single-job-info/single-job-info.component";
import { PdfViewerComponent } from "./components/pdf-viewer/pdf-viewer.component"
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TableTemplateComponent } from './components/table-template/table-template.component';
import { PaginationComponent } from './components/pagination/pagination.component';


@NgModule({
    declarations: [
        SafeHtmlPipe,
        ListJobsComponent,
        SingleJobInfoComponent,
        PdfViewerComponent,
        NotFoundComponent,
        SnackbarComponent,
        TableTemplateComponent,
        PaginationComponent
    ],
    imports: [CommonModule, ReactiveFormsModule, QuillModule],
    exports: [CommonModule, SafeHtmlPipe,
        ListJobsComponent, ReactiveFormsModule,
        QuillModule, SingleJobInfoComponent,
        PdfViewerComponent, NotFoundComponent,
        SnackbarComponent, TableTemplateComponent,
        PaginationComponent]
})
export class SharedModule { }