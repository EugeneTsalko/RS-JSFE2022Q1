import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: 'ef100e99e34f4ba29c3d9b5fdc0fc5ef',
        });
    }
}

export default AppLoader;
