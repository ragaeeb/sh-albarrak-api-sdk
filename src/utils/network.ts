import wretch, { Wretch } from 'wretch';

const baseApi: Wretch = wretch('https://sh-albarrak.com');

let nextApi: undefined | Wretch;

type JsonResponse = Record<string, any>;

export const doGetJson = async (path: string): Promise<JsonResponse> => {
    return baseApi.url(path).get().json();
};

export const doGetNextJson = async (path: string): Promise<JsonResponse> => {
    if (!nextApi) {
        nextApi = await initNextApi();
    }

    return await nextApi.url(path).get().json();
};

export const doGetText = async (path: string): Promise<string> => {
    return baseApi.url(path).get().text();
};

const initNextApi = async (): Promise<Wretch> => {
    const html = await doGetText('/');
    const match = html.match(/\/_next\/static\/([a-zA-Z0-9]+)\/_buildManifest\.js/);

    if (!match) {
        throw new Error(`Build id not found in ${html}`);
    }

    return wretch(`https://sh-albarrak.com/_next/data/${match[1]}`);
};
