interface IHTMLUtility {
    addClass(element: HTMLElement, classes: string|string[]): void,
    appendToParent(parent: HTMLElement, child: HTMLElement): void,
    hasClass(element: HTMLElement, className: string): boolean,
    removeClass(element: HTMLElement, classes: string|string[]): void,
    toggleClass(element: HTMLElement, className: string): void,
}

export default abstract class HTMLUtility implements IHTMLUtility {
    addClass(element: HTMLElement, classes: string|string[]) {
        if (typeof classes === 'string') {
            element.classList.add(classes);
        } else if (Array.isArray(classes)) {
            classes.forEach(classItem => element.classList.add(classItem));
        } else {
            throw new Error('addClass: \'classes\' paramater must be of type string or type array.');
        }
    }

    appendToParent(parent: HTMLElement, child: (HTMLElement|Text)) {
        parent.appendChild(child);
    }

    hasClass(element: HTMLElement, className: string) {
        return element.classList.contains(className);
    }

    removeClass(element: HTMLElement, classes: string|string[]) {
        if (typeof classes === 'string') {
            element.classList.remove(classes);
        } else if (Array.isArray(classes)) {
            classes.forEach(classItem => element.classList.remove(classItem));
        } else {
            throw new Error('removeClass: \'classes\' paramater must be of type string or type array.');
        }
    }
    
    toggleClass(element: HTMLElement, className: string) {
        if (this.hasClass(element, className)) {
            this.removeClass(element, className);
        } else {
            this.addClass(element, className);
        }
    }
};