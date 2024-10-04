import { describe, expect, it } from 'vitest';

import { getBookExplanation, getBookExplanations, getFatawa, getFatwa, getLesson } from '../src/index';

describe('e2e', () => {
    describe('getBookExplanation', () => {
        it(
            'should get the book explanation',
            async () => {
                const actual = await getBookExplanation(26232);
                expect(actual).toEqual({
                    id: 26232,
                    lessonCount: 2,
                    lessons: [
                        {
                            categories: [
                                {
                                    id: 12,
                                    link: '/books-explanations/lessons/category/12',
                                    title: 'توحيد الأسماء والصفات',
                                },
                            ],
                            date: expect.any(Date),
                            dateText: '٦/جمادى الآخرة/١٤٤٤ الموافق ٣٠/ديسمبر/٢٠٢٢',
                            id: 26233,
                            link: '/books-explanations/lessons/26233',
                            title: '(1) فائدة جليلة ما يجري صفة أو خبرا على الرب',
                        },
                        {
                            categories: [
                                {
                                    id: 12,
                                    link: '/books-explanations/lessons/category/12',
                                    title: 'توحيد الأسماء والصفات',
                                },
                            ],
                            date: expect.any(Date),
                            dateText: '٥/رجب/١٤٤٤ الموافق ٢٧/يناير/٢٠٢٣',
                            id: 26613,
                            link: '/books-explanations/lessons/26613',
                            title: '(2) فائدة جليلة ما يجري صفة أو خبرا على الرب “أن الاسم إذا أطلق عليه جاز أن يشتق منه المصدر والفعل فيخبر به عنه فعلا ومصدرا”',
                        },
                    ],
                    link: '/books-explanations/indexes/26232',
                    title: 'فائدة جليلة” من كتاب بدائع الفوائد ج ١',
                });
            },
            { timeout: 5000 },
        );
    });

    describe('getBookExplanations', () => {
        it(
            'should get the book explanations',
            async () => {
                const actual = await getBookExplanations();
                expect(actual).toEqual({ items: expect.any(Array), next: expect.any(String) });
                expect(actual.items).toHaveLength(9);
            },
            { timeout: 5000 },
        );
    });

    describe('getLesson', () => {
        it(
            'should get the lesson',
            async () => {
                const actual = await getLesson(2000);
                expect(actual).toEqual({
                    audios: [expect.any(String)],
                    categories: [],
                    content: expect.any(String),
                    date: expect.any(Date),
                    dateText: '٢١/جمادى الآخرة/١٤٣٨ الموافق ٢٠/مارس/٢٠١٧',
                    docs: [expect.any(String)],
                    id: 2000,
                    link: '/books-explanations/2000',
                    pdfs: [expect.any(String)],
                    title: '(64) القاعدة السّبعون: قوله “القرآن كفيل بمقاومة جميع المفسدين”',
                });
            },
            { timeout: 5000 },
        );
    });

    describe('getFatawa', () => {
        it(
            'should get the fatawa',
            async () => {
                const actual = await getFatawa();
                expect(actual).toEqual({
                    items: expect.any(Array),
                    next: expect.any(String),
                });
                expect(actual.items).toHaveLength(10);
            },
            { timeout: 5000 },
        );
    });

    describe('getFatwa', () => {
        it(
            'should get the fatwa',
            async () => {
                const actual = await getFatwa(10000);
                expect(actual).toEqual({
                    audios: [expect.any(String)],
                    categories: [{ id: 15, link: '/fatwas?category=15', title: 'الإيمان بالرسل' }],
                    content: expect.any(String),
                    date: expect.any(Date),
                    dateText: '١١/ربيع الأول/١٤٣٩ الموافق ٢٩/نوفمبر/٢٠١٧',
                    id: 10000,
                    link: '/fatwas/10000',
                    question: expect.any(String),
                    title: 'هل كل نبي له آية تدل على صدقه',
                });
            },
            { timeout: 5000 },
        );
    });
});
