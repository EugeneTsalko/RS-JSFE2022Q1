export interface INewsClass {
    draw(data: INews[]): void;
}

export interface INewsSource {
    id: string;
    name: string;
}
export interface INews {
    author: string;
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
    sources?: string | null;
}

export enum APIEndpoints {
    sources = 'sources',
    everything = 'everything',
}

export interface ISourceName {
    sources: string;
}

export interface IRespOptions {
    endpoint: string;
    options?: ISourceName;
}

export type Callback<T> = { (data: T): void };
