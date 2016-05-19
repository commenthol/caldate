'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

var isObject = exports.isObject = function (arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
};

var isDate = exports.isDate = function (d) {
  return isObject(d) && objectToString(d) === '[object Date]';
};

/**
 * pad number with `0`
 * @param {number} number
 * @param {number} [len] - length
 * @return {string} padded string
 */
exports.pad0 = function pad0(number, len) {
  len = len || 2;
  number = Array(len).join('0') + number.toString();
  return number.substr(number.length - len, len);
};

/**
 * convert string to number
 * @private
 * @param {String} str
 * @return {Number} converted number or undefined
 */
var toNumber = exports.toNumber = function toNumber(str) {
  var num = parseInt(str, 10);
  if (!isNaN(num)) {
    return num;
  }
};

/**
 * extract or set year
 * @private
 * @param {Number|Date|String} year
 * @return {Number} year
 */
exports.toYear = function toYear(year) {
  if (!year) {
    year = new Date().getFullYear();
  } else if (isDate(year)) {
    year = year.getFullYear();
  } else if (typeof year === 'string') {
    year = toNumber(year);
  }
  return year;
};