import moment from 'moment-timezone'
import { toYear, toNumber, isDate, pad0 } from './utils.js'

/**
 * @typedef {Object} CalDateOptions
 * @property {number|string} [year]
 * @property {number|string} [month]
 * @property {number|string} [day]
 * @property {number|string} [hour]
 * @property {number|string} [minute]
 * @property {number|string} [second]
 * @property {number} [duration]
 */

/** @typedef {{number: number|string, unit?: 'd'|'h'|'m'}} CalDateOffset */

/** @type {Array<'year'|'month'|'day'|'hour'|'minute'|'second'>} */
const PROPS = ['year', 'month', 'day', 'hour', 'minute', 'second']

export class CalDate {
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
  constructor(opts) {
    /** @type {number} */
    this.year = 0
    /** @type {number} */
    this.month = 0
    /** @type {number} */
    this.day = 0
    /** @type {number} */
    this.hour = 0
    /** @type {number} */
    this.minute = 0
    /** @type {number} */
    this.second = 0
    /** @type {number} */
    this.duration = 24
    this.set(opts)
  }

  /**
   * Convert a year-like value to a year number.
   * @param {number|string|Date|null} [year]
   * @returns {number|undefined}
   */
  static toYear(year) {
    return toYear(year)
  }

  /**
   * set calendar date
   * @param {CalDateOptions|Date|null} [opts] - defaults to `1900-01-01`
   * @returns {this}
   */
  set(opts) {
    opts = opts || { year: 1900, month: 1, day: 1 }
    if (isDate(opts)) {
      this.year = opts.getFullYear()
      this.month = opts.getMonth() + 1
      this.day = opts.getDate()
      this.hour = opts.getHours()
      this.minute = opts.getMinutes()
      this.second = opts.getSeconds()
    } else {
      PROPS.forEach((p) => {
        this[p] = toNumber(opts[p]) || 0
      })
      this.month = this.month || 1
      this.day = this.day || 1
    }
    this.duration =
      (typeof opts === 'object' &&
        opts !== null &&
        'duration' in opts &&
        opts.duration) ||
      24 // duration is in hours
    return this
  }

  /**
   * checks if Date is equal to `calDate`
   * @param {CalDate} calDate
   * @returns {boolean} true if date matches
   */
  isEqualDate(calDate) {
    this.update()
    return [
      this.year === calDate.year,
      this.month === calDate.month,
      this.day === calDate.day
    ].every(Boolean)
  }

  /**
   * get day of week
   * @returns {number} day of week 0=sunday, 1=monday, ...
   */
  getDay() {
    return this.toDate().getDay()
  }

  /**
   * set offset per unit
   * @param {number|string|CalDateOffset} number
   * @param {'d'|'h'|'m'} [unit='d'] - Unit in days `d`, hours `h`, or minutes `m`
   * @returns {this}
   */
  setOffset(number, unit) {
    if (number) {
      if (typeof number === 'object') {
        unit = number.unit
        number = number.number
      }
      unit = unit || 'd'
      number = parseFloat(String(number))
      if (isNaN(number)) {
        throw new Error('Number required')
      }

      const o = { day: 0 }
      if (unit === 'd') {
        o.day = number | 0
        number -= o.day
        number *= 24
      }
      if (unit === 'd' || unit === 'h') {
        o.hour = (number % 24) | 0
        number -= o.hour
        number *= 60
      }
      o.minute = (number % 60) | 0
      number -= o.minute
      number *= 60
      o.second = (number % 60) | 0

      this.day += o.day
      this.hour += o.hour
      this.minute += o.minute
      this.second += o.second
    }
    this.update()
    return this
  }

  /**
   * set time per hour, minute or second while maintaining duration at midnight
   * @param {number} [hour]
   * @param {number} [minute]
   * @param {number} [second]
   * @returns {this}
   */
  setTime(hour, minute, second) {
    hour = hour || 0
    minute = minute || 0
    second = second || 0
    // the holiday usually ends at midnight - if this is not the case set different duration explicitely
    this.duration = 24 - (hour + minute / 60 + second / 3600)
    this.hour = hour
    this.minute = minute
    this.second = second
    this.update()
    return this
  }

  /**
   * set duration in hours
   * @param {number} duration - Duration in hours
   * @returns {this}
   */
  setDuration(duration) {
    this.duration = duration
    return this
  }

  /**
   * update internal data to real date
   * @returns {this}
   */
  update() {
    if (this.year) {
      const d = new CalDate(this.toDate())
      PROPS.forEach((p) => {
        this[p] = d[p]
      })
    }
    return this
  }

  /**
   * get end date of calendar date
   * @return {CalDate}
   */
  toEndDate() {
    const d = new CalDate(this.toDate())
    d.minute += (this.duration * 60) | 0
    d.update()
    return d
  }

  /**
   * move internal date to a date in `timezone`
   * @param {string} [timezone] - e.g. 'America/New_York'
   * @returns {Date}
   */
  toTimezone(timezone) {
    if (timezone) {
      return new Date(moment.tz(this.toString(), timezone).format())
    } else {
      return this.toDate()
    }
  }

  /**
   * set date from a given `timezone`
   * @param {Date} dateUTC - date in UTC
   * @param {string} [timezone] - timezone of dateUTC, e.g. 'America/New_York'
   * @returns {this} self
   */
  fromTimezone(dateUTC, timezone) {
    if (timezone) {
      const m = moment.tz(dateUTC, timezone)
      this.year = m.year()
      this.month = m.month() + 1
      this.day = m.date()
      this.hour = m.hours()
      this.minute = m.minutes()
      this.second = m.seconds()
    } else {
      this.set(dateUTC)
    }
    return this
  }

  /**
   * convert to Date
   * @returns {Date}
   */
  toDate() {
    return new Date(
      this.year,
      this.month - 1,
      this.day,
      this.hour,
      this.minute,
      this.second,
      0
    )
  }

  /**
   * Get the date in ISO format.
   * @returns {string}
   */
  toISOString() {
    return this.toString(true)
  }

  /**
   * Get the date as `YYYY-MM-DD HH:MM:SS` (or ISO format when `iso` is true).
   * @param {boolean} [iso=false]
   * @returns {string}
   */
  toString(iso) {
    const d = new CalDate(this.toDate())
    return (
      pad0(d.year, 4) +
      '-' +
      pad0(d.month) +
      '-' +
      pad0(d.day) +
      (iso ? 'T' : ' ') +
      pad0(d.hour) +
      ':' +
      pad0(d.minute) +
      ':' +
      pad0(d.second) +
      (iso ? 'Z' : '')
    )
  }
}
