import { useContext, createContext } from 'react'
import en from '~/locales/en'
import es from '~/locales/es'
import fr from '~/locales/fr'
import pt from '~/locales/pt'

interface GlobalContextProps {
  locale: string
  availableLocales: string[]
  texts: typeof en
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

  const context: GlobalContextProps = {
    locale,
    availableLocales,
    texts,
  }

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  )
}

export default GlobalProvider

export const useGlobal = () => useContext(GlobalContext)
