import axios from 'axios'
import { getDeletedVodUrls } from './index'

jest.mock('axios')

beforeEach(() => {
  jest.resetModules()

  // @ts-ignore
  process.env = {
    TWITCH_HOSTS: 'https://host1.com/,https://host2.com/',
  }
})

describe('getDeletedVodUrls', () => {
  it('should return one link', async () => {
    // mock axios.head to return 200 or 304
    ;(axios.head as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ data: { status: 200 } }),
    )

    const urls = await getDeletedVodUrls({
      streamerName: 'mr_cow',
      vodId: 1,
      vodDate: '2021-12-31T13:03:32Z',
    })

    expect(urls).toEqual([
      'https://host1.com//ceed04112bc589ad6990_mr_cow_1_1640955812/chunked/index-dvr.m3u8',
    ])
  })

  it('should return two links', async () => {
    // mock axios.head to return 200 or 304
    ;(axios.head as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ data: { status: 200 } }),
    )
    ;(axios.head as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ data: { status: 200 } }),
    )

    const urls = await getDeletedVodUrls({
      streamerName: 'mr_cow',
      vodId: 1,
      vodDate: '2021-12-31T13:03:32Z',
    })

    expect(urls).toEqual([
      'https://host1.com//ceed04112bc589ad6990_mr_cow_1_1640955812/chunked/index-dvr.m3u8',
      'https://host2.com//ceed04112bc589ad6990_mr_cow_1_1640955812/chunked/index-dvr.m3u8',
    ])
  })

  it('should return empty array', async () => {
    // mock axios.head to return 404
    ;(axios.head as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: { status: 403 } }),
    )

    const urls = await getDeletedVodUrls({
      streamerName: 'mr_cow',
      vodId: 1,
      vodDate: '2021-12-31T13:03:32Z',
    })

    expect(urls).toEqual([])
  })

  it('should throw if date is not valid', async () => {
    await expect(
      getDeletedVodUrls({
        streamerName: 'mr_cow',
        vodId: 1,
        vodDate: 'invalid date',
      }),
    ).rejects.toThrow()
  })

  it('should throw if streamerName is not valid', async () => {
    await expect(
      getDeletedVodUrls({
        streamerName: '',
        vodId: 1,
        vodDate: '2021-12-31T13:03:32Z',
      }),
    ).rejects.toThrow()
  })

  it('should throw if vodId is not valid', async () => {
    await expect(
      getDeletedVodUrls({
        streamerName: 'mr_cow',
        vodId: 0,
        vodDate: '2021-12-31T13:03:32Z',
      }),
    ).rejects.toThrow()
  })

  it('should throw if vodDate is not valid', async () => {
    await expect(
      getDeletedVodUrls({
        streamerName: 'mr_cow',
        vodId: 1,
        vodDate: '',
      }),
    ).rejects.toThrow()
  })
})
