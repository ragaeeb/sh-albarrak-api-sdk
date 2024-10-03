import { BookExplanationApiResponse, RawLesson, RawTopic } from './types/api';
import { BookExplanation, BookExplanations, Category, Lesson } from './types/types';
import { doGetJson, doGetNextJson, doGetText, initNextApi } from './utils/network';

const mapTopicToCategory = (t: RawTopic): Category => ({ id: parseInt(t.id), link: t.link, title: t.title });

const mapApiLesson = ({ date, dateGmt, id, link, title, topic }: RawLesson): Lesson => ({
    categories: topic.map(mapTopicToCategory),
    date,
    dateGmt: new Date(dateGmt),
    id: parseInt(id),
    link,
    title,
});

export const getBookExplanation = async (id: number): Promise<BookExplanation> => {
    const {
        pageProps: {
            index: { id: idStr, lessons, link, title },
        },
    } = (await doGetNextJson(`books-explanations/${id}.json`)) as BookExplanationApiResponse;
    return { id: parseInt(idStr), lessonCount: lessons.length, lessons: lessons.map(mapApiLesson), link, title };
};

export const getBookExplanations = async (
    nextToken: string = `/api/posts/BookExplanationSeries`,
): Promise<BookExplanations> => {
    return (await doGetJson(nextToken)) as BookExplanations;
};

export const init = async (): Promise<string> => {
    const html = await doGetText('/');
    const match = html.match(/\/_next\/static\/([a-zA-Z0-9]+)\/_buildManifest\.js/);

    if (!match) {
        throw new Error(`Build id not found in ${html}`);
    }

    const buildId = match[1];
    initNextApi(buildId);

    return buildId;
};
