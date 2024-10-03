export type Category = {
    id: number;
    link: string;
    title: string;
};

export type Lesson = {
    categories: Category[];
    date: string;
    dateGmt: Date;
    id: number;
    link: string;
    title: string;
};

export type BookExplanation = {
    id: number;
    lessonCount: number;
    lessons?: Lesson[];
    link: string;
    releaseDate?: string;
    title: string;
};

export type BookExplanations = {
    items: BookExplanation[];
    next?: string;
};
