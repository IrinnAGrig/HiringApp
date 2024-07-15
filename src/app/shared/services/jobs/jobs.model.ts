export interface Job {
    id: string;
    name: string;
    created: string;
    description: string;
    status: string;
    details: string;
}

export interface JobForm {
    name: string;
    created: string;
    description: string;
    status: string;
    details: string;
}
export interface JobSimplest {
    id: string;
    name: string;
}
