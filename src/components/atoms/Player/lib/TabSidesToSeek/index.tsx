import React, { useRef, useState } from 'react'
import { usePlayerContext } from '@vime/react'
// @ts-ignore
import * as S from './styles'

const TapSidesToSeek = () => {
  const ref = useRef(null)

  const [currentTime, setCurrentTime] = usePlayerContext(ref, 'currentTime', 0)
  const [duration] = usePlayerContext(ref, 'duration', -1)
  const [lastClickTime, setLastClickTime] = useState(Date.now())
  const [animation, setAnimation] = useState<null | 'left' | 'right'>(null)
  const [triggerAnimation, setTriggerAnimation] = useState(0)

  const onSeekBackward = () => {
    const now = Date.now()
    const timeDiff = now - lastClickTime
    setLastClickTime(now)

    if (timeDiff < 500) {
      setAnimation('left')
      if (currentTime < 5) return
      setCurrentTime(currentTime - 5)
      setTriggerAnimation((old) => old + 1)
    }
  }

  const onSeekForward = () => {
    const now = Date.now()
    const timeDiff = now - lastClickTime
    setLastClickTime(now)

    if (timeDiff < 500) {
      setAnimation('right')
      if (currentTime > duration - 5) return
      setCurrentTime(currentTime + 5)
      setTriggerAnimation((old) => old + 1)
    }
  }

  return (
    <S.TapSidesContainer ref={ref}>
      <S.TapSidesTarget className="tapTarget" onClick={onSeekBackward} />

      <div style={{ flex: 1 }}>
        <S.Animation key={triggerAnimation}>
          {animation && animation === 'left' ? '-5s' : '+5s'}
        </S.Animation>
      </div>

      <S.TapSidesTarget className="tapTarget" onClick={onSeekForward} />
    </S.TapSidesContainer>
  )
}

export default TapSidesToSeek
