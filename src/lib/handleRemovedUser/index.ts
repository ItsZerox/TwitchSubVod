import revalidate from '~/constants/revalidate'
import { poguApi } from '~/services/config'

const handleRemovedUser = async (streamerName: string) => {
  const { data } = await poguApi.get(`/get-removed-streamer/${streamerName}`)
  const { isDeleted } = data || {}

  const removedUsers =
    process.env.NEXT_PUBLIC_REMOVED_STREAMERS?.split(',') || []
  const isUserRemoved = removedUsers.includes(streamerName?.toLowerCase())

  if (isUserRemoved || isDeleted) {
    return {
      revalidate: revalidate.videos * 100,
      props: {
        videos: [
          {
            streamerInformation: {
              displayName: streamerName,
              name: streamerName,
              logo: '',
              followers: 0,
              description: '',
            },
            vodInformation: {},
          },
        ],
        isUserRemoved: true,
      },
    }
  }

  return {
    continue: true,
  }
}

export default handleRemovedUser
