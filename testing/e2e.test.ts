import { describe, expect, it } from 'vitest';

import { DataType, getAllIdsFor, getDataItems, getNextItems, getPage } from '../src';

describe('e2e', () => {
    describe('getAllIdsFor', () => {
        it.each(Object.values(DataType))(
            'should get all the ids for %s',
            async (dataType) => {
                const actual = await getAllIdsFor(dataType);
                expect(actual.length > 1).toBe(true);
            },
            { timeout: 30000 },
        );
    });

    describe('getDataItems', () => {
        it('should list the articles', async () => {
            const actual = await getDataItems(DataType.Articles);
            expect(actual.items).toHaveLength(10);
        });

        it('should list the audio books', async () => {
            const actual = await getDataItems(DataType.AudioBooks);
            expect(actual.items.length > 2).toBe(true);
        });

        it('should list the books', async () => {
            const actual = await getDataItems(DataType.Books);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(10);
        });

        it('should list the book explanations', async () => {
            const actual = await getDataItems(DataType.BookExplanations);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items.length > 8).toBe(true);
        });

        it('should list the daily lessons', async () => {
            const actual = await getDataItems(DataType.DailyLessons);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items.length > 8).toBe(true);
        });

        it('should list the fatawa', async () => {
            const actual = await getDataItems(DataType.Fatwas);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(10);
        });

        it('should list the fiqh selections', async () => {
            const actual = await getDataItems(DataType.FiqhiSelections);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(10);
        });

        it('should list the lectures', async () => {
            const actual = await getDataItems(DataType.Lectures);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(10);
        });

        it('should list the khutab', async () => {
            const actual = await getDataItems(DataType.PublicSpeeches);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(10);
        });

        it('should list 2 pages of ilmi benefits', async () => {
            const actual = await getDataItems(DataType.ScienceBenefits);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(10);

            const next = await getNextItems(actual.next as string);
            expect(next.items).toHaveLength(10);
        });

        it('should list the research', async () => {
            const actual = await getDataItems(DataType.ScientificResearches);
            expect(actual.items.length > 3).toBe(true);
        });

        it('should list the videos', async () => {
            const actual = await getDataItems(DataType.SelectedVideos);
            expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
            expect(actual.items).toHaveLength(10);
        });
    });

    describe('getPage', () => {
        it.only('should get an article', async () => {
            const actual = await getPage(18136, DataType.Articles);
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
