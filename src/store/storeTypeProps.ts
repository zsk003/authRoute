export interface tagsProps {
    title: string;
    path: string;
    params?: Record<string, any>;
    query?: Record<string, any>;
}

export interface stateProps {
    isOpen?: boolean;
    tags: Array<tagsProps>;
    userInfo?: any;
}
