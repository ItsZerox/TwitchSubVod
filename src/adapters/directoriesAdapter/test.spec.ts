import { playedGamesAdapter } from './index'

describe('playedGamesAdapter', () => {
  const data = 'name|url|image'
  const multipleData = 'name|url|image|name|url|image'

  it('should convert string to object array', () => {
    expect(playedGamesAdapter(data)).toEqual([
      {
        name: 'name',
        image: 'image',
      },
    ])
  })

  it('should convert string with multiple values to object array', () => {
    expect(playedGamesAdapter(multipleData)).toEqual([
      {
        name: 'name',
        image: 'image',
      },
      {
        name: 'name',
        image: 'image',
      },
    ])
  })
})
