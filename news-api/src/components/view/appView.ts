import News from './news/news';
import Sources from './sources/sources';
import { INewsCompilation, ISourcesCompilation, IAppViewClass, INews, ISources } from '../../types/index';

export class AppView implements IAppViewClass {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: INewsCompilation): void {
        const values: INews[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ISourcesCompilation): void {
        const values: ISources[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
