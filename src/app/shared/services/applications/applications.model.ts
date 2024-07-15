export interface JobApplicationForm {
  name: string;
  email: string;
  phone: string;
  jobId: string;
  isEmployee: boolean;
  timeSended: string;
  coverLetter: string;
  status: 'Pending' | 'Rejected' | 'Test' | 'Interview' | 'Accepted';
  seen: 'Yes' | 'No';
  resume: string;
}
export interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobId: string;
  isEmployee: boolean;
  status: 'Pending' | 'Rejected' | 'Test' | 'Interview' | 'Accepted';
  seen: 'Yes' | 'No';
  timeSended: string;
  coverLetter: string;
  resume: string;
}
export interface FiltersApplications {
  typeApplic: string,
  seen: string,
  idJob: string
}
export interface UpdateIsEmployee {
  isEmployee: boolean;
}
export const typesApplic = ['Pending', 'Rejected', 'Test', 'Interview', 'Accepted'];