export interface EmployeeSimple {
    id: string;
    name: string;
    email: string;
    phone: string;
    jobId: string;
    jobName: string;
    status: 'Full-time' | 'Part-time' | 'Probationer';
    typeWork: 'Remote' | 'In officio' | 'Hibrid';
    typeCalification: 'Junior' | 'Middle' | 'Senior' | 'Normal';
    dateStarted: string;
    dateEnded?: string;
}
export interface Employee {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    jobId: string;
    jobName: string;
    idApplicant: string;
    resume: string;
    status: 'Full-time' | 'Part-time' | 'Probationer';
    typeWork: 'Remote' | 'In officio' | 'Hibrid';
    typeCalification: 'Junior' | 'Middle' | 'Senior' | 'Normal';
    dateStarted: string;
    dateEnded?: string;
}
export interface EmployeeForm {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    jobId: string;
    jobName: string;
    idApplicant: string;
    status: 'Full-time' | 'Part-time' | 'Probationer';
    typeWork: 'Remote' | 'In officio' | 'Hibrid';
    typeCalification: 'Junior' | 'Middle' | 'Senior' | 'Normal';
    dateStarted: string;
    dateEnded?: string;
}
export interface FiltersEmployees {
    typeWork: string,
    status: string,
    typeCalification: string
  }