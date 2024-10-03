import { promises as fs } from 'fs';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { getLessons } from '../src/index';
import { doGet } from './utils/network';

vi.mock('./utils/network');

describe('index', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getLessons', () => {
        it('should get the lessons', async () => {
            const lessons = JSON.parse(await fs.readFile('testing/lesson.json', 'utf-8'));
            (doGet as Mock).mockResolvedValue(lessons);

            const data = await getLessons({ limit: 2, page: 1 });
            expect(data).toEqual({
                lessons: [
                    {
                        body: expect.any(String),
                        id: expect.any(Number),
                        title: expect.any(String),
                        updatedAt: expect.any(Number),
                    },
                    {
                        body: expect.any(String),
                        id: expect.any(Number),
                        title: expect.any(String),
                        updatedAt: expect.any(Number),
                    },
                ],
                pagination: {
                    currentPage: 2200,
                    limit: 2,
                    nextPageUrl: expect.any(String),
                    previousPageUrl: 'https://api.shrajhi.com.sa/api/v2/posts/lesson?page=2199',
                    total: expect.any(Number),
                },
            });
        });
    });
});
