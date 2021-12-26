import formatDate from './index'

describe('formatDate', () => {
  it('should return a string date', () => {
    const date = '2021-12-22T22:44:04Z'

    expect(formatDate(date)).toBe('Dec 22, 2021')
  })

  it('should return a string date with a locale', () => {
    const date = '2021-12-22T22:44:04Z'
    const locale = 'pt-BR'

    expect(formatDate(date, locale)).toBe('22 de dez. de 2021')
  })
})
