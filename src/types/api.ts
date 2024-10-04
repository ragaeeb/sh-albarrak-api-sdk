type LastLesson = {
    date: string;
    id: string;
    link: string;
    postSlug: string;
    tags: any[];
    tagsLength: number;
    title: string;
    topics: {
        id: string;
        link: string;
        slug: string;
        title: string;
    }[];
    topicsLength: number;
    type: {
        link: string;
        title: string;
    };
};

export type RawTopic = {
    id: string;
    link: string;
    slug?: string;
    title: string;
};

export type RawLesson = {
    date: string;
    dateGmt: string;
    id: string;
    link: string;
    title: string;
    topic: RawTopic[];
};

type Index = {
    children: any[];
    id: string;
    lessons: RawLesson[];
    link: string;
    parents: any[];
    title: string;
};

type Series = {
    seriesStartDate: string;
    seriesStatus: string;
    topic: {
        link: string;
        title: string;
    };
};

export type BookExplanationApiResponse = {
    pageProps: {
        breadcrumb: any[];
        fullDate: string;
        index: Index;
        infinityScrollApi: any | null;
        lastLessons: LastLesson[];
        order: Record<string, unknown>;
        pageInfo: {
            nextHref: null | string;
            prevHref: null | string;
        };
        selectedPage: number;
        series: Series;
        title: string;
    };
};

export interface RawBookExplanation {
    id: number;
    lessonCount: number;
    link: string;
    releaseDate?: string;
    title: string;
}

export type RawBookExplanations = {
    items: RawBookExplanation[];
    next?: string;
};

export type RawFatwa = {
    date: string;
    id: string;
    link: string;
    postSlug: string;
    releaseDate: string;
    tags: any[];
    tagsLength: number;
    title: string;
    topics: {
        id: string;
        link: string;
        slug: string;
        title: string;
    }[];
    topicsLength: number;
    type: {
        link: string;
        title: string;
    };
};

export type RawFatawaResponse = {
    items: RawFatwa[];
    next?: string;
};

export type Resource = {
    link: string;
};

export type LessonApiResponse = {
    pageProps: {
        fullDate: string;
        pageDetail: Record<string, unknown>;
        postContent: {
            audios: Resource[];
            content: string;
            date: string;
            dateISO: string;
            id: string;
            link: string;
            nextPost: null | string;
            pdfs: Resource[];
            prevPost: null | string;
            tags: any[];
            title: string;
            topics: any[];
            words: Resource[];
        };
        relatedPosts: any[];
        selectedPage: number;
        seriesInfo: {
            seriesStartDate: string;
            seriesStatus: string;
            topic: {
                link: string;
                title: string;
            };
        };
    };
};

type RelatedPost = {
    date: string;
    id: string;
    link: string;
    postSlug: string;
    tags: any[];
    tagsLength: number;
    title: string;
    topics: RawTopic[];
    topicsLength: number;
    type: {
        link: string;
        title: string;
    };
};

export type FullFatwaApiResponse = {
    pageProps: {
        fullDate: string;
        postContent: {
            audios: Resource[];
            content: string;
            date: string;
            dateISO: string;
            fatwaCategory: {
                slug: string;
                title: string;
            };
            id: string;
            link: string;
            question: string;
            tags: any[];
            title: string;
            topics: RawTopic[];
        };
        relatedPosts: RelatedPost[];
        selectedPage: number;
    };
};
