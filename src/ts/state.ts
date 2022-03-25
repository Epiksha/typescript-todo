import { IBaseTask, ITask } from './task';

interface IState {
    storageTasks: IBaseTask[],
}

interface IStateClass extends IState {
    update(state: IState): IBaseTask[],
}

class State implements IStateClass {
    storageTasks: IBaseTask[];

    constructor() {
        const data = JSON.parse(localStorage.getItem('taskMaster'));

        this.storageTasks = data && data.storageTasks ? data.storageTasks : [];
    }

    update(newState: IState) {
        if (newState.storageTasks) {
            this.storageTasks = newState.storageTasks;

            localStorage.setItem('taskMaster', JSON.stringify({ storageTasks: this.storageTasks }));

            return this.storageTasks;
        }
    }
}

export default new State();