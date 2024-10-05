import { getCollectionContent, getIdsFromSiteMap, getItems, getPageContent } from './api';
import { CollectionDataTypes, DataType, PageDataTypes, PaginatedContentItems } from './types/types';
import { DataTypeToEndpoint, DataTypeToSiteMap } from './utils/mapping';

export const getAllIdsFor = async (dataType: DataType) => getIdsFromSiteMap(DataTypeToSiteMap[dataType]);

export const getCollection = async (dataType: CollectionDataTypes, id: number) => getCollectionContent(dataType, id);

export const getDataItems = (dataType: DataType): Promise<PaginatedContentItems> => {
    const endpoint = DataTypeToEndpoint[dataType];

    if (!endpoint) {
        throw new Error(`${dataType} not supported for listing`);
    }

    return getItems(`/api/posts/${endpoint}`);
};

export const getNextItems = (nextUrl: string) => getItems(nextUrl);

export const getPage = async (dataType: PageDataTypes, id: number) => getPageContent(dataType, id);

export * from './types/types';
