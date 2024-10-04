import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Wretch } from 'wretch';

vi.mock('wretch');

describe('network', () => {
    let mockBaseApi: Wretch;
    let mockNextApi: Wretch;
    let doGetJson: (path: string) => Promise<Record<string, any>>;
    let doGetNextJson: (path: string) => Promise<Record<string, any>>;
    let doGetText: (path: string) => Promise<string>;

    beforeEach(async () => {
        vi.resetModules();

        // Mock the baseApi Wretch instance
        mockBaseApi = {
            get: vi.fn().mockReturnThis(),
            json: vi.fn(),
            text: vi.fn(),
            url: vi.fn().mockReturnThis(),
        } as unknown as Wretch;

        // Mock the nextApi Wretch instance
        mockNextApi = {
            get: vi.fn().mockReturnThis(),
            json: vi.fn(),
            url: vi.fn().mockReturnThis(),
        } as unknown as Wretch;

        // Mock wretch to return mockBaseApi initially
        const wretch = (await import('wretch')).default;
        (wretch as unknown as vi.Mock).mockReturnValue(mockBaseApi);

        // Dynamically import the functions after mocking wretch
        const networkModule = await import('./network');
        doGetJson = networkModule.doGetJson;
        doGetNextJson = networkModule.doGetNextJson;
        doGetText = networkModule.doGetText;
    });

    it('should return JSON response for doGetJson', async () => {
        const mockResponse = { key: 'value' };
        mockBaseApi.json.mockResolvedValueOnce(mockResponse);

        const result = await doGetJson('/test-path');

        expect(mockBaseApi.url).toHaveBeenCalledWith('/test-path');
        expect(mockBaseApi.get).toHaveBeenCalled();
        expect(mockBaseApi.json).toHaveBeenCalled();
        expect(result).toEqual(mockResponse);
    });

    it('should return text response for doGetText', async () => {
        const mockText = 'sample text';
        mockBaseApi.text.mockResolvedValueOnce(mockText);

        const result = await doGetText('/test-path');

        expect(mockBaseApi.url).toHaveBeenCalledWith('/test-path');
        expect(mockBaseApi.get).toHaveBeenCalled();
        expect(mockBaseApi.text).toHaveBeenCalled();
        expect(result).toBe(mockText);
    });

    it('should initialize nextApi and return JSON response for doGetNextJson', async () => {
        const mockHtml = `<html><body><script src="/_next/static/abcd1234/_buildManifest.js"></script></body></html>`;
        const mockJsonResponse = { key: 'next-value' };

        mockBaseApi.text.mockResolvedValueOnce(mockHtml); // Mock HTML response from initNextApi
        mockNextApi.json.mockResolvedValueOnce(mockJsonResponse);

        // Mock wretch for the new nextApi initialization after extracting the build id
        const wretch = (await import('wretch')).default;
        (wretch as unknown as vi.Mock).mockReturnValueOnce(mockNextApi);

        const result = await doGetNextJson('/test-next-path');

        // Check if initNextApi was called by ensuring the root url was fetched for build id
        expect(mockBaseApi.url).toHaveBeenCalledWith('/');
        expect(mockBaseApi.get).toHaveBeenCalled();
        expect(mockBaseApi.text).toHaveBeenCalled();

        // Check if the nextApi was initialized with the correct build id and path
        expect(mockNextApi.url).toHaveBeenCalledWith('/test-next-path');
        expect(mockNextApi.get).toHaveBeenCalled();
        expect(mockNextApi.json).toHaveBeenCalled();
        expect(result).toEqual(mockJsonResponse);
    });

    it('should throw an error if build id is not found in initNextApi', async () => {
        const invalidHtml = '<html><body>No build manifest here</body></html>';
        mockBaseApi.text.mockResolvedValueOnce(invalidHtml);

        await expect(doGetNextJson('/test-next-path')).rejects.toThrow('Build id not found');

        // Verify it fetched the base page before throwing the error
        expect(mockBaseApi.url).toHaveBeenCalledWith('/');
        expect(mockBaseApi.get).toHaveBeenCalled();
        expect(mockBaseApi.text).toHaveBeenCalled();
    });

    it('should reuse initialized nextApi for subsequent doGetNextJson calls', async () => {
        const mockHtml = `<html><body><script src="/_next/static/abcd1234/_buildManifest.js"></script></body></html>`;
        const firstJsonResponse = { key: 'first-value' };
        const secondJsonResponse = { key: 'second-value' };

        mockBaseApi.text.mockResolvedValueOnce(mockHtml);
        mockNextApi.json
            .mockResolvedValueOnce(firstJsonResponse) // First call to doGetNextJson
            .mockResolvedValueOnce(secondJsonResponse); // Second call to doGetNextJson

        const wretch = (await import('wretch')).default;
        (wretch as unknown as vi.Mock).mockReturnValueOnce(mockNextApi); // Mock nextApi after build id extraction

        // First call, triggers initialization of nextApi
        const firstResult = await doGetNextJson('/first-path');
        expect(mockBaseApi.url).toHaveBeenCalledWith('/');
        expect(mockNextApi.url).toHaveBeenCalledWith('/first-path');
        expect(firstResult).toEqual(firstJsonResponse);

        // Second call, should reuse the initialized nextApi without reinitializing
        const secondResult = await doGetNextJson('/second-path');
        expect(mockBaseApi.url).toHaveBeenCalledTimes(1); // baseApi should only be called once
        expect(mockNextApi.url).toHaveBeenCalledWith('/second-path');
        expect(secondResult).toEqual(secondJsonResponse);
    });
});
