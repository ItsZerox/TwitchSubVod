import * as S from './styles'

import { Player as VimePlayer, Hls, DefaultUi } from '@vime/react'
import { VideoUrl } from '~/@types/VideoUrl'
import { useState } from 'react'

interface PlayerProps {
  urls?: VideoUrl[]
  poster?: string
}

const Player = ({ urls, poster }: PlayerProps) => {
  const hlsConfig = {
    enableWorker: true,
    maxBufferLength: 60,
    xhrSetup: (xhr: XMLHttpRequest, url: string) => {
      xhr.open('GET', url.replace('unmuted.ts', 'muted.ts'), true)
    },
  }

  if (!urls?.length) return null

  return (
    <VimePlayer theme="dark">
      <Hls poster={poster} config={hlsConfig}>
        <source data-src={process.env.NEXT_PUBLIC_CORS + urls[0].url} />
      </Hls>

      <DefaultUi />
    </VimePlayer>
  )
}

export default Player
