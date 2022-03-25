import Calendar from './calendar';

export default ((): void => {
    // Setup SVG Icon Spritesheet
    const svgs = require.context('../../assets/icons/', true, /\.svg$/);
    svgs.keys().forEach(svgs);

    const calendarDay: HTMLElement = document.querySelector('.js-calendar-day-number');

    calendarDay.textContent = `${Calendar.getDate('dddd')} ${Calendar.getDate('Do')} ${Calendar.getDate('MMMM')}`;
})();