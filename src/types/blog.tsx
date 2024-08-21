export interface Blog {
    id: string;
    title: string;
    description: string;
    src: string;
    categories?: string[];
    publishedAt: string;
}

export interface BlogCategory {
    key: string;
    label: string;
    count?: number;
}
