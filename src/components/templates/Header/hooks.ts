import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import useDebounce from '~/hooks/useDebounce'

export const useHeader = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [options, setOptions] = useState([])
  const debouncedOptions = useDebounce(options, 500)

  const router = useRouter()

  useEffect(() => {
    // fetch autocomplete data and set it to options
  }, [debouncedOptions])

  useEffect(() => {
    if (router.asPath === `/videos/${search}`) {
      setIsLoading(false)
    }
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
      router.push({
        pathname: `/videos/${search}`,
      })
    }
  }

  return {
    search,
    options: debouncedOptions,
    handleSearch,
    handleSubmit,
    isLoading,
  }
}
