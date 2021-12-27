import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { ISearchChannel } from '~/@types/ISearchChannel'
import { searchChannelsAdapter } from '~/adapters/searchChannelsAdapter'
import useDebounce from '~/hooks/useDebounce'
import { searchChannels } from '~/services/api/searchChannels'

export const useHeader = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [options, setOptions] = useState<ISearchChannel[]>([])
  const debouncedSearch = useDebounce(search, 250)

  const router = useRouter()

  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true)
      const response = await searchChannels(search)
      const autoCompleteData = searchChannelsAdapter(response)
      setOptions(autoCompleteData)
      setIsLoading(false)
    }

    if (search) {
      fetchOptions()
    }
  }, [debouncedSearch])

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
    options,
    handleSearch,
    handleSubmit,
    isLoading,
  }
}
