import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-pdf-viewer',
    templateUrl: './pdf-viewer.component.html',
    styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
    pdfData!: SafeResourceUrl;
    @Input() base64File!: string;

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64File);
    }
}