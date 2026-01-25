export interface ICategory {
    id: string;
    name: string;
    icon: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateCategory {
    name: string;
    icon: string;
    color: string;
}

export interface IUpdateCategory {
    name?: string;
    icon?: string;
    color?: string;
}
