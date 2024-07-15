import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApplication, JobApplicationForm, typesApplic } from 'src/app/shared/services/applications/applications.model';
import { ApplicationService } from 'src/app/shared/services/applications/applications.service';

@Component({
  selector: 'app-single-application',
  templateUrl: './single-application.component.html',
  styleUrls: ['./single-application.component.scss']
})
export class SingleApplicationComponent {
  selectedApplication: JobApplication | null = null;
  showSetStatus = false;
  typeApplic: 'Pending' | 'Rejected' | 'Test' | 'Interview' | 'Accepted' = 'Pending';
  typesApplic = typesApplic;

  constructor(private applicService: ApplicationService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.applicService.getApplicationById(params['idApplication']).subscribe(res => {
        this.selectedApplication = res;
        if (!res.name) {
          this.selectedApplication.id = 'null';
        }
        if (res.seen == 'No' && this.selectedApplication) {
          let application = this.fromApplicToForm();
          if (application) {
            this.selectedApplication.seen = 'Yes';
            this.saveStatus();
          }
        }
      });
    });
  }
  goBack() {
    this.router.navigate(['/applications']);
  }
  goToEmploeePage() {
    this.router.navigate(['/employees/applicant?id=' + this.selectedApplication?.id]);
  }

  setStatus(event: any) {
    this.typeApplic = event.target.value;
  }
  fromApplicToForm(): JobApplicationForm | null {
    if (!this.selectedApplication) {
      return null;
    }
    const application: JobApplicationForm = {
      name: this.selectedApplication.name,
      email: this.selectedApplication.email,
      phone: this.selectedApplication.phone,
      jobId: this.selectedApplication.jobId,
      isEmployee: false,
      timeSended: this.selectedApplication.timeSended,
      coverLetter: this.selectedApplication.coverLetter,
      status: this.typeApplic,
      seen: this.selectedApplication.seen,
      resume: this.selectedApplication.resume
    };

    return application;
  }
  saveStatus() {
    if (this.selectedApplication) {
      let application = this.fromApplicToForm();
      if (application)
        this.applicService.editApplication(this.selectedApplication.id, application).subscribe(() => {
          this.showSetStatus = false;
          if (this.selectedApplication)
            this.selectedApplication.status = this.typeApplic;
          this.typeApplic = "Pending";
          this.applicService.getNumberNotifications();
        });
    }
  }
}
