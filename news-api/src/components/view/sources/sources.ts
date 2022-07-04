import './sources.css';
import { ISources } from '../../../types/index';

class Sources {
    draw(data: ISources[]): void {
        // console.log(data);
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        // console.log(sourceItemTemp);

        data.forEach((item) => {
            // console.log(item);
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;
            // console.log(sourceClone);

            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
}

export default Sources;
