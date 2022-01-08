import { useState } from 'react'

export const useVideo = () => {
  const [animation, setAnimation] = useState<string | null>(null)
  const [triggerAnimation, setTriggerAnimation] = useState(0)

  const handleTrigger = () => {
    setTriggerAnimation((old) => old + 1)
  }

  return {
    animation,
    triggerAnimation,
    setAnimation,
    setTriggerAnimation,
    handleTrigger,
  }
}
