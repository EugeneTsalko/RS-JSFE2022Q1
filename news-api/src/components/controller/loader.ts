import { IOptions, Callback } from '../../types/index';

class Loader {
    baseLink: string;
    options: IOptions;
    constructor(baseLink: string, options: IOptions) {
        this.baseLink = baseLink;
        this.options = options;
        // console.log(this.baseLink);
        // console.log(this.options);
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: IOptions },
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
        // console.log(endpoint);
        // console.log(options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: IOptions, endpoint: string) {
        // console.log(typeof options);
        const urlOptions = { ...this.options, ...options };
        // console.log(urlOptions);
        // console.log(typeof urlOptions);
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`; // разобраться с этим моментом
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: Callback<string>, options: IOptions = {}) {
        // console.log(typeof method);
        // console.log(callback);
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
