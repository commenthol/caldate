export type CalDateOptions = {
    year?: number | string;
    month?: number | string;
    day?: number | string;
    hour?: number | string;
    minute?: number | string;
    second?: number | string;
    duration?: number;
};
export type CalDateOffset = {
    number: number | string;
    unit?: 'd' | 'h' | 'm';
};
export declare class CalDate {
    /** @type {number} */
    year: number;
    /** @type {number} */
    month: number;
    /** @type {number} */
    day: number;
    /** @type {number} */
    hour: number;
    /** @type {number} */
    minute: number;
    /** @type {number} */
    second: number;
    /** @type {number} */
    duration: number;
    /**
     * constructs a new CalDate instance
     * @param {CalDateOptions|Date|null} [opts] - See `set(opts)`
     * @example
     * const CalDate = require('caldate')
     * const caldate = new CalDate({ year: 2000, month: 1, day: 1, hour: 12 })
     * caldate.year
     * //> 2000
     * caldate.month
     * //> 1
     */
    constructor(opts?: CalDateOptions | Date | null);
    /**
     * Convert a year-like value to a year number.
     * @param {number|string|Date|null} [year]
     * @returns {number|undefined}
     */
    static toYear(year?: number | string | Date | null): number | undefined;
    /**
     * set calendar date
     * @param {CalDateOptions|Date|null} [opts] - defaults to `1900-01-01`
     * @returns {this}
     */
    set(opts?: CalDateOptions | Date | null): this;
    /**
     * checks if Date is equal to `calDate`
     * @param {CalDate} calDate
     * @returns {boolean} true if date matches
     */
    isEqualDate(calDate: CalDate): boolean;
    /**
     * get day of week
     * @returns {number} day of week 0=sunday, 1=monday, ...
     */
    getDay(): number;
    /**
     * set offset per unit
     * @param {number|string|CalDateOffset} number
     * @param {'d'|'h'|'m'} [unit='d'] - Unit in days `d`, hours `h`, or minutes `m`
     * @returns {this}
     */
    setOffset(number: number | string | CalDateOffset, unit?: 'd' | 'h' | 'm'): this;
    /**
     * set time per hour, minute or second while maintaining duration at midnight
     * @param {number} [hour]
     * @param {number} [minute]
     * @param {number} [second]
     * @returns {this}
     */
    setTime(hour?: number, minute?: number, second?: number): this;
    /**
     * set duration in hours
     * @param {number} duration - Duration in hours
     * @returns {this}
     */
    setDuration(duration: number): this;
    /**
     * update internal data to real date
     * @returns {this}
     */
    update(): this;
    /**
     * get end date of calendar date
     * @return {CalDate}
     */
    toEndDate(): CalDate;
    /**
     * move internal date to a date in `timezone`
     * @param {string} [timezone] - e.g. 'America/New_York'
     * @returns {Date}
     */
    toTimezone(timezone?: string): Date;
    /**
     * set date from a given `timezone`
     * @param {Date} dateUTC - date in UTC
     * @param {string} [timezone] - timezone of dateUTC, e.g. 'America/New_York'
     * @returns {this} self
     */
    fromTimezone(dateUTC: Date, timezone?: string): this;
    /**
     * convert to Date
     * @returns {Date}
     */
    toDate(): Date;
    /**
     * Get the date in ISO format.
     * @returns {string}
     */
    toISOString(): string;
    /**
     * Get the date as `YYYY-MM-DD HH:MM:SS` (or ISO format when `iso` is true).
     * @param {boolean} [iso=false]
     * @returns {string}
     */
    toString(iso?: boolean): string;
}
