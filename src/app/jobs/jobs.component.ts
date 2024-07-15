import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JobsService } from '../shared/services/jobs/jobs.service';
import { Job, JobForm } from '../shared/services/jobs/jobs.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {
  jobForm!: FormGroup;
  isCreatingJob = false;
  typeJobs = 'All';
  jobs: Job[] = [];
  @ViewChild(QuillEditorComponent) quillEditor?: QuillEditorComponent;


  constructor(private jobsService: JobsService, private formBuilder: FormBuilder, private router: Router) {
    this.jobForm = this.formBuilder.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.getJobs();
  }

  changeCategoryJobs(event: Event) {
    this.typeJobs = (event.target as HTMLSelectElement).value;
    this.getJobs();
  }

  goToIndividualJob(jobId: string) {
    this.router.navigate(['/jobs', jobId]);
  }

  onSubmit() {
    if (this.jobForm.valid) {
      const formData = this.jobForm.value;

      const data: JobForm = {
        name: formData.name,
        created: this.getCurrentDay(),
        description: formData.description,
        status: 'In search',
        details: formData.description
      };
      this.jobsService.addJob(data).subscribe(res => {
        this.isCreatingJob = false;
        this.getJobs();
      })
    }
  }
  getJobs() {
    this.jobsService.getJobs(this.typeJobs).subscribe(res => this.jobs = res);
  }
  getCurrentDay(): string {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = currentDate.getFullYear();

    return `${day}-${month}-${year}`;
  }
  cancelAddingJob() {
    this.jobForm.reset();
    this.isCreatingJob = false;
  }
}
