import { promises as fs } from 'fs';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { DataType, getAllIdsFor, getDataItems, getPage } from '../src/index';
import { Page } from './types/types';
import { doGetJson, doGetNextJson, doGetText } from './utils/network';

vi.mock('./utils/network');

describe('index', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getAllIdsFor', () => {
        const loadMockData = async (path: string) => {
            const mockData = await fs.readFile(`testing/sitemaps/${path}`, 'utf-8');
            (doGetText as Mock).mockResolvedValue(mockData);
        };

        it('should get all the book explanation ids', async () => {
            await loadMockData('books-explanations.xml');

            const actual = await getAllIdsFor(DataType.BookExplanations);
            expect(actual).toEqual([2, 29435]);
        });

        it('should get all the book fatawa ids', async () => {
            await loadMockData('fatwas.xml');

            const actual = await getAllIdsFor(DataType.Fatwas);
            expect(actual).toEqual([164, 30618]);
        });

        it('should get all the lecture ids', async () => {
            await loadMockData('lectures.xml');

            const actual = await getAllIdsFor(DataType.Lectures);
            expect(actual).toEqual([750, 29644]);
        });

        it('should get all the book explanation lesson ids', async () => {
            await loadMockData('books-explanations/lessons.xml');

            const actual = await getAllIdsFor(DataType.BooksExplanationsLessons);
            expect(actual).toEqual([178, 29843]);
        });
    });

    describe('getDataItems', () => {
        const loadMockData = async (path: string) => {
            const mockData = JSON.parse(await fs.readFile(`testing/api/posts/${path}`, 'utf-8'));
            (doGetJson as Mock).mockResolvedValue(mockData);
        };

        it('should list the articles', async () => {
            await loadMockData('Article.json');

            const actual = await getDataItems(DataType.Articles);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(10);
        });

        it('should list the audio books', async () => {
            await loadMockData('AudioBookSeries.json');

            const actual = await getDataItems(DataType.AudioBooks);
            expect(actual).toEqual({ items: expect.any(Array) });
            expect(actual.items).toHaveLength(3);
        });

        it('should list the books', async () => {
            await loadMockData('Book.json');

            const actual = await getDataItems(DataType.Books);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(10);
        });

        it('should list the book explanations', async () => {
            await loadMockData('BookExplanationSeries.json');

            const actual = await getDataItems(DataType.BookExplanations);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(9);
        });

        it('should list the daily lessons', async () => {
            await loadMockData('DailyLesson.json');

            const actual = await getDataItems(DataType.BookExplanations);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(10);
        });

        it('should list the fatawa', async () => {
            await loadMockData('Fatwa.json');

            const actual = await getDataItems(DataType.Fatwas);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(10);
        });

        it('should list the fiqh selections', async () => {
            await loadMockData('FiqhiSelection.json');

            const actual = await getDataItems(DataType.FiqhiSelections);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(10);

            expect(actual.items[0]).toEqual({
                dateArabic: expect.any(String),
                id: 8624,
                link: '/fiqhi-selections/8624',
                title: 'تأخير طواف الحج وسعيه عند الوداع',
            });
        });

        it('should list the lectures', async () => {
            await loadMockData('Lecture.json');

            const actual = await getDataItems(DataType.Lectures);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(10);
        });

        it('should list the khutab', async () => {
            await loadMockData('PublicSpeech.json');

            const actual = await getDataItems(DataType.PublicSpeeches);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(10);
        });

        it('should list the ilmi benefits', async () => {
            await loadMockData('ScienceBenefit.json');

            const actual = await getDataItems(DataType.ScienceBenefits);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(10);
        });

        it('should list the research', async () => {
            await loadMockData('ScientificResearch.json');

            const actual = await getDataItems(DataType.ScientificResearches);
            expect(actual).toEqual({ items: expect.any(Array) });
            expect(actual.items).toHaveLength(4);
        });

        it('should list the videos', async () => {
            await loadMockData('SelectedVideo.json');

            const actual = await getDataItems(DataType.SelectedVideos);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(10);
        });
    });

    describe('getPage', () => {
        const loadMockData = async (path: string, dataType: DataType): Promise<Page> => {
            const mockData = JSON.parse(await fs.readFile(`testing/nextApi/${path}`, 'utf-8'));
            (doGetNextJson as Mock).mockResolvedValue(mockData);

            return getPage(1, dataType);
        };

        it('should get an article', async () => {
            const actual = await loadMockData('articles/18136.json', DataType.Articles);
            expect(actual).toEqual({
                content: expect.any(String),
                dateArabic: '٣٠/شعبان/١٤٤١ الموافق ٢٣/أبريل/٢٠٢٠',
                docs: [expect.any(String)],
                excerpt: expect.any(String),
                id: 18136,
                link: '/articles/18136',
                pdfs: [expect.any(String)],
                title: 'ما أحلى سكون الليل',
            });
        });
    });
});
