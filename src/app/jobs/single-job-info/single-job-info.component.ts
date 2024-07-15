import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job, JobForm } from 'src/app/shared/services/jobs/jobs.model';
import { JobsService } from 'src/app/shared/services/jobs/jobs.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/shared/services/applications/applications.service';
import { JobApplicationForm } from 'src/app/shared/services/applications/applications.model';

@Component({
  selector: 'app-single-job-info',
  templateUrl: './single-job-info.component.html',
  styleUrls: ['./single-job-info.component.scss']
})
export class SingleJobInfoComponent implements OnInit {
  job!: Job;
  applicationForm: FormGroup;
  showApplyForm = false;
  showEditForm = false;
  isPublicRoute = false;
  jobForm: FormGroup;
  successSentApplication: boolean | null = null;

  constructor(private route: ActivatedRoute,
    private jobsService: JobsService,
    private applicationService: ApplicationService,
    private location: Location,
    private formBuilder: FormBuilder) {
    this.route.url.subscribe(segments => {
      if (segments.length > 0 && segments[0].path === 'job') {
        this.isPublicRoute = true;
      } else {
        this.isPublicRoute = false;
      }
    });
    this.jobForm = this.formBuilder.group({
      name: ['', Validators.required],
      details: [''],
      description: ['', Validators.required]
    });
    this.applicationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      coverLetter: ['', Validators.required],
      resume: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobsService.getJobById(params['idJob']).subscribe(res => {
        this.job = res;
        this.jobForm.setValue({
          name: this.job.name,
          details: this.job.details,
          description: this.job.description
        });
      });
    });
  }
  goBack() {
    this.location.back();
  }
  onSubmitEdit() {
    if (this.jobForm.valid) {
      const formData = this.jobForm.value;

      const data: JobForm = {
        name: formData.name,
        created: this.job.created,
        description: formData.description,
        status: 'In search',
        details: formData.details
      };
      this.jobsService.editJob(this.job.id, data).subscribe(() => {
        this.showEditForm = false;
        this.jobsService.getJobById(this.job.id).subscribe(res => this.job = res);
      })
    }
  }
  onSubmitApply() {
    if (this.applicationForm.valid) {
      const formData = this.applicationForm.value;

      this.saveJobApplication(formData);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      this.applicationForm.patchValue({
        resume: base64String
      });
    };
    if (file) {
    }
    reader.readAsDataURL(file);
  }

  async saveJobApplication(formData: any) {
    await this.applicationForm.valid;

    const applicationData: JobApplicationForm = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      jobId: this.job.id,
      seen: 'No',
      status: 'Pending',
      isEmployee: false,
      timeSended: this.getCurrentDay(),
      coverLetter: formData.coverLetter,
      resume: formData.resume
    };
    this.applicationService.addApplication(applicationData).subscribe((res) => {
      this.successSentApplication = res ? true : false;
      this.applicationForm.reset();
      setTimeout(() => {
        this.applicationForm.reset();
        this.successSentApplication = null;
        this.showApplyForm = false;
        this.jobsService.getJobById(this.job.id).subscribe(res => this.job = res);
      }, 3000);
    })
  }
  getCurrentDay(): string {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = currentDate.getFullYear();

    return `${day}-${month}-${year}`;
  }

  changeStatus(status: string) {
    this.job.status = status;
    let job: JobForm = {
      name: this.job.name,
      created: this.job.created,
      description: this.job.description,
      status: this.job.status,
      details: this.job.details
    };
    this.jobsService.editJob(this.job.id, job).subscribe();
  }
  hideForm() {
    this.applicationForm.reset();
    this.showApplyForm = false;
  }
  cancelEditJob() {
    this.jobForm.reset();
    this.showEditForm = false;
  }
}
