import {
  Player as VimePlayer,
  Hls,
  DefaultUi,
  DefaultControls,
  DefaultSettings,
} from '@vime/react'
import { HTMLAttributes, useEffect, useRef } from 'react'
import { getCors } from '~/utils/getCors'
import { removeCorsFromUrl } from '~/utils/removeCorsFromUrl'
import TapSidesToSeek from './lib/TabSidesToSeek'
import HandleKeyboard from './lib/HandleKeyboard'
import * as S from './styles'
import { useVideo } from './lib/hooks'
import '@vime/core/themes/default.css'
import localStorageKeys, { IWatchedVod } from '~/constants/localStorageKeys'
import timeInSeconds from '~/constants/defaultTime'
import RemovedUser from '~/components/atoms/RemovedUser'

interface PlayerProps {
  url: string
  poster?: string
  title?: string
  streamerName: string
  streamerLogoUrl: string
  thumbnailUrl?: string
  vodId: string
}

const getRealHLSUrl = (url: string) => {
  const cleanUrl = url.replace('unmuted.ts', 'muted.ts')

  const urlWithoutCors = removeCorsFromUrl(cleanUrl)

  return urlWithoutCors.replace('https://', `${getCors()}https://`)
}

const Player = ({
  url,
  poster,
  title,
  streamerName,
  streamerLogoUrl,
  thumbnailUrl,
  vodId,
}: PlayerProps) => {
  const player = useRef<HTMLVmPlayerElement>(null)

  useEffect(() => {
    // use localStorage to forward user to last timestamp
    setTimeout(() => {
      const watchedVods = JSON.parse(
        localStorage.getItem(localStorageKeys.watchedVods) || '0',
      )
      const currentVod = (watchedVods[vodId] as IWatchedVod) || undefined
      const currentVodTime = currentVod ? currentVod.time : 0

      if (player.current && currentVodTime) {
        player.current.currentTime = Number(currentVodTime)
      }
    }, 2000)

    // save vod timestamp in localStorage
    const interval = setInterval(() => {
      const expireDate = new Date().getTime() + timeInSeconds.day * 14 * 1000

      const allWatchedVods = JSON.parse(
        localStorage.getItem(localStorageKeys.watchedVods) || '0',
      )

      localStorage.setItem(
        localStorageKeys.watchedVods,
        JSON.stringify({
          ...allWatchedVods,
          [vodId]: {
            id: vodId,
            time: player.current?.currentTime || 0,
            expireDate,
            title: title || '',
            streamerLogoUrl,
            thumbnailUrl: thumbnailUrl || '',
            streamerName,
          },
        }),
      )
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const { animation, triggerAnimation, setAnimation, handleTrigger } =
    useVideo()

  const hlsConfig = {
    enableWorker: true,
    maxBufferLength: 60,
    xhrSetup: (xhr: XMLHttpRequest, url: string) => {
      xhr.open('GET', getRealHLSUrl(url), true)
    },
  }

  const removedUsers =
    process.env.NEXT_PUBLIC_REMOVED_STREAMERS?.split(',') || []
  const isUserRemoved = removedUsers.includes(streamerName?.toLowerCase())

  if (isUserRemoved) {
    return <RemovedUser streamerName={streamerName} />
  }

  return (
    <VimePlayer theme="dark" ref={player}>
      <Hls poster={poster} config={hlsConfig}>
        <source data-src={url} />
      </Hls>

      <DefaultUi noControls>
        <TapSidesToSeek
          animation={animation}
          setAnimation={setAnimation}
          handleTrigger={handleTrigger}
          triggerAnimation={triggerAnimation}
        />
        <HandleKeyboard
          setAnimation={setAnimation}
          handleTrigger={handleTrigger}
          player={player}
        />
        <DefaultControls hideOnMouseLeave={true} activeDuration={1000} />
        <DefaultSettings />
      </DefaultUi>
    </VimePlayer>
  )
}

const PlayerContainer = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <S.PlayerContainer>
      <S.PlayerWrapper>{children}</S.PlayerWrapper>
    </S.PlayerContainer>
  )
}

export default Player
export { PlayerContainer }
