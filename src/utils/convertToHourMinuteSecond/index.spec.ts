import { convertToHourMinuteSecond } from '.'

describe('convertToHourMinuteSecond', () => {
  it("should return '00:00' when seconds is 0", () => {
    expect(convertToHourMinuteSecond(0)).toBe('00:00')
  })

  it("should return '00:01' when seconds is 1", () => {
    expect(convertToHourMinuteSecond(1)).toBe('00:01')
  })

  it("should return '00:59' when seconds is 59", () => {
    expect(convertToHourMinuteSecond(59)).toBe('00:59')
  })

  it("should return '01:00' when seconds is 60", () => {
    expect(convertToHourMinuteSecond(60)).toBe('01:00')
  })

  it("should return '11:00' when seconds is 660", () => {
    expect(convertToHourMinuteSecond(660)).toBe('11:00')
  })

  it("should return '01:00:01' when seconds is 3601", () => {
    expect(convertToHourMinuteSecond(3601)).toBe('01:00:01')
  })

  it("should return '11:00:01' when seconds is 3661", () => {
    expect(convertToHourMinuteSecond(39601)).toBe('11:00:01')
  })
})
