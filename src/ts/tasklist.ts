import Task, { ITask } from './task';
import HTMLUtility from './utilities/dom';

interface ITemporary {
    priority: string,
    text: string,
}

interface ITaskList {
    tasks: (ITask[] | []),
    temporary: ITemporary,
    clear(): void,
    setPriority(priority: string): void,
}

export default class TaskList extends HTMLUtility implements ITaskList {
    tasks: ITask[] = [];
    temporary: ITemporary = {
        priority: 'low',
        text: '',
    };

    constructor(public element: HTMLUListElement) {
        super();
    }

    addTask() {
        this.tasks.push(new Task(this.element, this.temporary.text, this.temporary.priority));
        this.clear();
    }

    clear() {
        this.setPriority('');
        this.setText('');
    }

    setPriority(priority: string): void {
        this.temporary.priority = priority;
    }

    setText(text: string) {
        this.temporary.text = text;
    }
};