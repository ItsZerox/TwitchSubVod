import { secondsToHM } from './index'

describe('secondsToHM', () => {
  it('should return "0m" for 0 seconds', () => {
    expect(secondsToHM(0)).toEqual('0m')
  })

  it('should return "1m" for 60 seconds', () => {
    expect(secondsToHM(60)).toEqual('1m')
  })

  it('should return "1m" for 90 seconds', () => {
    expect(secondsToHM(90)).toEqual('1m')
  })

  it('should return "1h00m" for 3600 seconds', () => {
    expect(secondsToHM(3600)).toEqual('1h00m')
  })

  it('should return "1h30m" for 5400 seconds', () => {
    expect(secondsToHM(5400)).toEqual('1h30m')
  })

  it('should return "3h00m" for 10800 seconds', () => {
    expect(secondsToHM(10800)).toEqual('3h00m')
  })
})
