export interface User {
    uid: string;
    email: string;
    displayName?: string;
}
export interface Project {
    id?: string;
    title: string,
    key: string,
    type: string,
    category: string,
    url: string,
    lead: string,
    owner: string,
    description: string,
    created_date: Date
}
export interface Issue {
    id?: string;
    summary: string,
    project?: string,
    type: string,
    priority: string,
    dueDate: Date,
    assignee: string,
    description: string,
    created_date?: Date,
    status?: string,
    owner?: string
}
