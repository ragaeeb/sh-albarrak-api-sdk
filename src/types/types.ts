import { RawBookExplanation, RawBookExplanations } from './api';

export type Category = {
    id: number;
    link: string;
    title: string;
};

export type Lesson = {
    audios?: string[];
    categories: Category[];
    content?: string;
    date: Date;
    dateText: string;
    docs?: string[];
    id: number;
    link: string;
    pdfs?: string[];
    title: string;
};

export interface BookExplanation extends RawBookExplanation {
    lessons?: Lesson[];
}

export type BookExplanations = RawBookExplanations;

export type Fatwa = {
    audios?: string[];
    categories?: Category[];
    content?: string;
    date?: Date;
    dateText: string;
    id: number;
    link: string;
    question?: string;

    title: string;
};

export type Fatawa = {
    items: Fatwa[];
    next?: string;
};
