function objectToString (o) {
  return Object.prototype.toString.call(o)
}

export function isObject (arg) {
  return typeof arg === 'object' && arg !== null
}

export function isDate (d) {
  return isObject(d) && objectToString(d) === '[object Date]'
}

/**
 * pad number with `0`
 * @param {number} number
 * @param {number} [len] - length
 * @return {string} padded string
 */
export function pad0 (number, len) {
  len = len || 2
  number = Array(len).join('0') + number.toString()
  return number.substr(number.length - len, len)
}

/**
 * convert string to number
 * @private
 * @param {String} str
 * @return {Number} converted number or undefined
 */
export function toNumber (str) {
  const num = parseInt(str, 10)
  if (!isNaN(num)) {
    return num
  }
}

/**
 * extract or set year
 * @private
 * @param {Number|Date|String} year
 * @return {Number} year
 */
export function toYear (year) {
  if (!year) {
    year = new Date().getFullYear()
  } else if (isDate(year)) {
    year = year.getFullYear()
  } else if (typeof year === 'string') {
    year = toNumber(year)
  }
  return year
}
