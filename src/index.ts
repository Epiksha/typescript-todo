import './ts/utilities/setup';
import Modal from './ts/utilities/modal';
import TaskList from './ts/tasklist';

import './scss/entry.scss';

// Elements
const taskListElement: HTMLUListElement = document.querySelector('.js-task-list');
const modalButton: HTMLButtonElement = document.querySelector('.js-button-modal');
const priorityButtons: HTMLElement[] = [].slice.call(document.querySelectorAll('.js-button-priority'));
const modalElement: HTMLElement = document.querySelector('.js-modal');
const modalTextInputElement: HTMLInputElement = document.querySelector('.js-modal-task-name');
const taskFormElement: HTMLElement = document.querySelector('.js-task-modal');

const taskModal = new Modal(modalElement);
const taskList = new TaskList(taskListElement);

modalButton.addEventListener('click', () => taskModal.toggle());

modalTextInputElement.addEventListener('input', (event: Event) => {
    taskList.setText((<HTMLInputElement>event.target).value);
});

priorityButtons.forEach(priorityButton => {
    priorityButton.addEventListener('click', (event: Event) => {
        event.preventDefault();

        priorityButtons.forEach(priorityButton => priorityButton.classList.remove('active'));
        priorityButton.classList.add('active');
        
        taskList.setPriority(priorityButton.getAttribute('data-priority'));
    });
});

taskFormElement.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    taskList.addTask();
    taskModal.toggle();
    
    priorityButtons.forEach(priorityButton => priorityButton.classList.remove('active'));
    modalTextInputElement.value = '';
    taskList.clear();
});