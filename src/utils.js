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
