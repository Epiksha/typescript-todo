import HTMLUtility from './utilities/dom';
import Calendar from './utilities/calendar';

export interface ITask {
    baseElement: HTMLLIElement,
    parentElement: HTMLUListElement,
    priority: string,
    title: string,
    buildStructure(): void,
}

export default class Task extends HTMLUtility implements ITask {
    baseElement = document.createElement('li');

    constructor(
        public parentElement: HTMLUListElement,
        public title: string,
        public priority: string,
        classes: (string|string[]) = '',
    ) {
        super();

        this.buildStructure();

        if (classes) {
            this.addClass(this.baseElement, classes);
        }

        this.appendToParent(this.parentElement, this.baseElement);
    }

    buildStructure() {
        this.addClass(this.baseElement, 'task');

        ['title', 'priority', 'date'].forEach(item => {
            const taskChild: HTMLDivElement = document.createElement('div');
            
            this.addClass(taskChild, ['task__item', `task__item--${item}`]);

            if (item === 'title') {
                this.appendToParent(taskChild, document.createTextNode(this.title));
            } else if (item === 'priority') {
                this.appendToParent(taskChild, document.createTextNode(this.priority.toString()));
            } else if (item === 'date') {
                this.appendToParent(taskChild, document.createTextNode(Calendar.getDate()));
            }

            this.appendToParent(this.baseElement, taskChild);
        });
    }
};