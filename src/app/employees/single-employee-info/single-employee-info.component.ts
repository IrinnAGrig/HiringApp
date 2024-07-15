import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApplication, JobApplicationForm } from 'src/app/shared/services/applications/applications.model';
import { ApplicationService } from 'src/app/shared/services/applications/applications.service';
import { Employee, EmployeeForm } from 'src/app/shared/services/employees/employees.model';
import { EmployeesService } from 'src/app/shared/services/employees/employees.service';
import { JobSimplest } from 'src/app/shared/services/jobs/jobs.model';
import { JobsService } from 'src/app/shared/services/jobs/jobs.service';

@Component({
  selector: 'app-single-employee-info',
  templateUrl: './single-employee-info.component.html',
  styleUrls: ['./single-employee-info.component.scss']
})
export class SingleEmployeeInfoComponent {
  employee: Employee | null = null;
  currentMode: 'edit' | 'add' | 'view' = 'view';
  employeeForm: FormGroup;
  isFormEnabled: boolean = true;
  typeWorks = ['Remote', 'In officio', 'Hibrid'];
  statuses = ['Full-time', 'Part-time', 'Probationer'];
  califications = ['Junior', 'Middle', 'Senior', 'Normal'];
  jobs: JobSimplest[] = [];
  newEmploy = false;
  appplicant: JobApplication | null = null;

  constructor(private applicService: ApplicationService, private route: ActivatedRoute,
    private router: Router, private employeesService: EmployeesService,
    private location: Location, private jobsService: JobsService) {
    this.employeeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      birth: new FormControl('', Validators.required),
      status: new FormControl(this.statuses[0], Validators.required),
      typeWork: new FormControl(this.typeWorks[0], Validators.required),
      calification: new FormControl(this.califications[3], Validators.required),
      job: new FormControl("", Validators.required),
    });
    this.jobsService.getJobsSimplest().subscribe(res => {
      this.jobs = res;
    })
    this.route.params.subscribe(params => {
      if (params['idEmployee'].includes('id=')) {
        this.newEmploy = true;
        let id = params['idEmployee'].split('id=')[1];
        this.applicService.getApplicationById(id).subscribe(res => {
          if (res) {
            this.appplicant = res;
            this.employee = {} as Employee;
            this.employee.idApplicant = res.id;
            this.employee.name = res.name;
            this.employee.email = res.email;
            this.employee.phone = res.phone;
            this.employee.resume = res.resume;
            this.employee.jobId = res.jobId;
          }

          this.employeeForm.patchValue({
            name: res.name,
            email: res.email,
            phone: res.phone,
            job: res.jobId
          });
        });
      } else {
        let id = params['idEmployee'];
        this.employeeForm.disable();
        this.isFormEnabled = false;
        this.employeesService.getEmployeeById(id).subscribe(res => {
          this.employee = res;
          console.log(res)
          this.employeeForm.patchValue({
            name: res.name,
            email: res.email,
            phone: res.phone,
            birth: res.birthDate,
            job: res.jobId
          });
        })
      }
    });
  }
  goBack() {
    this.location.back();
  }
  mapJobApplicationToForm(application: JobApplication): JobApplicationForm {
    return Object.assign({}, application);
  }
  toggleForm() {
    this.isFormEnabled = !this.isFormEnabled;
    if (this.isFormEnabled) {
      this.employeeForm.enable();
    } else if (this.employee) {

      let value = this.employeeForm.value;

      const newEmployee: EmployeeForm = {
        name: value.name,
        email: value.email,
        phone: value.phone,
        jobId: this.employee?.jobId,
        jobName: this.employee?.jobName,
        idApplicant: this.employee.idApplicant,
        status: value.status,
        typeWork: value.typeWork,
        typeCalification: value.calification,
        birthDate: value.birth,
        dateStarted: this.getCurrentDay(),
        dateEnded: undefined
      };
      if (this.newEmploy) {
        this.employeesService.addEmployee(newEmployee).subscribe(() => {
          this.employeeForm.disable();
          if (this.appplicant) {
            let dat = this.mapJobApplicationToForm(this.appplicant);
            dat.isEmployee = true;
            this.applicService.editApplication(this.employee!.idApplicant, dat).subscribe()
          }

          this.isFormEnabled = false;
        })
      } else {
        if (this.employee.id)
          this.employeesService.editEmployee(this.employee.id, newEmployee).subscribe(() => {
            this.employeeForm.disable();
            this.isFormEnabled = false;
          })
      }

    }
  }
  getCurrentDay(): string {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = currentDate.getFullYear();

    return `${day}-${month}-${year}`;
  }
}
