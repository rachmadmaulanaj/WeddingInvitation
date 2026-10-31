import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export function getDefaultEvent(events = []) {
    return events.find((event) => event.isDefault) || events[0] || null;
}

export function formatDate(value, format = 'DD MMMM YYYY') {
    if (!value) return '';
    return dayjs(value).format(format);
}

export function formatDateTime(value) {
    return formatDate(value, 'DD MMMM YYYY HH:mm');
}

export function formatTimeRange(start, end) {
    if (!start || !end) return '';
    return `${dayjs(start).format('HH:mm')} - ${dayjs(end).format('HH:mm')}`;
}

export function formatCalendarDate(value) {
    if (!value) return '';
    return dayjs(value).format('YYYYMMDDTHHmmss');
}

export function isDatePast(value) {
    if (!value) return false;
    return dayjs(value).isBefore(dayjs());
}

export function nowDateTime() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

export function getCountdownParts(targetDate) {
    if (!targetDate) return null;

    const totalSeconds = dayjs(targetDate).diff(dayjs(), 'second');
    if (totalSeconds <= 0) return null;

    return {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
    };
}
