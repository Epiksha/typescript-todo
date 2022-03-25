import Task, { IBaseTask, ITask } from './task';
import HTMLUtility from './utilities/dom';
import state from './state';

type TTaskCallback = (task: ITask) => void;

export interface ITaskList {
    isValid: boolean,
    tasks: ITask[] | [],
    temporary: IBaseTask,
    addTask(callback?: TTaskCallback): void,
    checkValid(): boolean,
    clear(): void,
    deleteTask(task: ITask): void,
    setDuration(duration: number): void,
    setPriority(priority: string): void,
    setTitle(title: string): void,
}

export default class TaskList extends HTMLUtility implements ITaskList {
    isValid = true;
    tasks: ITask[] = []
    temporary: IBaseTask = {
        duration: 0,
        priority: '',
        title: '',
    };

    constructor(public element: HTMLUListElement) {
        super();

        if (state.storageTasks.length) {
            state.storageTasks.forEach((task: IBaseTask) => {
                this.temporary = task;
                
                this.addTask();
            });
        }
    }

    addTask() {
        this.checkValid();

        if (this.isValid) {
            const task = new Task(
                this.element,
                this.temporary.title,
                this.temporary.priority,
                this.temporary.duration,
                this,
            );
    
            this.tasks.push(task);

            state.update({
                storageTasks: this.tasks.map(({ duration, priority, title }: ITask) => (
                    { duration, priority, title }
                )),
            });
    
            this.clear();
        }
    }

    checkValid() {
        if (!this.temporary.title || typeof this.temporary.title !== 'string') {
            this.isValid = false;
        }
        
        if (!this.temporary.duration || typeof this.temporary.duration !== 'number') {
            this.isValid = false;
        }
        
        if (!this.temporary.priority || typeof this.temporary.priority !== 'string') {
            this.isValid = false;
        }

        return this.isValid;
    }

    clear() {
        this.temporary = {
            duration: null,
            title: '',
            priority: '',
        };
    }

    deleteTask(task: ITask) {
        const { duration, priority, title } = task;

        const newStorageTasks = state.storageTasks.filter((storageTask: IBaseTask) => {
            return JSON.stringify({...storageTask}) !== JSON.stringify({ duration, priority, title });
        });

        const newTasks = this.tasks.filter((currentTask: ITask) => currentTask !== task);

        task.parentElement.removeChild(task.baseElement);

        this.tasks = newTasks;
        state.update({ storageTasks: newStorageTasks });
    }

    setDuration(duration: number) {
        this.temporary.duration = duration;
    }

    setPriority(priority: string): void {
        this.temporary.priority = priority;
    }

    setTitle(title: string) {
        this.temporary.title = title;
    }
};