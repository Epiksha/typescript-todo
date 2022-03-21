import HTMLUtility from './dom';

interface IModal {
    isActive: boolean,
    modalElement: HTMLElement,
    toggle(): void,
}

class Modal extends HTMLUtility implements IModal {
    isActive: boolean = false;

    constructor(public modalElement: HTMLElement) {
        super();
    }

    toggle() {
        this.toggleClass(this.modalElement, 'active');
    }
}

export default Modal;