import { promises as fs } from 'fs';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { DataType, getAllIdsFor, getDataItems, getPage } from '../src/index';
import { Collection, Page } from './types/types';
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
        const loadMockData = async (path: string, dataType: DataType): Promise<Collection | Page> => {
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

        it('should get an audio book', async () => {
            const actual = await loadMockData('audio-books/24207.json', DataType.AudioBooks);
            expect(actual).toEqual({
                id: 24207,
                link: '/audio-books/indexes/24207',
                pages: [
                    {
                        dateArabic: '٧/ذو القعدة/١٤٤٣ الموافق ٦/يونيو/٢٠٢٢',
                        id: 24208,
                        link: '/audio-books/lessons/24208',
                        title: 'شرح رسالة القواعد الأربع للشيخ عبد الرحمن البراك',
                    },
                    {
                        dateArabic: '٢١/شوال/١٤٤٣ الموافق ٢٢/مايو/٢٠٢٢',
                        id: 24209,
                        link: '/audio-books/lessons/24209',
                        title: 'شرح رسالة الأصول الثلاثة للشيخ عبد الرحمن البراك',
                    },
                    {
                        dateArabic: '٧/ذو القعدة/١٤٤٣ الموافق ٦/يونيو/٢٠٢٢',
                        id: 24210,
                        link: '/audio-books/lessons/24210',
                        title: 'شرح رسالة نواقض االإسلام للشيخ عبد الرحمن البراك',
                    },
                    {
                        dateArabic: '٨/ذو القعدة/١٤٤٣ الموافق ٧/يونيو/٢٠٢٢',
                        id: 24211,
                        link: '/audio-books/lessons/24211',
                        title: 'شرح رسالة كشف الشبهات للشيخ عبد الرحمن البراك',
                    },
                ],
                title: 'شرح القواعد الأربع والأصول الثلاثة ونواقض الإسلام وكشف الشبهات للشيخ عبدالرحمن البراك',
            });
        });

        it('should get an audio book lesson', async () => {
            const actual = await loadMockData('audio-books/lessons/24208.json', DataType.AudioBooksLessons);
            expect(actual).toEqual({
                audios: [expect.any(String)],
                dateArabic: '٧/ذو القعدة/١٤٤٣ الموافق ٦/يونيو/٢٠٢٢',
                id: 24208,
                link: '/audio-books/24208',
                title: 'شرح رسالة القواعد الأربع للشيخ عبد الرحمن البراك',
            });
        });

        it('should get a book', async () => {
            const actual = await loadMockData('books/28785.json', DataType.Books);
            expect(actual).toEqual({
                content: '<p>المنهج الموحَّد لتحقيق الكتب وإخراجها</p>\n',
                dateArabic: '٦/ذو القعدة/١٤٤٥ الموافق ١٤/مايو/٢٠٢٤',
                excerpt: '<p>المنهج الموحَّد لتحقيق الكتب وإخراجها</p>\n',
                id: 28785,
                link: '/books/28785',
                pdfs: [expect.any(String)],
                title: 'المنهج الموحد لتحقيق الكتب وإخراجها',
            });
        });

        it('should get a book explanation', async () => {
            const actual = (await loadMockData(
                'books-explanations/29062.json',
                DataType.BookExplanations,
            )) as Collection;

            expect(actual).toEqual({
                id: 29062,
                link: '/books-explanations/indexes/29062',
                nextUrl: expect.any(String),
                pages: expect.any(Array),
                title: 'دورة الفتوى الحموية',
            });

            expect(actual.pages).toHaveLength(10);
        });

        it('should get a daily lesson', async () => {
            const actual = await loadMockData('daily-lessons/28692.json', DataType.DailyLessons);

            expect(actual).toEqual({
                audios: [expect.any(String)],
                dateArabic: '٢٨/ذو الحجة/١٤٤٤ الموافق ١٦/يوليو/٢٠٢٣',
                id: 28692,
                link: '/daily-lessons/28692',
                title: 'درس فجر الثلاثاء 1433-12-28',
            });
        });

        it('should get a fatwa', async () => {
            const actual = await loadMockData('fatwas/30545.json', DataType.Fatwas);

            expect(actual).toEqual({
                audios: [expect.any(String)],
                dateArabic: '٢٣/محرم/١٣٩٠ الموافق ٣٠/مارس/١٩٧٠',
                id: 30545,
                link: '/fatwas/30545',
                title: 'حكم دهن الجسم بزيت الزيتون المقروء عليه',
            });
        });

        it('should get a fiqh selection', async () => {
            const actual = await loadMockData('fiqhi-selections/8624.json', DataType.FiqhiSelections);

            expect(actual).toEqual({
                content: expect.any(String),
                dateArabic: '٤/صفر/١٤٣٩ الموافق ٢٤/أكتوبر/٢٠١٧',
                id: 8624,
                link: '/fiqhi-selections/8624',
                title: 'تأخير طواف الحج وسعيه عند الوداع',
            });
        });

        it('should get a lecture', async () => {
            const actual = await loadMockData('lectures/755.json', DataType.Lectures);

            expect(actual).toEqual({
                audios: [expect.any(String)],
                dateArabic: '٩/ذو القعدة/١٤٣٨ الموافق ١/أغسطس/٢٠١٧',
                excerpt: '<p>محاضر للشيخ عبدالرحمن بن ناصر البراك على الفتن</p>\n',
                id: 755,
                link: '/lectures/755',
                title: 'موقفنا من الفتن',
            });
        });

        it('should get a khutbah', async () => {
            const actual = await loadMockData('public-speeches/13614.json', DataType.PublicSpeeches);

            expect(actual).toEqual({
                audios: [expect.any(String)],
                dateArabic: '٢١/رجب/١٤٤٠ الموافق ٢٨/مارس/٢٠١٩',
                id: 13614,
                link: '/public-speeches/13614',
                title: 'وصية الشيخ عبد الرحمن البراك للقضاة',
            });
        });

        it('should get a recitation', async () => {
            const actual = await loadMockData('recitations/21122.json', DataType.Recitations);

            expect(actual).toEqual({
                audios: [expect.any(String)],
                dateArabic: '٢٤/شوال/١٤٤٢ الموافق ٥/يونيو/٢٠٢١',
                id: 21122,
                link: '/recitations/21122',
                title: 'سورة الناس',
            });
        });

        it('should get a ilmi benefit', async () => {
            const actual = await loadMockData('science-benefits/30577.json', DataType.ScienceBenefits);

            expect(actual).toEqual({
                content: expect.any(String),
                dateArabic: '٢٥/ربيع الأول/١٤٤٦ الموافق ٢٨/سبتمبر/٢٠٢٤',
                excerpt: expect.any(String),
                id: 30577,
                link: '/science-benefits/30577',
                title: 'جمع المعطلة بين التعطيل والتشبيه',
            });
        });

        it('should get a scientific research', async () => {
            const actual = await loadMockData('scientific-researches/6748.json', DataType.ScientificResearches);

            expect(actual).toEqual({
                content: expect.any(String),
                dateArabic: '٢/رمضان/١٤٣٩ الموافق ١٧/مايو/٢٠١٨',
                docs: [expect.any(String)],
                excerpt: expect.any(String),
                id: 6748,
                link: '/scientific-researches/6748',
                pdfs: [expect.any(String)],
                title: 'الصيام أحكامه ونوازله',
            });
        });

        it('should get a video', async () => {
            const actual = await loadMockData('selected-videos/27841.json', DataType.SelectedVideos);

            expect(actual).toEqual({
                audios: [expect.any(String)],
                dateArabic: '٦/رجب/١٤٤٤ الموافق ٢٨/يناير/٢٠٢٣',
                id: 27841,
                link: '/selected-videos/27841',
                title: '(1126) لمثل هذا فليعمل العاملون مقطع مؤثر للشيخ عبدالرحمن البراك',
                youtubeId: 'Q3d4Rfb-brg',
            });
        });
    });
});
