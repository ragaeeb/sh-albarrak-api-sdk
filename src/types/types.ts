export interface Item {
    dateArabic?: string;
    id: number;
    link?: string;
    title: string;
}

export interface Page extends Item {
    audios?: string[];
    content?: string;
    date?: Date;
    docs?: string[];
    excerpt?: string;
    pdfs?: string[];
    youtubeId?: string;
}

export enum DataType {
    Articles = 'articles',
    AudioBooks = 'audio-books',
    AudioBooksLessons = 'audio-books/lessons',
    BookExplanations = 'books-explanations',
    Books = 'books',
    BooksExplanationsLessons = 'books-explanations/lessons',
    DailyLessons = 'daily-lessons',
    Fatwas = 'fatwas',
    FiqhiSelections = 'fiqhi-selections',
    Lectures = 'lectures',
    PublicSpeeches = 'public-speeches',
    Recitations = 'recitations',
    ScienceBenefits = 'science-benefits',
    ScientificResearches = 'scientific-researches',
    SelectedVideos = 'selected-videos',
}

export type PaginatedContentItems = {
    items: Item[];
    next?: string;
};
