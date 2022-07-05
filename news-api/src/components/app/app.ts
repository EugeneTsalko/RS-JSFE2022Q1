import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { INewsCompilation, ISourcesCompilation } from '../../types/interfaces';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: INewsCompilation) => this.view.drawNews(data))
        );
        this.controller.getSources((data: ISourcesCompilation) => this.view.drawSources(data));
    }
}

export default App;
