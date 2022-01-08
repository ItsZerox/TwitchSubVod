import {
  Player as VimePlayer,
  Hls,
  DefaultUi,
  DefaultControls,
  DefaultSettings,
} from '@vime/react'
import { HTMLAttributes, useRef } from 'react'
import { getCors } from '~/utils/getCors'
import TapSidesToSeek from './lib/TabSidesToSeek'
import HandleKeyboard from './lib/HandleKeyboard'
import * as S from './styles'
import { useVideo } from './lib/hooks'
import '@vime/core/themes/default.css'

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
  const player = useRef<HTMLVmPlayerElement>(null)

  const { animation, triggerAnimation, setAnimation, handleTrigger } =
    useVideo()

  const hlsConfig = {
    enableWorker: true,
    maxBufferLength: 60,
    xhrSetup: (xhr: XMLHttpRequest, url: string) => {
      xhr.open('GET', getRealHLSUrl(url), true)
    },
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
