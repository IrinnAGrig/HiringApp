import { Injectable } from "@angular/core";
import { environment } from "src/assets/environment/environment";
import { Job, JobForm, JobSimplest } from "./jobs.model";
import { HttpClient } from "@angular/common/http";
import { Observable, map, tap } from "rxjs";


@Injectable({ providedIn: 'root' })
export class JobsService {
    private apiUrl = environment.fireDatabase + 'jobs';

    constructor(private http: HttpClient) { }

    addJob(data: JobForm): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '.json', data);
    }
    editJob(jobId: string, data: JobForm): Observable<boolean> {
        return this.http.put<boolean>(`${this.apiUrl}/${jobId}.json`, data);
    }
    getJobs(type: string): Observable<Job[]> {
        return this.http.get<{ [key: string]: JobForm }>(this.apiUrl + '.json').pipe(
            map((data) => {
                return Object.keys(data)
                    .filter(key => type == 'All' || data[key].status == type)
                    .map(key => {
                        const jobDetails = data[key];
                        const job: Job = {
                            id: key, ...jobDetails
                        }
                        return job;
                    });
            })
        );
    }
    getJobById(id: string): Observable<Job> {
        return this.http.get<Job>(this.apiUrl + '/' + id + '.json').pipe(
            map((job: JobForm) => {
                return { id: id, ...job };
            })
        );
    }
    getJobsSimplest(): Observable<JobSimplest[]> {
        return this.http.get<{ [key: string]: JobForm }>(this.apiUrl + '.json').pipe(
            map((data) => {
                return Object.keys(data)
                    .filter(key => data[key].status == 'In search')
                    .map(key => {
                        const jobDetails = data[key];
                        const job: JobSimplest = {
                            id: key, name: jobDetails.name
                        }
                        return job;
                    });
            })
        );
    }
    getCompletmentJobs(): Observable<{ completed: number; uncompleted: number }> {
        return this.http.get<{ [key: string]: JobForm }>(this.apiUrl + '.json').pipe(
          map((data) => {
            let completedCount = 0;
            let uncompletedCount = 0;
      
            Object.keys(data).forEach((key) => {
              const jobDetails = data[key];
      
              if (jobDetails.status === 'In search') {
                uncompletedCount++;
              } else if (jobDetails.status === 'Completed') {
                completedCount++;
              }
            });
      
            return { completed: completedCount, uncompleted: uncompletedCount };
          })
        );
      }
}