[![wakatime](https://wakatime.com/badge/user/a0b906ce-b8e7-4463-8bce-383238df6d4b/project/35a92859-5134-4d7c-b8b9-28cc71c2b054.svg)](https://wakatime.com/badge/user/a0b906ce-b8e7-4463-8bce-383238df6d4b/project/35a92859-5134-4d7c-b8b9-28cc71c2b054) [![E2E](https://github.com/ragaeeb/sh-albarrak-api-sdk/actions/workflows/e2e.yml/badge.svg)](https://github.com/ragaeeb/sh-albarrak-api-sdk/actions/workflows/e2e.yml) [![Node.js CI](https://github.com/ragaeeb/sh-albarrak-api-sdk/actions/workflows/build.yml/badge.svg)](https://github.com/ragaeeb/sh-albarrak-api-sdk/actions/workflows/build.yml) ![GitHub License](https://img.shields.io/github/license/ragaeeb/sh-albarrak-api-sdk) ![GitHub Release](https://img.shields.io/github/v/release/ragaeeb/sh-albarrak-api-sdk) [![codecov](https://codecov.io/gh/ragaeeb/sh-albarrak-api-sdk/graph/badge.svg?token=EU816AGCGQ)](https://codecov.io/gh/ragaeeb/sh-albarrak-api-sdk) [![Size](https://deno.bundlejs.com/badge?q=sh-albarrak-api-sdk@2.0.0)](https://bundlejs.com/?q=sh-albarrak-api-sdk%402.0.0) ![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label&color=blue) ![npm](https://img.shields.io/npm/v/sh-albarrak-api-sdk) ![npm](https://img.shields.io/npm/dm/sh-albarrak-api-sdk) ![GitHub issues](https://img.shields.io/github/issues/ragaeeb/sh-albarrak-api-sdk) ![GitHub stars](https://img.shields.io/github/stars/ragaeeb/sh-albarrak-api-sdk?style=social)

# sh-albarrak-api-sdk

SDK to access `sh-albarrak.com` APIs.

## Installation

To install sh-albarrak-api-sdk, use npm or yarn:

```bash
npm install sh-albarrak-api-sdk
# or
yarn add sh-albarrak-api-sdk
# or
pnpm i sh-albarrak-api-sdk
```

## Usage

### Importing the SDK

```javascript
import { getAllIdsFor, DataType } from 'sh-albarrak-api-sdk';
```

### getAllIdsFor()

Gets all the unique identifiers for the given data type.

```javascript
(async () => {
    try {
        const actual = await getAllIdsFor(DataType.BookExplanations); // [100, 200, 3011]
    } catch (error) {
        console.error(error.message);
    }
})();
```

### getDataItems()

Retrieve a list of items for a data type. Note that `AudioBooksLessons`, `BooksExplanationsLessons`, and `Recitations` are not supported.

```javascript
(async () => {
    try {
        const data = await getDataItems(DataType.Articles); // { items: [...], next: '/api/...' }
        const nextData = await getNextItems(data.next);
    } catch (error) {
        console.error(error.message);
    }
})();
```

If the return value includes a `next` path, you can use that to call `getNextItems` with that url to get the next set of paginated items.

### getPage()

Retrieve a a specific item.

```javascript
import { getPage } from 'sh-albarrak-api-sdk';

(async () => {
    try {
        const article = await getPage(100, DataType.Articles);
    } catch (error) {
        console.error(error.message);
    }
})();
```

### getCollection()

Retrieve a a specific collection.

```javascript
import { getCollection } from 'sh-albarrak-api-sdk';

(async () => {
    try {
        const audioBook = await getCollection(100, DataType.AudioBooks);
        const nextData = await getNextItems(audioBook.nextUrl);
    } catch (error) {
        console.error(error.message);
    }
})();
```
