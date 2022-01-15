import revalidate from '~/constants/revalidate'

const handleRemovedUser = (streamerName: string) => {
  const removedUsers =
    process.env.NEXT_PUBLIC_REMOVED_STREAMERS?.split(',') || []
  const isUserRemoved = removedUsers.includes(streamerName?.toLowerCase())

  if (isUserRemoved) {
    return {
      revalidate: revalidate.videos,
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
        isUserRemoved,
      },
    }
  }

  return {
    continue: true,
  }
}

export default handleRemovedUser
