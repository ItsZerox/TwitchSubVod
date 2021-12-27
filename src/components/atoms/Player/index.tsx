import * as S from './styles'

import { Player as VimePlayer, Hls, DefaultUi } from '@vime/react'
import { HTMLAttributes } from 'react'

interface PlayerProps {
  url?: string
  poster?: string
}

const Player = ({ url, poster }: PlayerProps) => {
  const hlsConfig = {
    enableWorker: true,
    maxBufferLength: 60,
    xhrSetup: (xhr: XMLHttpRequest, url: string) => {
      xhr.open('GET', url.replace('unmuted.ts', 'muted.ts'), true)
    },
  }

  return (
    <VimePlayer theme="dark">
      <Hls poster={poster} config={hlsConfig}>
        <source data-src={url} />
      </Hls>

      <DefaultUi />
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
