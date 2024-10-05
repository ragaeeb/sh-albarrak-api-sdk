import { describe, expect, it } from 'vitest';

import { Collection, DataType, getAllIdsFor, getDataItems, getNextItems, getPage } from '../src';

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
        it('should get an article', async () => {
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

        it('should get an audio book', async () => {
            const actual = await getPage(24207, DataType.AudioBooks);
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
            const actual = await getPage(24208, DataType.AudioBooksLessons);
            expect(actual).toEqual({
                audios: [expect.any(String)],
                dateArabic: '٧/ذو القعدة/١٤٤٣ الموافق ٦/يونيو/٢٠٢٢',
                id: 24208,
                link: '/audio-books/24208',
                title: 'شرح رسالة القواعد الأربع للشيخ عبد الرحمن البراك',
            });
        });

        it('should get a book', async () => {
            const actual = await getPage(28785, DataType.Books);
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
            const actual = (await getPage(29062, DataType.BookExplanations)) as Collection;

            expect(actual).toEqual({
                id: 29062,
                link: '/books-explanations/indexes/29062',
                nextUrl: expect.any(String),
                pages: expect.any(Array),
                title: 'دورة الفتوى الحموية',
            });

            expect(actual.pages).toHaveLength(10);

            const result = await getNextItems(actual.nextUrl as string);
            expect(result.items).toHaveLength(7);
            expect(result.next).toBeUndefined();
        });

        it('should get a daily lesson', async () => {
            const actual = await getPage(28692, DataType.DailyLessons);

            expect(actual).toEqual({
                audios: [expect.any(String)],
                dateArabic: '٢٨/ذو الحجة/١٤٤٤ الموافق ١٦/يوليو/٢٠٢٣',
                id: 28692,
                link: '/daily-lessons/28692',
                title: 'درس فجر الثلاثاء 1433-12-28',
            });
        });

        it('should get a fatwa', async () => {
            const actual = await getPage(30545, DataType.Fatwas);

            expect(actual).toEqual({
                audios: [expect.any(String)],
                dateArabic: '٢٣/محرم/١٣٩٠ الموافق ٣٠/مارس/١٩٧٠',
                id: 30545,
                link: '/fatwas/30545',
                title: 'حكم دهن الجسم بزيت الزيتون المقروء عليه',
            });
        });

        it('should get a fiqh selection', async () => {
            const actual = await getPage(8624, DataType.FiqhiSelections);

            expect(actual).toEqual({
                content: expect.any(String),
                dateArabic: '٤/صفر/١٤٣٩ الموافق ٢٤/أكتوبر/٢٠١٧',
                id: 8624,
                link: '/fiqhi-selections/8624',
                title: 'تأخير طواف الحج وسعيه عند الوداع',
            });
        });

        it('should get a lecture', async () => {
            const actual = await getPage(755, DataType.Lectures);

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
            const actual = await getPage(13614, DataType.PublicSpeeches);

            expect(actual).toEqual({
                audios: [expect.any(String)],
                dateArabic: '٢١/رجب/١٤٤٠ الموافق ٢٨/مارس/٢٠١٩',
                id: 13614,
                link: '/public-speeches/13614',
                title: 'وصية الشيخ عبد الرحمن البراك للقضاة',
            });
        });

        it('should get a recitation', async () => {
            const actual = await getPage(21122, DataType.Recitations);

            expect(actual).toEqual({
                audios: [expect.any(String)],
                dateArabic: '٢٤/شوال/١٤٤٢ الموافق ٥/يونيو/٢٠٢١',
                id: 21122,
                link: '/recitations/21122',
                title: 'سورة الناس',
            });
        });

        it('should get a ilmi benefit', async () => {
            const actual = await getPage(30577, DataType.ScienceBenefits);

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
            const actual = await getPage(6748, DataType.ScientificResearches);

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
            const actual = await getPage(27841, DataType.SelectedVideos);

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
