export type Topic = {
    id: string;
    link: string;
    slug: string;
    title: string;
};

export type ContentType = {
    link: string;
    title: string;
};

export type ContentItem = {
    date?: string;
    dateGmt?: string;
    excerpt?: string;
    id: string;
    lessonCount?: number;
    link?: string;
    postSlug?: string;
    releaseDate?: string;
    tags?: string[];
    tagsLength?: number;
    title: string;
    topic?: Topic[];
    topics?: Topic[];
    topicsLength?: number;
    type?: ContentType;
};

export type PaginatedApiResponse = {
    items: ContentItem[];
    next?: null | string;
};

export type Resource = {
    link: string;
};

export type RelatedPost = {
    excerpt?: string;
    id: string;
    link: string;
    postSlug?: string;
    title: string;
    type?: { link: string; title: string };
};

export type SeriesInfo = {
    seriesStartDate?: string;
    seriesStatus?: string;
    topic?: Topic;
};

export type ContentEntity = {
    audios?: Resource[];
    content?: string; // Full text content for articles, etc., optional
    date?: string; // Release or publication date in text format
    dateISO?: string; // Date in ISO format, optional
    excerpt?: string; // Short description or excerpt of the content, optional
    fullDate?: string; // Full date (with both Hijri and Gregorian), optional
    id: string; // Unique identifier for all content
    images?: Resource[];
    link?: string; // URL to the content, optional
    pdfs?: Resource[];
    postSlug?: string; // Slug for content (some types use postSlug), optional
    relatedPosts?: RelatedPost[];
    seriesInfo?: SeriesInfo;
    tags?: string[];
    tagsLength?: number;
    title: string;
    topics?: Topic[];
    topicsLength?: number;
    type?: ContentType;
    words?: Resource[];
    youtubeId?: string; // YouTube video ID, optional for video content
};

type Breadcrumb = {
    href: string;
    label: string;
};

export type ContentPreview = {
    date: string;
    dateGmt: string;
    id: string;
    link: string;
    title: string;
    topic: Topic[];
};

export type Index = {
    children: any[];
    id: string;
    lessons: ContentPreview[];
    link: string;
    parents: any[];
    title: string;
};

type PageInfo = {
    nextHref?: string;
    prevHref?: string;
};

type Order = {
    ascUrl: string;
    descUrl: string;
    orderSlug: string;
};

export type CollectionPageProps = {
    breadcrumb?: Breadcrumb[];
    fullDate?: string; // Full date with Hijri/Gregorian format
    index: Index;
    infinityScrollApi: null | string;
    lastLessons?: ContentEntity[]; // Last lessons or content in a series
    order?: Order;
    pageInfo?: PageInfo;
    selectedPage: number;
    series: SeriesInfo;
    title: string;
};

export type PageProps = {
    breadcrumb?: Breadcrumb[];
    fullDate?: string; // Full date with Hijri/Gregorian format
    pageInfo?: PageInfo;
    postContent: ContentEntity; // The main content entity (article, audio book, etc.)
    relatedPosts?: ContentEntity[]; // Related content (can also be ContentEntity references)
    selectedPage: number;
};

export interface ApiResponse {
    pageProps: CollectionPageProps | PageProps;
}
