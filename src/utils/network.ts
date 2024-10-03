import wretch, { Wretch } from 'wretch';

import { ApiResponse } from '../types/api';

const baseApi: Wretch = wretch('https://sh-albarrak.com');

let nextApi: undefined | Wretch;

export const doGetJson = async (path: string): Promise<ApiResponse> => {
    return (await baseApi.url(path).get().json()) as ApiResponse;
};

export const doGetNextJson = async (path: string): Promise<ApiResponse> => {
    if (!nextApi) {
        throw new Error(`initNextApi must be called before using doGetNextJson`);
    }

    return (await nextApi.url(path).get().json()) as ApiResponse;
};

export const doGetText = async (path: string): Promise<string> => {
    return baseApi.url(path).get().text();
};

export const initNextApi = (buildId: string): void => {
    nextApi = wretch(`https://sh-albarrak.com/_next/data/${buildId}`);
};
