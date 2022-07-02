import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'ef100e99e34f4ba29c3d9b5fdc0fc5ef', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
