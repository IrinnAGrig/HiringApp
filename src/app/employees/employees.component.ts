import { Component } from '@angular/core';
import { Employee, EmployeeSimple, FiltersEmployees } from '../shared/services/employees/employees.model';
import { EmployeesService } from '../shared/services/employees/employees.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { TableInfo } from '../shared/components/table-template/table.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  searchTerm: string = "";
  employees: EmployeeSimple[] = [];
  originalEmployees: EmployeeSimple[] = [];
  typeWorks = ['Remote', 'In officio', 'Hibrid'];
  statuses = ['Full-time', 'Part-time', 'Probationer'];
  califications = ['Junior', 'Middle', 'Senior', 'Normal'];
  formFilters: FormGroup;
  tablesDetails: TableInfo[] = [];
  isLoading = true;

  constructor(private employeesService: EmployeesService, private router: Router) {
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
      name: 'Admited',
      hasSort: true,
      bodyVarName: 'dateStarted'
    },
    {
      name: 'TypeWork',
      hasSort: false,
      bodyVarName: 'typeWork'
    },
    {
      name: 'Status',
      hasSort: false,
      bodyVarName: 'status'
    },
    {
      name: 'Calification',
      hasSort: false,
      bodyVarName: 'typeCalification'
    }
    ];
    this.formFilters = new FormGroup({
      typeWork: new FormControl("All"),
      status: new FormControl("All"),
      typeCalification: new FormControl("All"),
    });
    const filters: FiltersEmployees = {
      typeWork: "All",
      status: "All",
      typeCalification: "All"
    };
    this.getEmployees(filters);
    this.formFilters.valueChanges.subscribe(value => {
      this.isLoading = true;
      const filtersEmployee: FiltersEmployees = {
        typeWork: value.typeWork,
        status: value.status,
        typeCalification: value.typeCalification
      };
      this.getEmployees(filtersEmployee);
    });
  }

  getEmployees(filters: FiltersEmployees) {
    this.employeesService.getEmployees(filters).subscribe(res => {
      this.employees = res;
      this.isLoading = false;
      this.originalEmployees = res;
      console.log(res)
    }, error => {
      this.isLoading = false;
    })
  }
  searchEmployees() {
    this.employees = this.originalEmployees.filter(data => data.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      data.email.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
  selectEmployee(empl: any) {
    this.router.navigate([`/employees/${empl}`])
  }

}
