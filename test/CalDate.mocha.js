import assert from 'assert'
import CalDate from '../src/index.js'
import { momentTimezoneAdapter } from '../src/moment-timezone.js'

function tests(timezoneAdapter) {
  it('can return 1900-01-01 if undefined', function () {
    const caldate = new CalDate()
    const res = caldate.toString()
    assert.strictEqual(res, '1900-01-01 00:00:00')
  })

  it('can set year 2000', function () {
    const caldate = new CalDate()
    caldate.set({ year: 2000 })
    const res = caldate.toString()
    assert.strictEqual(res, '2000-01-01 00:00:00')
  })

  it('can set month February', function () {
    const caldate = new CalDate()
    caldate.set({ month: 2 })
    const res = caldate.toString()
    assert.strictEqual(res, '1900-02-01 00:00:00')
  })

  it('can set day 13', function () {
    const caldate = new CalDate()
    caldate.set({ day: 13 })
    const res = caldate.toString()
    assert.strictEqual(res, '1900-01-13 00:00:00')
  })

  it('can set hour 12', function () {
    const caldate = new CalDate()
    caldate.set({ hour: 12 })
    const res = caldate.toString()
    assert.strictEqual(res, '1900-01-01 12:00:00')
  })

  it('can set a date', function () {
    const caldate = new CalDate()
    caldate.set(new Date('1900-01-01 12:00:00'))
    const res = caldate.toString()
    assert.strictEqual(res, '1900-01-01 12:00:00')
  })

  it('can return a ISO String', function () {
    const caldate = new CalDate()
    caldate.set(new Date('1900-01-01 12:00:00'))
    const res = caldate.toISOString()
    assert.strictEqual(res, '1900-01-01T12:00:00Z')
  })

  it('can update a date', function () {
    const caldate = new CalDate({
      year: 2000,
      month: 2,
      day: 30,
      hour: 25,
      minute: 61,
      second: 62
    })
    const res = caldate.toString()
    assert.strictEqual(res, '2000-03-02 02:02:02')
  })

  it('can get weekday', function () {
    const caldate = new CalDate({
      year: 2000,
      month: 2,
      day: 30,
      hour: 25,
      minute: 61,
      second: 62
    })
    const res = caldate.getDay()
    assert.strictEqual(res, 4)
  })

  it('can check for equal date', function () {
    const caldate = new CalDate({
      year: 2000,
      month: 2,
      day: 30,
      hour: 25,
      minute: 61,
      second: 62
    })
    const caldate2 = new CalDate(new Date('2000-03-02 02:02:02'))
    const res = caldate.isEqualDate(caldate2)
    assert.strictEqual(res, true)
  })

  it('can move date by timezone America/New_York', function () {
    const caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    const res = caldate
      .toTimezone('America/New_York', timezoneAdapter)
      .toISOString()
    assert.strictEqual(res, '2000-01-01T05:00:00.000Z')
  })

  it('can move date by timezone -05:00', function () {
    const caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    const res = caldate.toTimezone('-05:00', timezoneAdapter).toISOString()
    assert.strictEqual(res, '2000-01-01T05:00:00.000Z')
  })

  it('can return date in current timezone', function () {
    const caldate = new CalDate({ year: 2000, month: 1, day: 1 })
    const exp = new Date('2000-01-01 00:00:00')
    const res = caldate.toTimezone().toISOString()
    assert.strictEqual(res, exp.toISOString())
  })

  it('can set date for timezone', function () {
    const caldate = new CalDate()
    caldate.fromTimezone(
      new Date('2016-12-31T13:00:00Z'),
      'Australia/Sydney',
      timezoneAdapter
    )
    assert.strictEqual(caldate.toString(), '2017-01-01 00:00:00')
  })

  it('can set date for timezone Asia/Shanghai', function () {
    const caldate = new CalDate()
    caldate.fromTimezone(
      new Date('2000-01-01T00:00:00Z'),
      'Asia/Shanghai',
      timezoneAdapter
    )
    assert.strictEqual(caldate.toString(), '2000-01-01 08:00:00')
  })

  it('can set date for timezone +08:00', function () {
    const caldate = new CalDate()
    caldate.fromTimezone(
      new Date('2000-01-01T00:00:00Z'),
      '+08:00',
      timezoneAdapter
    )
    assert.strictEqual(caldate.toString(), '2000-01-01 08:00:00')
  })

  it('can set date without a timezone', function () {
    const caldate = new CalDate()
    const res = caldate.fromTimezone(new Date(2016, 11, 31, 13))
    assert.strictEqual(res, caldate)
    assert.strictEqual(caldate.toString(), '2016-12-31 13:00:00')
  })

  it('can return a end date', function () {
    const caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    const res = caldate.toEndDate().toISOString()
    assert.strictEqual(res, '2000-01-02T00:00:00Z')
  })

  it('can set offset in days', function () {
    const caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    caldate.setOffset(5)
    const res = caldate.toEndDate().toISOString()
    assert.strictEqual(res, '2000-01-07T00:00:00Z')
  })

  it('can set undefined offset', function () {
    const caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    caldate.setOffset()
    const res = caldate.toISOString()
    assert.strictEqual(res, '2000-01-01T00:00:00Z')
  })

  it('can set offset in hours', function () {
    const caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    caldate.setOffset(12, 'h')
    const res = caldate.toISOString()
    assert.strictEqual(res, '2000-01-01T12:00:00Z')
  })

  it('can set offset in minutes', function () {
    const negative = new CalDate({ year: 2000, month: 1, day: 1 })
    negative.setOffset(-360, 'm')
    assert.strictEqual(negative.toString(), '1999-12-31 18:00:00')

    const positive = new CalDate({ year: 2000, month: 1, day: 1 })
    positive.setOffset(90, 'm')
    assert.strictEqual(positive.toString(), '2000-01-01 01:30:00')
  })

  it('can set offset in hours using a fraction', function () {
    const caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    caldate.setOffset({ number: 12.555, unit: 'h' })
    const res = caldate.toISOString()
    assert.strictEqual(res, '2000-01-01T12:33:17Z')
  })

  it('can set offset in days', function () {
    const caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    caldate.setOffset({ number: 1.55, unit: 'd' })
    const res = caldate.toISOString()
    assert.strictEqual(res, '2000-01-02T13:12:00Z')
  })

  it('throws if not a number', function () {
    const caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    assert.throws(function () {
      caldate.setOffset('this is not a number')
    }, Error)
  })

  it('can set time while keeping duration until day change', function () {
    const caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    caldate.setTime(12)
    let res = caldate.toISOString()
    assert.strictEqual(res, '2000-01-01T12:00:00Z')
    res = caldate.toEndDate().toISOString()
    assert.strictEqual(res, '2000-01-02T00:00:00Z')
  })

  it('preserves seconds when calculating the end date', function () {
    const caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    caldate.setTime(12, 0, 15)
    assert.strictEqual(
      caldate.toEndDate().toISOString(),
      '2000-01-02T00:00:00Z'
    )
  })

  it('can set duration', function () {
    const caldate = new CalDate(new Date('2000-01-01 00:00:00'))
    caldate.setTime(12)
    caldate.setDuration(23)
    let res = caldate.toISOString()
    assert.strictEqual(res, '2000-01-01T12:00:00Z')
    res = caldate.toEndDate().toISOString()
    assert.strictEqual(res, '2000-01-02T11:00:00Z')
  })

  it('can get year from a number', function () {
    const res = CalDate.toYear(2000)
    assert.strictEqual(res, 2000)
  })

  it('can get year from a string', function () {
    const res = CalDate.toYear('2000')
    assert.strictEqual(res, 2000)
  })

  it('can get year from a Date', function () {
    const res = CalDate.toYear(new Date('2000-01-01'))
    assert.strictEqual(res, 2000)
  })

  it('can get current year', function () {
    const exp = new Date().getFullYear()
    const res = CalDate.toYear()
    assert.strictEqual(res, exp)
  })
}

describe('#CalDate', function () {
  tests()

  it('Navidad en 2026 en Cuba', function () {
    const caldate = new CalDate({ year: 2026, month: 12, day: 25 })
    const res = caldate.toTimezone('America/Havana').toISOString()
    assert.strictEqual(res, '2026-12-25T05:00:00.000Z')
  })
})

describe('#CalDate with moment-timezone adapter', function () {
  tests(momentTimezoneAdapter)

  it('Navidad en 2026 en Cuba', function () {
    const caldate = new CalDate({ year: 2026, month: 12, day: 25 })
    const res = caldate
      .toTimezone('America/Havana', momentTimezoneAdapter)
      .toISOString()
    assert.strictEqual(res, '2026-12-25T04:00:00.000Z')
  })

  it('requires a complete timezone adapter', function () {
    const caldate = new CalDate({ year: 2026, month: 12, day: 25 })
    assert.throws(
      () => caldate.toTimezone('America/Havana', { toTimezone() {} }),
      {
        name: 'TypeError',
        message:
          'timezoneAdapter must provide toTimezone and fromTimezone functions'
      }
    )
  })
})
