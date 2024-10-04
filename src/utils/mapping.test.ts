import { describe, expect, it } from 'vitest';

import { FullFatwaApiResponse, LessonApiResponse, RawFatwa, RawLesson } from '../types/api';
import { Fatwa, Lesson } from '../types/types';
import { mapApiFatwaResponse, mapApiLessonResponseToLesson, mapApiRawFatwa, mapApiRawLesson } from './mapping';

describe('mapping', () => {
    describe('mapApiFatwaResponse', () => {
        it('should map FullFatwaApiResponse to Fatwa correctly', () => {
            const apiResponse: FullFatwaApiResponse = {
                pageProps: {
                    fullDate: '2023-01-01',
                    postContent: {
                        audios: [{ link: 'audio1.mp3' }],
                        content: 'Fatwa content',
                        date: 'January 1, 2023',
                        dateISO: '2023-01-01',
                        id: '1',
                        link: '/fatwa-link',
                        question: 'What is the ruling?',
                        tags: [],
                        title: 'Fatwa Title',
                        topics: [{ id: '123', link: '/topic-link', title: 'Topic Title' }],
                    },
                    relatedPosts: [],
                    selectedPage: 1,
                },
            };

            const expected: Fatwa = {
                audios: ['audio1.mp3'],
                categories: [{ id: 123, link: '/topic-link', title: 'Topic Title' }],
                content: 'Fatwa content',
                date: new Date('2023-01-01'),
                dateText: 'January 1, 2023',
                id: 1,
                link: '/fatwa-link',
                question: 'What is the ruling?',
                title: 'Fatwa Title',
            };

            expect(mapApiFatwaResponse(apiResponse)).toEqual(expected);
        });
    });

    describe('mapApiLessonResponseToLesson', () => {
        it('should map LessonApiResponse to Lesson correctly', () => {
            const lessonResponse: LessonApiResponse = {
                pageProps: {
                    fullDate: '2023-01-01',
                    postContent: {
                        audios: [{ link: 'audio1.mp3' }],
                        content: 'Lesson content',
                        date: 'January 1, 2023',
                        dateISO: '2023-01-01',
                        id: '1',
                        link: '/lesson-link',
                        nextPost: null,
                        pdfs: [{ link: 'pdf1.pdf' }],
                        prevPost: null,
                        tags: [],
                        title: 'Lesson Title',
                        topics: [],
                        words: [{ link: 'doc1.doc' }],
                    },
                    relatedPosts: [],
                    selectedPage: 1,
                    seriesInfo: {
                        seriesStartDate: '2023-01-01',
                        seriesStatus: 'Ongoing',
                        topic: { link: '/series-link', title: 'Series Title' },
                    },
                },
            };

            const expected: Lesson = {
                audios: ['audio1.mp3'],
                categories: [],
                content: 'Lesson content',
                date: new Date('2023-01-01'),
                dateText: 'January 1, 2023',
                docs: ['doc1.doc'],
                id: 1,
                link: '/lesson-link',
                pdfs: ['pdf1.pdf'],
                title: 'Lesson Title',
            };

            expect(mapApiLessonResponseToLesson(lessonResponse)).toEqual(expected);
        });
    });

    describe('mapApiRawFatwa', () => {
        it('should map RawFatwa to Fatwa correctly', () => {
            const rawFatwa: RawFatwa = {
                date: 'January 1, 2023',
                id: '1',
                link: '/fatwa-link',
                postSlug: 'fatwa-slug',
                releaseDate: '2023-01-01',
                tags: [],
                tagsLength: 0,
                title: 'Fatwa Title',
                topics: [],
                topicsLength: 0,
                type: { link: '/type-link', title: 'Type Title' },
            };

            const expected: Fatwa = {
                dateText: 'January 1, 2023',
                id: 1,
                link: '/fatwa-link',
                title: 'Fatwa Title',
            };

            expect(mapApiRawFatwa(rawFatwa)).toEqual(expected);
        });
    });

    describe('mapApiRawLesson', () => {
        it('should map RawLesson to Lesson correctly', () => {
            const rawLesson: RawLesson = {
                date: 'January 1, 2023',
                dateGmt: '2023-01-01',
                id: '1',
                link: '/lesson-link',
                title: 'Lesson Title',
                topic: [{ id: '123', link: '/topic-link', title: 'Topic Title' }],
            };

            const expected: Lesson = {
                categories: [{ id: 123, link: '/topic-link', title: 'Topic Title' }],
                date: new Date('2023-01-01'),
                dateText: 'January 1, 2023',
                id: 1,
                link: '/lesson-link',
                title: 'Lesson Title',
            };

            expect(mapApiRawLesson(rawLesson)).toEqual(expected);
        });
    });
});
