import { IOptions, Callback, INewsCompilation, ISourcesCompilation, APIEndpoints } from '../../types/index';

class Loader {
    baseLink: string;
    options: Record<string, never> | IOptions;
    constructor(baseLink: string, options: Record<string, never> | IOptions) {
        this.baseLink = baseLink;
        this.options = options;
        // console.log(this.baseLink);
        // console.log(this.options);
    }

    getResp(
        { endpoint, options = {} }: { endpoint: APIEndpoints; options?: Record<string, never> | IOptions },
        callback: Callback<INewsCompilation | ISourcesCompilation> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
        // console.log(endpoint);
        // console.log(options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Record<string, never> | IOptions, endpoint: APIEndpoints): string {
        // console.log(options);
        const urlOptions = { ...this.options, ...options };
        // console.log(urlOptions);
        // console.log(typeof urlOptions);
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`; // разобраться с этим моментом
        });

        return url.slice(0, -1);
    }

    load(
        method: string,
        endpoint: APIEndpoints,
        callback: Callback<INewsCompilation | ISourcesCompilation>,
        options: Record<string, never> | IOptions
    ): void {
        // console.log(typeof method);
        // console.log(callback);
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            // .then((data: INewsCompilation) => callback(data))
            .then((data: INewsCompilation | ISourcesCompilation) => {
                // console.log(data);
                callback(data);
            })
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
