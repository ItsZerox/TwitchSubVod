import {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { ILoadEmotes } from '~/@types/ILoadEmotes'
import { BadgeSets } from '~/@types/ITwitchBadges'
import en from '~/locales/en'
import es from '~/locales/es'
import fr from '~/locales/fr'
import pt from '~/locales/pt'

interface IEmotes {
  bttvEmotes: ILoadEmotes[]
  ffzEmotes: ILoadEmotes[]
  sevenTvEmotes: ILoadEmotes[]
}

interface GlobalContextProps {
  locale: string
  availableLocales: string[]
  texts: typeof en
  emotes: IEmotes
  setEmotes: Dispatch<SetStateAction<IEmotes>>
  badges: BadgeSets | null
  setBadges: Dispatch<SetStateAction<BadgeSets | null>>
}

const GlobalContext = createContext({} as GlobalContextProps)

interface GlobalProviderProps {
  locale: string
  children: React.ReactNode
}

const GlobalProvider = ({ locale, children }: GlobalProviderProps) => {
  const locales = { en, es, fr, pt }
  const texts = locales[locale as keyof typeof locales] || en
  const availableLocales = Object.keys(locales)
  const [badges, setBadges] = useState<BadgeSets | null>(null)
  const [emotes, setEmotes] = useState<IEmotes>({
    bttvEmotes: [],
    ffzEmotes: [],
    sevenTvEmotes: [],
  })

  const context: GlobalContextProps = {
    locale,
    availableLocales,
    texts,
    emotes,
    setEmotes,
    badges,
    setBadges,
  }

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  )
}

export default GlobalProvider

export const useGlobal = () => useContext(GlobalContext)
