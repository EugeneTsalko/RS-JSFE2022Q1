import AppLoader from './appLoader';
import { APIEndpoints } from '../../types/index';
class AppController extends AppLoader {
    getSources(callback) {
        // console.log(callback);
        super.getResp({
            // endpoint: 'sources',
            endpoint: APIEndpoints.sources,
        }, callback);
    }
    getNews(e, callback) {
        // console.log(e);
        // console.log(callback);
        let target = e.target;
        // console.log(target);
        const newsContainer = e.currentTarget;
        // console.log(newsContainer);
        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp({
                        // endpoint: 'everything',
                        endpoint: APIEndpoints.everything,
                        options: {
                            sources: sourceId,
                        },
                    }, callback);
                }
                return;
            }
            target = target.parentNode;
        }
    }
}
export default AppController;
