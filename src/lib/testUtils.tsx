import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { darkTheme } from '~/layout/theme'
import GlobalProvider from '~/contexts/GlobalContext'

const AllTheProviders: FC = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalProvider locale={'en'}>{children}</GlobalProvider>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
