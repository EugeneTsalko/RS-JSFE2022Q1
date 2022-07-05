import AppLoader from './appLoader';
import { APIEndpoints, Callback, INewsCompilation, ISourcesCompilation } from '../../types/interfaces';

class AppController extends AppLoader {
    getSources(callback: Callback<ISourcesCompilation>): void {
        super.getResp(
            {
                endpoint: APIEndpoints.sources,
            },
            callback
        );
    }

    getNews(e: Event, callback: Callback<INewsCompilation>): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
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
