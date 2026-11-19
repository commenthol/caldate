export type TimezoneAdapter = import('./utils.js').TimezoneAdapter;
/** @typedef {import('./utils.js').TimezoneAdapter} TimezoneAdapter */
/**
 * Move a date string to a different timezone using moment-timezone.
 * @param {string} dateStr `YYYY-MM-DD hh:mm`
 * @param {string} timezone `+08:00`|`Asia/Shanghai`
 * @returns {Date}
 */
export declare function toTimezone(dateStr: string, timezone: string): Date;
/**
 * Get date components in a given timezone using moment-timezone.
 * @param {Date} dateUTC
 * @param {string} timezone - IANA time zone or fixed offset, e.g. `+08:00`
 * @returns {{year: number, month: number, day: number, hour: number, minute: number, second: number}}
 */
export declare function fromTimezone(dateUTC: Date, timezone: string): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
};
/** @type {TimezoneAdapter} */
export declare const momentTimezoneAdapter: TimezoneAdapter;
