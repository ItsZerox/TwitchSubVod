import { usePlayerContext } from '@vime/react'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

interface IHandleKeyboard {
  setAnimation: Dispatch<SetStateAction<string | null>>
  handleTrigger: () => void
}

const HandleKeyboard = ({ setAnimation, handleTrigger }: IHandleKeyboard) => {
  if (typeof window !== 'undefined') {
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        e.preventDefault()
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
      }
    })
  }

  const ref = useRef(null)

  const [currentTime, setCurrentTime] = usePlayerContext(ref, 'currentTime', 0)
  const [duration] = usePlayerContext(ref, 'duration', -1)
  const [isPaused, setIsPaused] = usePlayerContext(ref, 'paused', false)
  const [volume, setVolume] = usePlayerContext(ref, 'volume', 50)
  const [isMuted, setIsMuted] = usePlayerContext(ref, 'muted', false)

  const onSeekBackward = () => {
    if (currentTime < 5) return
    setCurrentTime(currentTime - 5)
    setAnimation('-5s')
    handleTrigger()
  }

  const onSeekForward = () => {
    if (currentTime > duration - 5) return
    setCurrentTime(currentTime + 5)
    setAnimation('+5s')
    handleTrigger()
  }

  const onTogglePlay = () => {
    setIsPaused(!isPaused)
    isPaused ? setAnimation('▶') : setAnimation('⏸')
    handleTrigger()
  }

  const onVolumeUp = () => {
    if (volume >= 100) return
    setVolume(volume + 10)
    setAnimation('🔊')
    handleTrigger()
  }

  const onVolumeDown = () => {
    if (volume <= 0) return
    setVolume(volume - 10)
    setAnimation('🔉')
    handleTrigger()
  }

  const onToggleMute = () => {
    setIsMuted(!isMuted)
    isMuted ? setAnimation('🔈') : setAnimation('🔇')
    handleTrigger()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key)
      if (e.key === 'ArrowLeft') {
        onSeekBackward()
      }

      if (e.key === 'ArrowRight') {
        onSeekForward()
      }

      if (e.key === ' ') {
        onTogglePlay()
      }

      if (e.key === 'ArrowUp') {
        onVolumeUp()
      }

      if (e.key === 'ArrowDown') {
        onVolumeDown()
      }

      if (e.key === 'm') {
        onToggleMute()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentTime, duration])

  return (
    <div
      ref={ref}
      className="keyboard-handler"
      style={{ flex: 1, height: '100%' }}
    />
  )
}

export default HandleKeyboard
