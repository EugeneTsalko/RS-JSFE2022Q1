import AppLoader from './appLoader';
import { Callback } from '../../types/index';

class AppController extends AppLoader {
    getSources(callback: Callback<string>) {
        // console.log(callback);
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: Callback<string>) {
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
                            endpoint: 'everything',
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
