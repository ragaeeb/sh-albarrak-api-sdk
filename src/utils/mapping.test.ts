import { describe, expect, it } from 'vitest';

import { mapContentEntityToPage, mapContentItem, mapSiteMapToIds } from './mapping';

describe('mapping', () => {
    describe('mapContentItem', () => {
        it('should map fields correctly for ContentItem', () => {
            const result = mapContentItem({
                date: '01/01/2022',
                id: '789',
                link: 'item-link',
                title: 'Item Title',
            });
            expect(result).toEqual({
                dateArabic: '01/01/2022',
                id: 789,
                link: 'item-link',
                title: 'Item Title',
            });
        });

        it('should handle missing fields gracefully', () => {
            const incompleteContentItem = {
                id: '123',
                title: 'Incomplete Item',
            };
            const result = mapContentItem(incompleteContentItem);
            expect(result).toEqual({
                dateArabic: undefined,
                id: 123,
                link: undefined,
                title: 'Incomplete Item',
            });
        });
    });

    describe('mapContentEntityToPage', () => {
        it('should map basic fields correctly', () => {
            const result = mapContentEntityToPage({
                audios: [{ link: 'audio1' }, { link: 'audio2' }],
                content: 'This is the content',
                date: '14/02/2022',
                dateISO: '2022-02-14T00:00:00Z',
                excerpt: 'This is a test excerpt',
                id: '123',
                link: 'test-link',
                pdfs: [{ link: 'pdf1' }],
                title: 'Test Title',
                words: [{ link: 'doc1' }],
                youtubeId: 'youtubeId123',
            });
            expect(result).toEqual({
                audios: ['audio1', 'audio2'],
                content: 'This is the content',
                date: new Date('2022-02-14T00:00:00Z'),
                dateArabic: '14/02/2022',
                docs: ['doc1'],
                excerpt: 'This is a test excerpt',
                id: 123,
                link: 'test-link',
                pdfs: ['pdf1'],
                title: 'Test Title',
                youtubeId: 'youtubeId123',
            });
        });

        it('should handle missing or undefined optional fields', () => {
            const entityWithMissingFields = {
                dateISO: '2022-03-01T00:00:00Z',
                id: '456',
                link: 'another-link',
                title: 'Another Title',
            };
            const result = mapContentEntityToPage(entityWithMissingFields);

            expect(result).toEqual({
                audios: undefined,
                content: undefined,
                date: new Date('2022-03-01T00:00:00Z'),
                dateArabic: undefined,
                docs: undefined,
                excerpt: undefined,
                id: 456,
                link: 'another-link',
                pdfs: undefined,
                title: 'Another Title',
                youtubeId: undefined,
            });
        });
    });

    describe('mapSiteMapToIds', () => {
        it('should handle fatwas', () => {
            const actual = mapSiteMapToIds(
                `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://sh-albarrak.com/fatwas/30618</loc><lastmod>2024-10-01T06:01:44.000Z</lastmod></url><url><loc>https://sh-albarrak.com/fatwas/30617</loc><lastmod>2024-10-01T06:00:56.000Z</lastmod></url></urlset>`,
            );

            expect(actual).toEqual([30617, 30618]);
        });

        it('should handle lessons', () => {
            const actual = mapSiteMapToIds(
                `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://sh-albarrak.com/books-explanations/lessons/29842</loc><lastmod>2024-08-06T09:08:26.000Z</lastmod></url></urlset>`,
            );

            expect(actual).toEqual([29842]);
        });
    });
});
