import { beforeAll, describe, expect, it } from 'vitest';

import { getBookExplanation, init } from '../src/index';

describe('e2e', () => {
    beforeAll(async () => {
        const id = await init();
        expect(id.length > 6).toBe(true);
    }, 5000);

    describe('getBookExplanation', () => {
        it(
            'should get the book explanation',
            async () => {
                const actual = await getBookExplanation(26232);
                expect(actual).toEqual({});
            },
            { timeout: 5000 },
        );
    });
});
