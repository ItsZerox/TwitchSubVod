import { usePlayerContext } from '@vime/react'
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react'

interface IHandleKeyboard {
  setAnimation: Dispatch<SetStateAction<string | null>>
  handleTrigger: () => void
  player: RefObject<HTMLVmPlayerElement>
}

const HandleKeyboard = ({
  setAnimation,
  handleTrigger,
  player,
}: IHandleKeyboard) => {
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
    setAnimation(`🔊 ${volume + 10}%`)
    handleTrigger()
  }

  const onVolumeDown = () => {
    if (volume <= 0) return
    setVolume(volume - 10)
    setAnimation(`🔉 ${volume - 10}%`)
    handleTrigger()
  }

  const onToggleMute = () => {
    setIsMuted(!isMuted)
    isMuted ? setAnimation('🔈') : setAnimation('🔇')
    handleTrigger()
  }

  const onToggleFullscreen = () => {
    setAnimation('🔍')
    handleTrigger()

    player.current?.isFullscreenActive
      ? player.current?.exitFullscreen()
      : player.current?.enterFullscreen()
  }

  const onToggleMiniplayer = () => {
    setAnimation('💻')
    handleTrigger()

    player.current?.isPiPActive
      ? player.current?.exitPiP()
      : player.current?.enterPiP()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyActions = {
        ArrowLeft: onSeekBackward,
        ArrowRight: onSeekForward,
        ArrowUp: onVolumeUp,
        ArrowDown: onVolumeDown,
        ' ': onTogglePlay,
        k: onTogglePlay,
        m: onToggleMute,
        f: onToggleFullscreen,
        p: onToggleMiniplayer,
      }

      if (keyActions[e.key as keyof typeof keyActions]) {
        keyActions[e.key as keyof typeof keyActions]()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
