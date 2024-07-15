import { Component } from '@angular/core';
import { ApplicationService } from '../shared/services/applications/applications.service';
import { FiltersApplications, JobApplication, JobApplicationForm, typesApplic } from '../shared/services/applications/applications.model';
import { FormControl, FormGroup } from '@angular/forms';
import { JobsService } from '../shared/services/jobs/jobs.service';
import { JobSimplest } from '../shared/services/jobs/jobs.model';
import { Router } from '@angular/router';
import { TableInfo } from '../shared/components/table-template/table.model';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent {
  typesApplic = typesApplic;
  applications: JobApplication[] = [];
  originalApplications: JobApplication[] = [];
  formFilters: FormGroup;
  jobsSim: JobSimplest[] = [];
  searchTerm: string = "";
  tablesDetails: TableInfo[] = [];
  isLoading = true;

  constructor(private applicService: ApplicationService, private jobsService: JobsService, private router: Router) {
    this.tablesDetails = [{
      name: 'Name',
      hasSort: true,
      bodyVarName: 'name'
    },
    {
      name: 'Email',
      hasSort: true,
      bodyVarName: 'email'
    },
    {
      name: 'Sent',
      hasSort: true,
      bodyVarName: 'timeSended'
    }
    ];
    this.jobsService.getJobsSimplest().subscribe(res => this.jobsSim = res)
    this.formFilters = new FormGroup({
      typeApplic: new FormControl("All"),
      seen: new FormControl("All"),
      idJob: new FormControl("All"),
    });

    const filters: FiltersApplications = {
      typeApplic: "All",
      seen: "All",
      idJob: "All"
    };
    this.getApplications(filters);
    this.formFilters.valueChanges.subscribe(value => {
      this.isLoading = true;
      const filtersActivity: FiltersApplications = {
        typeApplic: value.typeApplic,
        seen: value.seen,
        idJob: value.idJob
      };
      this.getApplications(filtersActivity);
    });

  }

  selectApplication(applic: any) {
    this.router.navigate([`/applications/${applic}`])
  }

  searchApplic() {
    this.applications = this.originalApplications.filter(data => data.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      data.email.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  getApplications(filtersActivity: FiltersApplications) {
    this.applicService.getApplications(filtersActivity).subscribe(res => {
      this.isLoading = false;
      this.applications = res;
      this.originalApplications = res;
    });
  }
}
