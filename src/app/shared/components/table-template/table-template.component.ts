import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { TableInfo } from './table.model';

@Component({
  selector: 'app-table-template',
  templateUrl: './table-template.component.html',
  styleUrls: ['./table-template.component.scss']
})
export class TableTemplateComponent implements OnChanges {
  @Input() tableInfo: TableInfo[] = [];
  @Input() data: any[] = [];
  @Input() isLoading = true;
  @Output() idData = new EventEmitter<string>();
  pagedData: any[] = [];
  noDataFound = false;
  currentPage = 1;
  itemsPerPage = 10;
  sortedElement: {
    element: string,
    direction: 'nor' | 'asc' | 'desc'
  } = {
      element: 'title',
      direction: 'nor'
    };

  ngOnChanges() {
    if (this.data.length > 0) {
      this.noDataFound = false;
      this.getPagedData(this.data);
    } else {
      this.noDataFound = true; 
    }
  }

  selectData(selectedDataId: string) {
    this.idData.emit(selectedDataId);
  }

  sortTable(field: string): void {
    if (this.sortedElement.element === field) {
      this.sortedElement.direction = this.sortedElement.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedElement.element = field;
      this.sortedElement.direction = 'asc';
    }

    this.data.sort((a, b) => {

      const aValue = this.verifyIsDate(a[this.sortedElement.element]) ? this.combineDate(a.date) : a[this.sortedElement.element];
      const bValue = this.verifyIsDate(b[this.sortedElement.element]) ? this.combineDate(b.date) : b[this.sortedElement.element];
      return this.sortedElement.direction === 'asc' ? (aValue > bValue ? 1 : -1) : (bValue > aValue ? 1 : -1);
    });
    this.getPagedData(this.data);

  }
  getPagedData(data: any[]) {
    this.pagedData = data.slice((this.currentPage - 1) * this.itemsPerPage, (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage);
  }
  verifyIsDate(date: string): boolean {
    let regex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;

    return regex.test(date);
  }

  combineDate(date: string): Date {
    let day = 0, month = 0, year = 0;
    if (date) {
      const parts = date.split('-');
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1; // Months in JavaScript are 0-indexed (0 = January)
      year = parseInt(parts[2], 10);
    }

    return new Date(year, month, day);
  }
  handlePageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getPagedData(this.data);
  }
}
