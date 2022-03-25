import './ts/utilities/setup';
import Modal from './ts/utilities/modal';
import TaskList from './ts/tasklist';

import './scss/entry.scss';
import elements from './ts/elements';

// Elements
const createTaskModal = new Modal(elements.create.modal);
const taskList = new TaskList(elements.taskList);

elements.create.buttons.modalOpen.addEventListener('click', () => createTaskModal.toggle());

elements.create.inputs.title.addEventListener('input', (event: Event) => {
    taskList.setTitle((<HTMLInputElement>event.target).value);
});

elements.create.inputs.duration.addEventListener('input', (event: Event) => {
    taskList.setDuration(Number((<HTMLInputElement>event.target).value));
});

elements.create.buttons.priority.forEach(priorityButton => {
    priorityButton.addEventListener('click', (event: Event) => {
        event.preventDefault();

        elements.create.buttons.priority.forEach(priorityButton => priorityButton.classList.remove('active'));
        priorityButton.classList.add('active');
        
        taskList.setPriority(priorityButton.getAttribute('data-priority'));
    });
});

elements.create.form.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    taskList.addTask();

    createTaskModal.toggle();
    
    elements.create.buttons.priority.forEach(priorityButton => priorityButton.classList.remove('active'));
    elements.create.inputs.title.value = '';
    elements.create.inputs.duration.value = '';

    taskList.clear();
});