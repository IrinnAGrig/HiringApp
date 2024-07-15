import { Injectable } from "@angular/core";
import { environment } from "src/assets/environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, forkJoin, map, of, switchMap, tap, throwError } from "rxjs";
import { Employee, EmployeeForm, EmployeeSimple, FiltersEmployees } from "./employees.model";
import { ApplicationService } from "../applications/applications.service";
import { JobsService } from "../jobs/jobs.service";
import { JobApplication } from "../applications/applications.model";


@Injectable({ providedIn: 'root' })
export class EmployeesService {
  private apiUrl = environment.fireDatabase + 'employees';

  constructor(private http: HttpClient, private applicantService: ApplicationService, private jobService: JobsService) { }

  addEmployee(data: EmployeeForm): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '.json', data);
  }
  editEmployee(jobId: string, data: EmployeeForm): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${jobId}.json`, data);
  }
  getEmployees(dataFilter: FiltersEmployees): Observable<EmployeeSimple[]> {
    return this.http.get<{ [key: string]: EmployeeSimple }>(this.apiUrl + '.json').pipe(
      switchMap((data) => {
        const employeeObservables: Observable<EmployeeSimple>[] = Object.keys(data)
          .filter(key => (dataFilter.typeWork === 'All' || data[key].typeWork === dataFilter.typeWork)
            && (dataFilter.status === 'All' || data[key].status === dataFilter.status)
            && (dataFilter.typeCalification === 'All' || data[key].typeCalification === dataFilter.typeCalification))
          .map(key => {
            const employeeDetails = data[key];
            return this.jobService.getJobsSimplest().pipe(
              map(res => ({
                id: key,
                name: employeeDetails.name,
                email: employeeDetails.email,
                phone: employeeDetails.phone,
                jobId: employeeDetails.jobId,
                jobName: res.find(job => job.id === employeeDetails.jobId)?.name ?? '', // Use '' as fallback
                status: employeeDetails.status,
                typeWork: employeeDetails.typeWork,
                typeCalification: employeeDetails.typeCalification,
                dateStarted: employeeDetails.dateStarted,
                dateEnded: employeeDetails.dateEnded ?? '' // Use '' as fallback for dateEnded
              }))
            );
          });

        if (employeeObservables.length === 0) {
          return of([]); // Return an empty array if no records match the filter
        }

        return forkJoin(employeeObservables); // Combine all observables into one
      })
    );
  }
  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}.json`).pipe(
      switchMap((employee: Employee) => {
        return this.applicantService.getApplicationById(employee.idApplicant).pipe(
          map((res: JobApplication) => ({
            id: id,
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            birthDate: employee.birthDate,
            jobId: employee.jobId,
            jobName: employee.jobName,
            idApplicant: employee.idApplicant,
            resume: res.resume,
            status: employee.status,
            typeWork: employee.typeWork,
            typeCalification: employee.typeCalification,
            dateStarted: employee.dateStarted,
            dateEnded: employee.dateEnded
          })),
          catchError((error) => {
            console.error('Error fetching applicant data:', error);
            return of(employee);
          })
        );
      }),
      catchError((error) => {
        console.error('Error fetching employee data:', error);
        return throwError('Employee not found');
      })
    );
  }
}