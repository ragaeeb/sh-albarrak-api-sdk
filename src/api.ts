import { ApiResponse, CollectionPageProps, PageProps, PaginatedApiResponse } from './types/apiResponses';
import { Collection, Page, PaginatedContentItems } from './types/types';
import { removeFalsyValues } from './utils/common';
import {
    mapCollectionPagePropsToCollection,
    mapContentEntityToPage,
    mapContentItem,
    mapSiteMapToIds,
} from './utils/mapping';
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

export const getPageContent = async (route: string, id: number): Promise<Collection | Page> => {
    const result = (await doGetNextJson(`/${route}/${id}.json`)) as ApiResponse;
    const mapped = (result.pageProps as CollectionPageProps).index
        ? mapCollectionPagePropsToCollection(result.pageProps as CollectionPageProps)
        : mapContentEntityToPage((result.pageProps as PageProps).postContent);

    return removeFalsyValues(mapped) as Collection | Page;
};
