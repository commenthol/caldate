/* global describe, it */

'use strict'

var assert = require('assert')
var CalDate = require('..')

describe('#CalDate', function () {
  it('can return 1900-01-01 if undefined', function () {
    var caldate = new CalDate()
    var res = caldate.toString()
    assert.strictEqual(res, '1900-01-01 00:00:00')
  })

  it('can set year 2000', function () {
    var caldate = new CalDate()
    caldate.set({ year: 2000 })
    var res = caldate.toString()
    assert.strictEqual(res, '2000-01-01 00:00:00')
  })

  it('can set month February', function () {
    var caldate = new CalDate()
    caldate.set({ month: 2 })
    var res = caldate.toString()
    assert.strictEqual(res, '1900-02-01 00:00:00')
  })

  it('can set day 13', function () {
    var caldate = new CalDate()
    caldate.set({ day: 13 })
    var res = caldate.toString()
    assert.strictEqual(res, '1900-01-13 00:00:00')
  })

  it('can set hour 12', function () {
    var caldate = new CalDate()
    caldate.set({ hour: 12 })
    var res = caldate.toString()
    assert.strictEqual(res, '1900-01-01 12:00:00')
  })

  it('can set a date', function () {
    var caldate = new CalDate()
    caldate.set(new Date('1900-01-01 12:00:00'))
    var res = caldate.toString()
    assert.strictEqual(res, '1900-01-01 12:00:00')
  })

  it('can return a ISO String', function () {
    var caldate = new CalDate()
    caldate.set(new Date('1900-01-01 12:00:00'))
    var res = caldate.toISOString()
    assert.strictEqual(res, '1900-01-01T12:00:00Z')
  })

  it('can update a date', function () {
    var caldate = new CalDate({
      year: 2000,
      month: 2,
      day: 30,
      hour: 25,
      minute: 61,
      second: 62
    })
    var res = caldate.toString()
    assert.strictEqual(res, '2000-03-02 02:02:02')
  })

  it('can get weekday', function () {
    var caldate = new CalDate({
      year: 2000,
      month: 2,
      day: 30,
      hour: 25,
      minute: 61,
      second: 62
    })
    var res = caldate.getDay()
    assert.strictEqual(res, 4)
  })

  it('can check for equal date', function () {
    var caldate = new CalDate({
      year: 2000,
      month: 2,
      day: 30,
      hour: 25,
      minute: 61,
      second: 62
    })
    var caldate2 = new CalDate(new Date('2000-03-02 02:02:02'))
    var res = caldate.isEqualDate(caldate2)
    assert.strictEqual(res, true)
  })

  it('can move date by timezone', function () {
    var caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    var res = caldate.toTimezone('America/New_York').toISOString()
    assert.strictEqual(res, '2000-01-01T05:00:00.000Z')
  })

  it('can return date in current timezone', function () {
    var caldate = new CalDate({ year: 2000, month: 1, day: 1 })
    var exp = new Date('2000-01-01 00:00:00')
    var res = caldate.toTimezone().toISOString()
    assert.strictEqual(res, exp.toISOString())
  })

  it('can return a end date', function () {
    var caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    var res = caldate.toEndDate().toISOString()
    assert.strictEqual(res, '2000-01-02T00:00:00Z')
  })

  it('can set offset in days', function () {
    var caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    caldate.setOffset(5)
    var res = caldate.toEndDate().toISOString()
    assert.strictEqual(res, '2000-01-07T00:00:00Z')
  })

  it('can set undefined offset', function () {
    var caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    caldate.setOffset()
    var res = caldate.toISOString()
    assert.strictEqual(res, '2000-01-01T00:00:00Z')
  })

  it('can set offset in hours', function () {
    var caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    caldate.setOffset(12, 'h')
    var res = caldate.toISOString()
    assert.strictEqual(res, '2000-01-01T12:00:00Z')
  })

  it('can set offset in hours using a fraction', function () {
    var caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    caldate.setOffset({ number: 12.555, unit: 'h' })
    var res = caldate.toISOString()
    assert.strictEqual(res, '2000-01-01T12:33:17Z')
  })

  it('can set offset in days', function () {
    var caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    caldate.setOffset({ number: 1.55, unit: 'd' })
    var res = caldate.toISOString()
    assert.strictEqual(res, '2000-01-02T13:12:00Z')
  })

  it('throws if not a number', function () {
    var caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    assert.throws(function () {
      caldate.setOffset('this is not a number')
    }, Error)
  })

  it('can set time while keeping duration until day change', function () {
    var caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    caldate.setTime(12)
    var res = caldate.toISOString()
    assert.strictEqual(res, '2000-01-01T12:00:00Z')
    res = caldate.toEndDate().toISOString()
    assert.strictEqual(res, '2000-01-02T00:00:00Z')
  })

  it('can set duration', function () {
    var caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    caldate.setTime(12)
    caldate.setDuration(23)
    var res = caldate.toISOString()
    assert.strictEqual(res, '2000-01-01T12:00:00Z')
    res = caldate.toEndDate().toISOString()
    assert.strictEqual(res, '2000-01-02T11:00:00Z')
  })

  it('can get year from a number', function () {
    var res = CalDate.toYear(2000)
    assert.strictEqual(res, 2000)
  })

  it('can get year from a string', function () {
    var res = CalDate.toYear('2000')
    assert.strictEqual(res, 2000)
  })

  it('can get year from a Date', function () {
    var res = CalDate.toYear(new Date('2000-01-01'))
    assert.strictEqual(res, 2000)
  })

  it('can get current year', function () {
    var exp = (new Date()).getFullYear()
    var res = CalDate.toYear()
    assert.strictEqual(res, exp)
  })
})
