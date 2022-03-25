interface IElementSegment {
    buttons: {
        modalOpen: HTMLButtonElement,
        priority: HTMLButtonElement[],
    },
    form: HTMLFormElement,
    inputs: {
        duration: HTMLInputElement,
        title: HTMLInputElement,
    },
    modal: HTMLDivElement,
}

interface IElements {
    create: IElementSegment,
    edit: IElementSegment,
    taskList: HTMLUListElement,
}

export const create: IElementSegment = {
    buttons: {
        modalOpen: document.querySelector('.js-create-open-button'),
        priority: [].slice.call(document.querySelectorAll('.js-create-priority-button')),
    },
    form: document.querySelector('.js-create-form'),
    inputs: {
        title: document.querySelector('.js-create-title'),
        duration: document.querySelector('.js-create-duration'),
    },
    modal: document.querySelector('.js-create-modal'),
};

export const edit: IElementSegment = {
    buttons: {
        modalOpen: document.querySelector('.js-edit-open-button'),
        priority: [].slice.call(document.querySelectorAll('.js-edit-priority-button')),
    },
    form: document.querySelector('.js-edit-form'),
    inputs: {
        title: document.querySelector('.js-edit-title'),
        duration: document.querySelector('.js-edit-duration'),
    },
    modal: document.querySelector('.js-edit-modal'),
};

const elements: IElements = {
    create,
    edit,
    taskList: document.querySelector('.js-task-list'),
};

export default elements;