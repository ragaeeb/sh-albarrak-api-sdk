import { FullFatwaApiResponse, LessonApiResponse, RawFatwa, RawLesson, RawTopic, Resource } from '../types/api';
import { Category, Fatwa, Lesson } from '../types/types';

const mapTopicToCategory = (t: RawTopic): Category => ({ id: parseInt(t.id), link: t.link, title: t.title });

const mapResource = (key: string, resources: Resource[]): Record<string, string[]> | undefined => {
    if (resources?.length > 0) {
        return { [key]: resources.map((a) => a.link) };
    }
};

export const mapApiFatwaResponse = ({
    pageProps: {
        postContent: { audios, content, date, dateISO, id, link, question, title, topics },
    },
}: FullFatwaApiResponse): Fatwa => {
    return {
        ...mapResource('audios', audios),
        categories: topics.map(mapTopicToCategory),
        link,
        ...(content && { content }),
        ...(question && { question }),
        date: new Date(dateISO),
        dateText: date,
        id: parseInt(id),
        title,
    };
};

export const mapApiLessonResponseToLesson = ({
    pageProps: {
        postContent: { audios, content, date, dateISO, id, link, pdfs, title, words },
    },
}: LessonApiResponse): Lesson => {
    return {
        ...mapResource('audios', audios),
        ...mapResource('pdfs', pdfs),
        ...mapResource('docs', words),
        categories: [],
        link,
        ...(content && { content }),
        date: new Date(dateISO),
        dateText: date,
        id: parseInt(id),
        title,
    };
};

export const mapApiRawFatwa = (r: RawFatwa): Fatwa => ({
    dateText: r.date,
    id: parseInt(r.id),
    link: r.link,
    title: r.title,
});

export const mapApiRawLesson = ({ date, dateGmt, id, link, title, topic }: RawLesson): Lesson => ({
    categories: topic.map(mapTopicToCategory),
    date: new Date(dateGmt),
    dateText: date,
    id: parseInt(id),
    link,
    title,
});
