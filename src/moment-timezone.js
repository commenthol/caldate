import moment from 'moment-timezone'

/** @typedef {import('./utils.js').TimezoneAdapter} TimezoneAdapter */

/**
 * Move a date string to a different timezone using moment-timezone.
 * @param {string} dateStr `YYYY-MM-DD hh:mm`
 * @param {string} timezone `+08:00`|`Asia/Shanghai`
 * @returns {Date}
 */
export function toTimezone(dateStr, timezone) {
  if (/^[+-]\d{2}:\d{2}?$/.test(timezone)) {
    return new Date(
      `${moment.tz(dateStr, 'GMT').format().slice(0, -1)}${timezone}`
    )
  }
  return new Date(moment.tz(dateStr, timezone).format())
}

/**
 * Get date components in a given timezone using moment-timezone.
 * @param {Date} dateUTC
 * @param {string} timezone - IANA time zone or fixed offset, e.g. `+08:00`
 * @returns {{year: number, month: number, day: number, hour: number, minute: number, second: number}}
 */
export function fromTimezone(dateUTC, timezone) {
  const m = /^[+-]\d{2}:\d{2}$/.test(timezone)
    ? moment(dateUTC).utcOffset(timezone)
    : moment.tz(dateUTC, timezone)
  return {
    year: m.year(),
    month: m.month() + 1,
    day: m.date(),
    hour: m.hours(),
    minute: m.minutes(),
    second: m.seconds()
  }
}

/** @type {TimezoneAdapter} */
export const momentTimezoneAdapter = Object.freeze({ toTimezone, fromTimezone })
