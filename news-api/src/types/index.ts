export interface IOptions {
    apiKey?: string;
    sources?: string;
}

export interface ISourceName {
  sources?: string;
}

// export interface IRespOptions {
//   endpoint: 'everything' | 'top-headlines' | 'sources';
//   options?: SourceName;
// }

// export interface IEndpoint {
//   // endpoint: 'everything' | 'top-headlines' | 'sources';
//   endpoint: string;
// }

export type Callback<T> = (data: T) => void;

export interface ISources {
  status: string;
  sources: [
    {
      id: string | null;
      name: string;
      url: string;
      category: string;
      language: string;
      country: string;
    }
  ];
}

export interface INewsSource {
  id: string | null;
  name: string;
}

export interface INews {
  source: INewsSource;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;

}

