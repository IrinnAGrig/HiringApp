import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JobsService } from '../shared/services/jobs/jobs.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  year: number = new Date().getFullYear();
  currentMonthIndex: number = new Date().getMonth();
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  types: string[] = ['Jobs', 'Applications', 'Employee'];
  formFilters: FormGroup;

  jobInfo = {
    completed: 0,
    uncompleted: 0
  }

  constructor(private jobsService: JobsService) {
    this.formFilters = new FormGroup({
      typeApplic: new FormControl("All"),
      seen: new FormControl("All"),
      idJob: new FormControl("All"),
    });
    this.getJobsInfo();
  }
  getJobsInfo() {
    this.jobsService.getCompletmentJobs().subscribe(res => {
      this.jobInfo.completed = res.completed;
      this.jobInfo.uncompleted = res.uncompleted;
    })
  }
  calculateProgressBarWidth(jobInfo: { completed: number, uncompleted: number }): string {
    const totalJobs = jobInfo.completed + jobInfo.uncompleted;
    const progressWidth = (jobInfo.completed * 100 / totalJobs) + '%';
    return progressWidth;
  }
}
