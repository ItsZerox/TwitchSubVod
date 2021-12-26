import formatViews from './index'

describe('formatViews', () => {
  it('should format views with hundreds', () => {
    const views = 123

    expect(formatViews(views)).toBe('123')
  })

  it('should format views with thousands', () => {
    const views = 12_345

    expect(formatViews(views)).toBe('12.3k')
  })

  it('should format views with millions', () => {
    const views = 1_234_567

    expect(formatViews(views)).toBe('1.2m')
  })

  it('should format views with billions', () => {
    const views = 1_234_567_890

    expect(formatViews(views)).toBe('1.2b')
  })

  it('should format views with hundreds and custom viewText', () => {
    const views = 123
    const viewText = 'views'

    expect(formatViews(views, viewText)).toBe('123 views')
  })

  it('should format views with thousands and custom viewText', () => {
    const views = 12_345
    const viewText = 'views'

    expect(formatViews(views, viewText)).toBe('12.3k views')
  })

  it('should format views with millions and custom viewText', () => {
    const views = 1_234_567
    const viewText = 'views'

    expect(formatViews(views, viewText)).toBe('1.2m views')
  })

  it('should format views with billions and custom viewText', () => {
    const views = 1_234_567_890
    const viewText = 'views'

    expect(formatViews(views, viewText)).toBe('1.2b views')
  })
})
