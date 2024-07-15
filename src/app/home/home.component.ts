import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from '../shared/services/jobs/jobs.service';
import { Job } from '../shared/services/jobs/jobs.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  jobs: Job[] = [];

  constructor(private jobsService: JobsService, private router: Router) {
    this.getJobs();
  }
  getJobs() {
    this.jobsService.getJobs('In search').subscribe(res => {
      this.jobs = res;
    })
  }
  goToIndividualJob(jobId: string) {
    this.router.navigate(['/home/job/', jobId]);
  }
}
