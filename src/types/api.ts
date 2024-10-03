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
