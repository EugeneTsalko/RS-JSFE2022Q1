export interface INewsClass {
    draw(data: INews[]): void;
}

export interface INewsSource {
    id: string | null;
    name: string;
}
export interface INews {
    author: string | null;
    content: string;
    description: string;
    publishedAt: string;
    source: INewsSource;
    title: string;
    url: string;
    urlToImage: string;
}

export interface ISourcesClass {
    draw(data: ISources[]): void;
}

// export interface ISources {
//     id: string;
//     name: string;
//     url: string;
//     category: string;
//     language: string;
//     country: string;
// }

export interface ISources {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

export interface IAppViewClass {
    news: INewsClass;
    sources: ISourcesClass;
    drawNews(data: INewsCompilation): void;
    drawSources(data: ISourcesCompilation): void;
}

export interface INewsCompilation {
    status: string;
    totalResults?: number;
    articles?: [INews];
    // sources?: [ISources];
}

export interface ISourcesCompilation {
    status: string;
    sources: [ISources];
}

// export interface ILoaderClass {
//     baseLink: string;
//     options: Record<string, never> | IOptions;
//     getResp(
//         { endpoint, options = {} }: { endpoint: APIEndpoints; options?: Record<string, never> | IOptions },
//         callback: () => void
//     );
//     errorHandler(res: Response): Response;
//     makeUrl(options: Record<string, never> | IOptions, endpoint: APIEndpoints): string;
//     load(
//         method: string,
//         endpoint: APIEndpoints,
//         callback: Callback<INewsCompilation | ISourcesCompilation>,
//         options: Record<string, never> | IOptions
//     ): void;
// }

export interface IOptions {
    apiKey?: string;
    sources?: string | null;
}

export enum APIEndpoints {
    sources = 'sources',
    everything = 'everything',
}

// export interface IAppLoaderClass {
//   constructor(): void;
// }

export interface ISourceName {
    sources: string;
}

export interface IRespOptions {
    // endpoint: APIEndpoints;
    endpoint: string;
    options?: ISourceName;
}

// export interface IEndpoint {
//   // endpoint: 'everything' | 'top-headlines' | 'sources';
//   endpoint: string;
// }

export type Callback<T> = (data?: T) => void;

// export interface INewsSources {
//     status: string;
//     sources: [ISources];
// }

// export enum APIEndpoints {
//     sources = 'sources',
//     everything = 'everything',
// }
