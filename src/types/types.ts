export interface Item {
    date?: Date;
    dateArabic?: string;
    id: number;
    link?: string;
    title: string;
}

export interface Page extends Item {
    audios?: string[];
    content?: string;
    docs?: string[];
    excerpt?: string;
    pdfs?: string[];
    youtubeId?: string;
}

export interface Collection extends Item {
    nextUrl?: string;
    pages: Page[];
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

export type PageDataTypes = Exclude<DataType, DataType.AudioBooks | DataType.BookExplanations>;

export type CollectionDataTypes = DataType.AudioBooks | DataType.BookExplanations;
