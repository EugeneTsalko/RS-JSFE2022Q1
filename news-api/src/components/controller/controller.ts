import AppLoader from './appLoader';
import { APIEndpoints, Callback, INewsCompilation, ISourcesCompilation } from '../../types/index';

class AppController extends AppLoader {
    getSources(callback: Callback<ISourcesCompilation>): void {
        // console.log(callback);
        super.getResp(
            {
                // endpoint: 'sources',
                endpoint: APIEndpoints.sources,
            },
            callback
        );
    }

    getNews(e: Event, callback: Callback<INewsCompilation>): void {
        // console.log(e);
        // console.log(callback);
        let target = e.target as HTMLElement;
        // console.log(target);
        const newsContainer = e.currentTarget as HTMLElement;
        // console.log(newsContainer);

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            // endpoint: 'everything',
                            endpoint: APIEndpoints.everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
