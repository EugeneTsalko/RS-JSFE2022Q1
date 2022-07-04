class Loader {
    constructor(baseLink, options) {
        this.baseLink = baseLink;
        this.options = options;
        // console.log(this.baseLink);
        // console.log(this.options);
    }
    getResp({ endpoint, options = {} }, callback = () => {
        console.error('No callback for GET response');
    }) {
        this.load('GET', endpoint, callback, options);
        // console.log(endpoint);
        // console.log(options);
    }
    errorHandler(res) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }
    makeUrl(options, endpoint) {
        // console.log(typeof options);
        const urlOptions = Object.assign(Object.assign({}, this.options), options);
        // console.log(urlOptions);
        // console.log(typeof urlOptions);
        let url = `${this.baseLink}${endpoint}?`;
        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`; // разобраться с этим моментом
        });
        return url.slice(0, -1);
    }
    load(method, endpoint, callback, options = {}) {
        // console.log(typeof method);
        // console.log(callback);
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}
export default Loader;
