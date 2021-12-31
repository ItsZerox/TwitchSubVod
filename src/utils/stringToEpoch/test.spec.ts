import { stringToEpoch } from './index'

describe('stringToEpoch', () => {
  it('should convert string to epoch', () => {
    expect(stringToEpoch('2021-12-31T13:03:32Z')).toBe('1640955812')
    expect(stringToEpoch('2021-12-31T13:03:32.000Z')).toBe('1640955812')
  })

  it('should throw if date is not valid', () => {
    expect(() => stringToEpoch('invalid date')).toThrow()
  })
})
