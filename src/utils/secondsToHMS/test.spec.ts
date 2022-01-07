import { secondsToHMS } from './index'

describe('secondsToHMS', () => {
  it('should return "0:00:00" for 0', () => {
    expect(secondsToHMS(0)).toBe('0:00')
  })

  it('should return "0:00:01" for 1', () => {
    expect(secondsToHMS(1)).toBe('0:01')
  })

  it('should return "0:01:00" for 60', () => {
    expect(secondsToHMS(60)).toBe('1:00')
  })

  it('should return "0:01:01" for 61', () => {
    expect(secondsToHMS(61)).toBe('1:01')
  })

  it('should return "1:00:00" for 3600', () => {
    expect(secondsToHMS(3600)).toBe('1:00:00')
  })

  it('should return "1:00:01" for 3601', () => {
    expect(secondsToHMS(3601)).toBe('1:00:01')
  })

  it('should return "1:01:00" for 3660', () => {
    expect(secondsToHMS(3660)).toBe('1:01:00')
  })

  it('should return "1:01:01" for 3661', () => {
    expect(secondsToHMS(3661)).toBe('1:01:01')
  })

  it('should return "10:00:00" for 36000', () => {
    expect(secondsToHMS(36000)).toBe('10:00:00')
  })
})
