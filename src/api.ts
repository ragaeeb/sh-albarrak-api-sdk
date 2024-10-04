import { PageApiResponse, PaginatedApiResponse } from './types/apiResponses';
import { Page, PaginatedContentItems } from './types/types';
import { removeFalsyValues } from './utils/common';
import { mapContentEntityToPage, mapContentItem, mapSiteMapToIds } from './utils/mapping';
import { doGetJson, doGetNextJson, doGetText } from './utils/network';

export const getIdsFromSiteMap = async (endpoint: string): Promise<number[]> => {
    const xmlData = await doGetText(`/sitemaps/${endpoint}`);
    return mapSiteMapToIds(xmlData);
};

export const getItems = async (endpoint: string): Promise<PaginatedContentItems> => {
    const { items, next } = (await doGetJson(endpoint)) as PaginatedApiResponse;
    return removeFalsyValues({
        items: items.map(mapContentItem),
        next,
    }) as PaginatedContentItems;
};

export const getPageContent = async (route: string, id: number): Promise<Page> => {
    const result = (await doGetNextJson(`/${route}/${id}.json`)) as PageApiResponse;
    return removeFalsyValues(mapContentEntityToPage(result.pageProps.postContent)) as Page;
};
