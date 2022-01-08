import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { usePlayerContext } from '@vime/react'
import * as S from './styles'

interface TapSidesToSeekProps {
  animation: string | null
  setAnimation: Dispatch<SetStateAction<string | null>>
  handleTrigger: () => void
  triggerAnimation: number
}

const TapSidesToSeek = ({
  animation,
  setAnimation,
  handleTrigger,
  triggerAnimation,
}: TapSidesToSeekProps) => {
  const ref = useRef(null)

  const [currentTime, setCurrentTime] = usePlayerContext(ref, 'currentTime', 0)
  const [duration] = usePlayerContext(ref, 'duration', -1)
  const [lastClickTime, setLastClickTime] = useState(Date.now())

  const onSeekBackward = () => {
    const now = Date.now()
    const timeDiff = now - lastClickTime
    setLastClickTime(now)

    if (timeDiff < 500) {
      setAnimation('-5s')
      if (currentTime < 5) return
      setCurrentTime(currentTime - 5)
      handleTrigger()
    }
  }

  const onSeekForward = () => {
    const now = Date.now()
    const timeDiff = now - lastClickTime
    setLastClickTime(now)

    if (timeDiff < 500) {
      setAnimation('+5s')
      if (currentTime > duration - 5) return
      setCurrentTime(currentTime + 5)
      handleTrigger()
    }
  }

  return (
    <S.TapSidesContainer ref={ref}>
      <S.TapSidesTarget className="tapTarget" onClick={onSeekBackward} />

      <div style={{ flex: 1 }}>
        <S.Animation key={triggerAnimation}>{animation}</S.Animation>
      </div>

      <S.TapSidesTarget className="tapTarget" onClick={onSeekForward} />
    </S.TapSidesContainer>
  )
}

export default TapSidesToSeek
