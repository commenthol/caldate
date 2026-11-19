/**
 * @param {unknown} value
 * @returns {string}
 */
function objectToString(value) {
  return Object.prototype.toString.call(value)
}

/**
 * @param {unknown} arg
 * @returns {arg is object}
 */
export function isObject(arg) {
  return typeof arg === 'object' && arg !== null
}

/**
 * @param {unknown} value
 * @returns {value is Date}
 */
export function isDate(value) {
  return isObject(value) && objectToString(value) === '[object Date]'
}

/**
 * pad number with `0`
 * @param {number} number
 * @param {number} [len=2] - desired output length
 * @returns {string} padded string
 */
export function pad0(number, len) {
  len = len || 2
  const value = Array(len).join('0') + number.toString()
  return value.slice(value.length - len)
}

/**
 * Convert a value to an integer.
 * @private
 * @param {number|string|null|undefined} str
 * @returns {number|undefined} converted number or undefined
 */
export function toNumber(str) {
  const num = parseInt(String(str), 10)
  if (!isNaN(num)) {
    return num
  }
}

/**
 * extract or set year
 * @private
 * @param {number|string|Date|null} [year]
 * @returns {number|undefined} year
 */
export function toYear(year) {
  if (!year) {
    return new Date().getFullYear()
  }
  if (isDate(year)) {
    return year.getFullYear()
  }
  if (typeof year === 'string') {
    return toNumber(year)
  }
  return year
}

/**
 * move a date string to a different timezone using the Temporal API
 * @param {string} dateStr `YYYY-MM-DD hh:mm`
 * @param {string} timezone `+08:00`|`Asia/Shanghai`
 * @returns {Date}
 */
export function toTimezone(dateStr, timezone) {
  const temporal = /** @type {any} */ (globalThis).Temporal
  const dateTime = temporal.PlainDateTime.from(dateStr.replace(' ', 'T'))
  return new Date(
    dateTime.toZonedDateTime(timezone).toInstant().epochMilliseconds
  )
}

/**
 * get date components in a given timezone using the Temporal API
 * @param {Date} dateUTC
 * @param {string} timezone - IANA time zone or fixed offset, e.g. `+08:00`
 * @returns {{year: number, month: number, day: number, hour: number, minute: number, second: number}}
 */
export function fromTimezone(dateUTC, timezone) {
  const temporal = /** @type {any} */ (globalThis).Temporal
  const dateTime = temporal.Instant.fromEpochMilliseconds(
    dateUTC.getTime()
  ).toZonedDateTimeISO(timezone)
  return {
    year: dateTime.year,
    month: dateTime.month,
    day: dateTime.day,
    hour: dateTime.hour,
    minute: dateTime.minute,
    second: dateTime.second
  }
}

/**
 * @typedef {{toTimezone: typeof toTimezone, fromTimezone: typeof fromTimezone}} TimezoneAdapter
 */

/** @type {TimezoneAdapter} */
export const temporalTimezoneAdapter = Object.freeze({
  toTimezone,
  fromTimezone
})
