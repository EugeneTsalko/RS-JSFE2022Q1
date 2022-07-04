import News from './news/news';
import Sources from './sources/sources';
import { INewsCompilation, ISourcesCompilation, IAppViewClass } from '../../types/index';

export class AppView implements IAppViewClass {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: INewsCompilation): void {
        // console.log(data);
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ISourcesCompilation): void {
        // console.log(data);
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
