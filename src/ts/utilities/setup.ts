import Calendar from './calendar';

export default ((): void => {
    // Setup SVG Icon Spritesheet
    const svgs = require.context('../../assets/icons/', true, /\.svg$/);
    svgs.keys().forEach(svgs);

    const calendarDayNumberElement: HTMLElement = document.querySelector('.js-calendar-day-number');
    const monthYearElement: HTMLElement = document.querySelector('.js-calendar-month-year');

    calendarDayNumberElement.textContent = `${Calendar.getDate('dddd')} ${Calendar.getDate('Do')}`;
    monthYearElement.textContent = `${Calendar.getDate('MMMM')}, ${Calendar.getDate('YYYY')}`;
})();