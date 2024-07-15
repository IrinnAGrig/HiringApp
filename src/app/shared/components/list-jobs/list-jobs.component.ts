import { AfterContentChecked, AfterContentInit, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Job } from '../../services/jobs/jobs.model';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.scss']
})
export class ListJobsComponent implements OnChanges {
  @Input() jobs: Job[] = [];
  @Output() idJob = new EventEmitter<string>();
  itemsPerPage = 10;
  currentPage = 1;
  pagedJobs: Job[] = [];

  ngOnChanges() {
    if (this.jobs) {
      this.getPagedData(this.jobs);
    }
  }

  goToIndividualJob(jobId: string) {
    this.idJob.emit(jobId);
  }

  handlePageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getPagedData(this.jobs);
  }

  getPagedData(data: Job[]) {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedJobs = data.slice(startIndex, endIndex);
  }
}