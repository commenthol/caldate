'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var moment = require('moment-timezone');
var toNumber = require('./utils').toNumber;
var isDate = require('./utils').isDate;
var pad0 = require('./utils').pad0;

var PROPS = ['year', 'month', 'day', 'hour', 'minute', 'second'];

var CalDate = function () {
  /**
   * constructs a new CalDate instance
   * @param {Object|Date} [opts] - See `set(opts)`
   * @example
   * var CalDate = require('caldate')
   * var caldate = new CalDate('2000-01-01 12:00:00')
   * caldate.year
   * //> 2000
   * caldate.month
   * //> 1
   */

  function CalDate(opts) {
    _classCallCheck(this, CalDate);

    this.set(opts);
  }

  /**
   * set calendar date
   * @param {Object|Date} [opts] - defaults to `1900-01-01`
   * @param {String} opts.year
   * @param {String} opts.month - January equals to 1, December to 12
   * @param {String} opts.day
   * @param {String} opts.hour
   * @param {String} opts.minute
   * @param {String} opts.second
   * @param {String} opts.duration - defaults to 24 hours
   */


  _createClass(CalDate, [{
    key: 'set',
    value: function set(opts) {
      var _this = this;

      opts = opts || { year: 1900, month: 1, day: 1 };
      if (isDate(opts)) {
        this.year = opts.getFullYear();
        this.month = opts.getMonth() + 1;
        this.day = opts.getDate();
        this.hour = opts.getHours();
        this.minute = opts.getMinutes();
        this.second = opts.getSeconds();
      } else {
        PROPS.forEach(function (p) {
          _this[p] = toNumber(opts[p]) || 0;
        });
        this.month = this.month || 1;
        this.day = this.day || 1;
      }
      this.duration = opts.duration || 24; // duration is in hours
      return this;
    }

    /**
     * checks if Date is equal to `calDate`
     * @param {CalDate} calDate
     * @return {Boolean} true if date matches
     */

  }, {
    key: 'isEqualDate',
    value: function isEqualDate(calDate) {
      var _this2 = this;

      var res = true;
      this.update();['year', 'month', 'day'].forEach(function (p) {
        res &= _this2[p] === calDate[p];
      });
      return !!res;
    }

    /**
     * get day of week
     * @return {Number} day of week 0=sunday, 1=monday, ...
     */

  }, {
    key: 'getDay',
    value: function getDay() {
      return this.toDate().getDay();
    }

    /**
     * set offset per unit
     * @param {Number} number
     * @param {String} unit - Unit in days `d`, hours `h, minutes `m`
     * @return {Object} this
     */

  }, {
    key: 'setOffset',
    value: function setOffset(number, unit) {
      if (number) {
        if ((typeof number === 'undefined' ? 'undefined' : _typeof(number)) === 'object') {
          unit = number.unit;
          number = number.number;
        }
        unit = unit || 'd';
        number = parseFloat(number, 10);
        if (isNaN(number)) {
          throw new Error('Number required');
        }

        var o = { day: 0 };
        if (unit === 'd') {
          o.day = number | 0;
          number -= o.day;
          number *= 24;
        }
        if (unit === 'd' || unit === 'h') {
          o.hour = number % 24 | 0;
          number -= o.hour;
          number *= 60;
        }
        o.minute = number % 60 | 0;
        number -= o.minute;
        number *= 60;
        o.second = number % 60 | 0;

        this.day += o.day;
        this.hour += o.hour;
        this.minute += o.minute;
        this.second += o.second;
      }
      this.update();
      return this;
    }

    /**
     * set time per hour, minute or second while maintaining duration at midnight
     * @param {Number} [hour]
     * @param {Number} [minute]
     * @param {Number} [second]
     * @return {Object} this
     */

  }, {
    key: 'setTime',
    value: function setTime(hour, minute, second) {
      hour = hour || 0;
      minute = minute || 0;
      second = second || 0;
      // the holiday usually ends at midnight - if this is not the case set different duration explicitely
      this.duration = 24 - (hour + minute / 60 + second / 3600);
      this.hour = hour;
      this.minute = minute;
      this.second = second;
      this.update();
      return this;
    }

    /**
     * set duration in hours
     * @param {Number} duration in hours
     * @return {Object} this
     */

  }, {
    key: 'setDuration',
    value: function setDuration(duration) {
      this.duration = duration;
      return this;
    }

    /**
     * update internal data to real date
     * @return {Object} this
     */

  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

      if (this.year) {
        var d = new CalDate(this.toDate());
        PROPS.forEach(function (p) {
          _this3[p] = d[p];
        });
      }
      return this;
    }

    /**
     * get end date of calendar date
     * @return {CalDate}
     */

  }, {
    key: 'toEndDate',
    value: function toEndDate() {
      var d = new CalDate(this.toDate());
      d.minute += this.duration * 60 | 0;
      d.update();
      return d;
    }

    /**
     * move internal date to a date in `timezone`
     * @param {String} timezone - e.g. 'America/New_York'
     * @return {Date}
     */

  }, {
    key: 'toTimezone',
    value: function toTimezone(timezone) {
      if (timezone) {
        return new Date(moment.tz(this.toString(), timezone).format());
      } else {
        return this.toDate();
      }
    }

    /**
     * convert to Date
     * @return {Date}
     */

  }, {
    key: 'toDate',
    value: function toDate() {
      return new Date(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, 0);
    }

    /**
     * get Date in ISO format
     */

  }, {
    key: 'toISOString',
    value: function toISOString() {
      return this.toString(true);
    }

    /**
     * get Date as String `YYYY-MM-DD HH:MM:SS`
     */

  }, {
    key: 'toString',
    value: function toString(iso) {
      var d = new CalDate(this.toDate());
      return pad0(d.year, 4) + '-' + pad0(d.month) + '-' + pad0(d.day) + (iso ? 'T' : ' ') + pad0(d.hour) + ':' + pad0(d.minute) + ':' + pad0(d.second) + (iso ? 'Z' : '');
    }
  }]);

  return CalDate;
}();

module.exports = CalDate;