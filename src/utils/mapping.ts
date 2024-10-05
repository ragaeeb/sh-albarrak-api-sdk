import { XMLParser } from 'fast-xml-parser';

import {
    CollectionPageProps,
    ContentEntity,
    ContentItem,
    ContentPreview,
    Index,
    Resource,
} from '../types/apiResponses';
import { Collection, DataType, Item, Page } from '../types/types';

const mapResource = (key: string, resources: Resource[] = []): Record<string, string[]> | undefined => {
    if (resources?.length > 0) {
        return { [key]: resources.map((a) => a.link) };
    }
};

export const mapCollectionPagePropsToCollection = (response: CollectionPageProps): Collection => {
    const { id, lessons, link, title }: Index = response.index;

    return {
        id: parseInt(id),
        link,
        pages: lessons.map(mapContentPreviewToPage),
        title,
        ...(response.infinityScrollApi && { nextUrl: response.infinityScrollApi }),
    };
};

export const mapContentEntityToPage = ({
    audios,
    content,
    date,
    dateISO,
    excerpt,
    id,
    link,
    pdfs,
    title,
    words,
    youtubeId,
}: ContentEntity): Page => ({
    content,
    dateArabic: date,
    excerpt,
    id: parseInt(id),
    link,
    title,
    youtubeId,
    ...(dateISO && { date: new Date(dateISO) }),
    ...mapResource('audios', audios),
    ...mapResource('pdfs', pdfs),
    ...mapResource('docs', words),
});

export const mapContentItem = ({ date, dateGmt, id, link, title }: ContentItem): Item => ({
    dateArabic: date,
    id: parseInt(id),
    ...(dateGmt && { date: new Date(dateGmt) }),
    link,
    title,
});

const mapContentPreviewToPage = ({ date, dateGmt, id, link, title }: ContentPreview): Page => {
    return { date: new Date(dateGmt), dateArabic: date, id: parseInt(id), link, title };
};

export const mapSiteMapToIds = (sitemapXml: string): number[] => {
    const parser = new XMLParser({
        attributeNamePrefix: '@_', // Preserve attribute structure if needed
        ignoreAttributes: false,
    });

    const parsedXml = parser.parse(sitemapXml);

    // Traverse the parsed XML and extract the 'loc' fields from <url> elements
    const urls = Array.isArray(parsedXml.urlset.url) ? parsedXml.urlset.url : [parsedXml.urlset.url]; // we have to do this since if there's only one item in the set, it will make it an object instead of an array

    const ids = urls
        .map((urlObj: any) => {
            const idMatch = urlObj.loc.match(/\/(\d+)$/);
            return idMatch ? parseInt(idMatch[1], 10) : null;
        })
        .filter(Boolean)
        .sort((a: number, b: number) => a - b);

    return ids;
};

export const DataTypeToEndpoint: Record<DataType, null | string> = {
    [DataType.Articles]: 'Article',
    [DataType.AudioBooks]: 'AudioBookSeries',
    [DataType.AudioBooksLessons]: null,
    [DataType.BookExplanations]: 'BookExplanationSeries',
    [DataType.Books]: 'Book',
    [DataType.BooksExplanationsLessons]: null,
    [DataType.DailyLessons]: 'DailyLesson',
    [DataType.Fatwas]: 'Fatwa',
    [DataType.FiqhiSelections]: 'FiqhiSelection',
    [DataType.Lectures]: 'Lecture',
    [DataType.PublicSpeeches]: 'PublicSpeech',
    [DataType.Recitations]: null,
    [DataType.ScienceBenefits]: 'ScienceBenefit',
    [DataType.ScientificResearches]: 'ScientificResearch',
    [DataType.SelectedVideos]: 'SelectedVideo',
};

export const DataTypeToSiteMap: Record<DataType, string> = {
    [DataType.Articles]: DataType.Articles,
    [DataType.AudioBooks]: DataType.AudioBooks,
    [DataType.AudioBooksLessons]: 'audio-books-lessons',
    [DataType.BookExplanations]: DataType.BookExplanations,
    [DataType.Books]: DataType.Books,
    [DataType.BooksExplanationsLessons]: 'books-explanations-lessons',
    [DataType.DailyLessons]: DataType.DailyLessons,
    [DataType.Fatwas]: DataType.Fatwas,
    [DataType.FiqhiSelections]: DataType.FiqhiSelections,
    [DataType.Lectures]: DataType.Lectures,
    [DataType.PublicSpeeches]: DataType.PublicSpeeches,
    [DataType.Recitations]: DataType.Recitations,
    [DataType.ScienceBenefits]: DataType.ScienceBenefits,
    [DataType.ScientificResearches]: DataType.ScientificResearches,
    [DataType.SelectedVideos]: DataType.SelectedVideos,
};
