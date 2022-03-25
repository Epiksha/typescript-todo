import { ITaskList } from './tasklist';
import HTMLUtility from './utilities/dom';

export interface IBaseTask {
    duration: (number | null),
    priority: string,
    title: string,
};

export interface ITask extends IBaseTask {
    baseElement: HTMLLIElement,
    parentElement: HTMLUListElement,
    tasklist: ITaskList,
    buildStructure(): void,
};

export default class Task extends HTMLUtility implements ITask {
    baseElement = document.createElement('li');

    constructor(
        public parentElement: HTMLUListElement,
        public title: string,
        public priority: string,
        public duration: number,
        public tasklist: ITaskList,
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
        const taskContentWrapperElement: HTMLDivElement = document.createElement('div');
        const taskTitleElement: HTMLHeadingElement = document.createElement('h2');
        const taskDurationElement: HTMLSpanElement = document.createElement('span');
        const taskFooterElement: HTMLElement = document.createElement('footer');
        const taskDeleteButtonElement: HTMLButtonElement = document.createElement('button');
        
        this.addClass(this.baseElement, ['task', `task--${this.priority}`]);
        this.addClass(taskContentWrapperElement, 'task__content');
        this.addClass(taskTitleElement, 'task__heading');
        this.addClass(taskDurationElement, 'task__duration');
        this.addClass(taskFooterElement, 'task__footer');
        this.addClass(taskDeleteButtonElement, ['button', 'button--delete']);

        taskDeleteButtonElement.addEventListener('click', () => this.tasklist.deleteTask(this));

        this.appendToParent(taskTitleElement, document.createTextNode(this.title));
        this.appendToParent(taskDurationElement, document.createTextNode(`${this.duration} minutes`));
        this.appendToParent(taskDeleteButtonElement, document.createTextNode('Delete'));

        this.appendToParent(taskFooterElement, taskDeleteButtonElement);
        
        this.appendToParent(taskContentWrapperElement, taskTitleElement);
        this.appendToParent(taskContentWrapperElement, taskDurationElement);
        this.appendToParent(taskContentWrapperElement, taskFooterElement);

        this.appendToParent(this.baseElement, taskContentWrapperElement);
    }
};