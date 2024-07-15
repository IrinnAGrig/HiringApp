import { Injectable } from "@angular/core";
import { environment } from "src/assets/environment/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, concatMap, forkJoin, map, of, switchMap, tap } from "rxjs";
import { FiltersApplications, JobApplication, JobApplicationForm, UpdateIsEmployee } from "./applications.model";
import { Notifications } from "./notifications.model";
import { JobsService } from "../jobs/jobs.service";


@Injectable({ providedIn: 'root' })
export class ApplicationService {
    private apiUrl = environment.fireDatabase + 'applications';
    private notificationsCountSubject = new BehaviorSubject<number>(0);
    notificationsCount$ = this.notificationsCountSubject.asObservable();

    constructor(private http: HttpClient, private jobService: JobsService) { }

    addApplication(data: JobApplicationForm): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '.json', data);
    }
    editApplication(id: string, data: JobApplicationForm): Observable<boolean> {
        return this.http.put<boolean>(`${this.apiUrl}/${id}.json`, data);
    }

    getApplications(dataFilter: FiltersApplications): Observable<JobApplication[]> {
        return this.http.get<{ [key: string]: JobApplicationForm }>(this.apiUrl + '.json').pipe(
            concatMap((data) => {
                const filteredApplications = Object.keys(data)
                    .filter(key => (dataFilter.typeApplic === 'All' || data[key].status === dataFilter.typeApplic)
                        && (dataFilter.idJob === 'All' || data[key].jobId === dataFilter.idJob)
                        && (dataFilter.seen === 'All' || data[key].seen === dataFilter.seen))
                    .map(key => {
                        const jobDetails = data[key];
                        return {
                            id: key, ...jobDetails
                        } as JobApplication;
                    });

                if (filteredApplications.length === 0) {
                    return of([]); // Returnează un Observable care emite un array gol
                }

                return of(filteredApplications);
            })
        );
    }
    getApplicationById(id: string): Observable<JobApplication> {
        return this.http.get<JobApplication>(this.apiUrl + '/' + id + '.json').pipe(
            map((job: JobApplicationForm) => {
                return { id: id, ...job };
            })
        );
    }
    getNotificationFromNewApplications(): Observable<Notifications[]> {
        return this.http.get<{ [key: string]: JobApplicationForm }>(this.apiUrl + '.json').pipe(
            switchMap(data => {
                const keys = Object.keys(data).filter(key => data[key].seen === 'No');
                const observables = keys.map(key =>
                    this.jobService.getJobById(data[key].jobId).pipe(
                        map(res => ({
                            id: key,
                            name: data[key].name,
                            email: data[key].email,
                            jobId: data[key].jobId,
                            jobName: res.name,
                            timeSended: data[key].timeSended
                        }))
                    )
                );
                return forkJoin(observables);
            })
        );
    }
    getApplicationsByMoth() {

    }
    getNumberNotifications() {
        return this.http.get<{ [key: string]: { seen: string } }>(this.apiUrl + '.json').pipe(
            tap(data => {
                const keys = Object.keys(data);
                const unseenNotifications = keys.filter(key => data[key].seen === 'No');
                this.notificationsCountSubject.next(unseenNotifications.length);
                console.log(unseenNotifications.length)
            })
        ).subscribe();
    }

    // searchApplications(search: string): Observable<JobApplication[]> {
    //     return this.http.get<{ [key: string]: JobApplicationForm }>(this.apiUrl + '.json').pipe(
    //         map((data) => {
    //             return Object.keys(data)
    //                 .filter(key => data[key].name.toLowerCase().includes(search) ||
    //                     data[key].email.toLowerCase().includes(search))
    //                 .map(key => {
    //                     const jobDetails = data[key];
    //                     const job: JobApplication = {
    //                         id: key, ...jobDetails
    //                     }
    //                     return job;
    //                 });
    //         })
    //     );
    // }
}