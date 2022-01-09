import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import useDebounce from '~/hooks/useDebounce'

export const useHeader = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 1000)

  const router = useRouter()

  useEffect(() => {
    router.prefetch(`videos/${search}`)
  }, [debouncedSearch])

  useEffect(() => {
    if (router.asPath === `/videos/${search}`) {
      setIsLoading(false)
      setSearch('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
    },
    [setSearch],
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()

    const elements = e.currentTarget.elements as HTMLFormControlsCollection & {
      search: HTMLInputElement
    }

    const search = elements.search.value

    if (!!search.length) {
      router.push(`/videos/${search}`)

      elements.search.blur()
    }
  }

  return {
    search,
    handleSearch,
    handleSubmit,
    isLoading,
  }
}
