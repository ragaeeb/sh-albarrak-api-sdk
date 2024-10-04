import { BookExplanationApiResponse, FullFatwaApiResponse, LessonApiResponse, RawFatawaResponse } from './types/api';
import { BookExplanation, BookExplanations, Fatawa, Fatwa, Lesson } from './types/types';
import { mapApiFatwaResponse, mapApiLessonResponseToLesson, mapApiRawFatwa, mapApiRawLesson } from './utils/mapping';
import { doGetJson, doGetNextJson } from './utils/network';

export const getBookExplanation = async (id: number): Promise<BookExplanation> => {
    const {
        pageProps: {
            index: { id: idStr, lessons, link, title },
        },
    } = (await doGetNextJson(`/books-explanations/${id}.json`)) as BookExplanationApiResponse;
    return { id: parseInt(idStr), lessonCount: lessons.length, lessons: lessons.map(mapApiRawLesson), link, title };
};

export const getBookExplanations = async (
    nextToken: string = `/api/posts/BookExplanationSeries`,
): Promise<BookExplanations> => {
    return (await doGetJson(nextToken)) as BookExplanations;
};

export const getFatawa = async (nextToken: string = `/api/posts/Fatwa`): Promise<Fatawa> => {
    const result = (await doGetJson(nextToken)) as RawFatawaResponse;
    return { items: result.items.map(mapApiRawFatwa), ...(result.next && { next: result.next }) };
};

export const getFatwa = async (id: number): Promise<Fatwa> => {
    const fatwa = (await doGetNextJson(`/fatwas/${id}.json`)) as FullFatwaApiResponse;
    return mapApiFatwaResponse(fatwa);
};

export const getLesson = async (id: number): Promise<Lesson> => {
    const lesson = (await doGetNextJson(`/books-explanations/lessons/${id}.json`)) as LessonApiResponse;
    return mapApiLessonResponseToLesson(lesson);
};

export * from './types/types';
