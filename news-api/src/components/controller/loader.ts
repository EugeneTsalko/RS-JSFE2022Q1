import { IOptions, Callback, INewsCompilation, ISourcesCompilation, APIEndpoints } from '../../types/interfaces';

class Loader {
    baseLink: string;
    options: Record<string, never> | Partial<IOptions>;
    constructor(baseLink: string, options: Record<string, never> | Partial<IOptions>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        { endpoint, options = {} }: { endpoint: APIEndpoints; options?: Record<string, never> | Partial<IOptions> },
        callback: Callback<INewsCompilation | ISourcesCompilation> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Record<string, never> | Partial<IOptions>, endpoint: APIEndpoints): string {
        const urlOptions: { [index: string]: string } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?` as string;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    protected load(
        method: string,
        endpoint: APIEndpoints,
        callback: Callback<INewsCompilation | ISourcesCompilation>,
        options: Record<string, never> | Partial<IOptions>
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: INewsCompilation | ISourcesCompilation) => {
                callback(data);
            })
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
