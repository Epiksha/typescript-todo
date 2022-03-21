import dayjs from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat)

import HTMLUtility from './dom';

interface IGetDate {(format?: string): string}

interface ICalendar {
    getDate: IGetDate,
}

class Calendar extends HTMLUtility implements ICalendar {
    constructor() {
        super();
    }

    getDate(format: string = '') {
        return dayjs().format(format ? format : 'DD/MM/YYYY');
    }
};

export default new Calendar();