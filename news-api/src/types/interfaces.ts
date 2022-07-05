export interface INewsClass {
    draw(data: INews[]): void;
}

interface INewsSource {
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

export interface ISources {
    [key: string]: string;
}

export interface IAppViewClass {
    news: INewsClass;
    sources: ISourcesClass;
    drawNews(data: INewsCompilation): void;
    drawSources(data: ISourcesCompilation): void;
}

export interface INewsCompilation {
    articles?: INews[];
    status: string;
    totalResults?: number;
}

export interface ISourcesCompilation {
    sources?: ISources[];
    status: string;
}

export interface IOptions {
    apiKey?: string;
    sources?: string;
}

export enum APIEndpoints {
    sources = 'sources',
    everything = 'everything',
}
export type Callback<T> = { (data: T): void };

export interface IRespParams {
    endpoint: APIEndpoints;
    options?: Record<string, never> | Partial<IOptions>;
}
