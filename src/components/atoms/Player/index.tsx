import * as S from './styles'

import {
  Player as VimePlayer,
  Hls,
  DefaultUi,
  DefaultControls,
  DefaultSettings,
} from '@vime/react'
import { HTMLAttributes } from 'react'
import { getCors } from '~/utils/getCors'
import TapSidesToSeek from './lib/TabSidesToSeek'

interface PlayerProps {
  url?: string
  poster?: string
}

const getRealHLSUrl = (url: string) => {
  const cleanUrl = url.replace('unmuted.ts', 'muted.ts')

  if (cleanUrl.includes(getCors())) {
    // return cleanUrl if cors has already been added
    return cleanUrl
  }

  return cleanUrl.replace('https://', `${getCors()}https://`)
}

const Player = ({ url, poster }: PlayerProps) => {
  const hlsConfig = {
    enableWorker: true,
    maxBufferLength: 60,
    xhrSetup: (xhr: XMLHttpRequest, url: string) => {
      xhr.open('GET', getRealHLSUrl(url), true)
    },
  }

  return (
    <VimePlayer theme="dark">
      <Hls poster={poster} config={hlsConfig}>
        <source data-src={url} />
      </Hls>

      <DefaultUi noControls>
        <TapSidesToSeek />
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
