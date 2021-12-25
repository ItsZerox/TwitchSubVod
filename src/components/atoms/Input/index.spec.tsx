import { render, screen, act, fireEvent } from '~/lib/testUtils'
import userEvent from '@testing-library/user-event'
import { IoSearch } from 'react-icons/io5'

import { darkTheme } from '~/layout/theme'
import Input from '.'
import 'jest-styled-components'

describe('Input component', () => {
  it('should render correctly', () => {
    render(
      <Input placeholder="Search..." id="search-bar" aria-label="Search" />,
    )

    const input = screen.getByPlaceholderText('Search...')
    expect(input).toBeInTheDocument()
    expect(input).toHaveStyleRule('color', '#FFFFFF')
  })

  it('should render correctly with an icon on the left', () => {
    render(
      <Input
        icon={<IoSearch />}
        iconPosition="left"
        placeholder="Search..."
        id="search-bar"
        aria-label="Search"
      />,
    )

    const label = screen.getByLabelText('Search')
    const icon = screen.getByTestId('icon-search-bar')

    expect(label).toBeInTheDocument()

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveStyleRule('margin-left', '0')
    expect(icon).toHaveStyleRule('margin-right', '8px')
  })

  it('should render correctly with an icon on the right', () => {
    render(
      <Input
        icon={<IoSearch />}
        iconPosition="right"
        placeholder="Search..."
        id="search-bar"
        aria-label="Search"
      />,
    )

    const label = screen.getByLabelText('Search')
    const icon = screen.getByTestId('icon-search-bar')

    expect(label).toBeInTheDocument()

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveStyleRule('margin-left', '8px')
    expect(icon).toHaveStyleRule('margin-right', '0')
  })

  it('should focus input when label is clicked', () => {
    render(
      <Input
        icon={<IoSearch />}
        iconPosition="left"
        placeholder="Search..."
        id="search-bar"
        aria-label="Search"
      />,
    )

    const label = screen.getByTestId('label-search-bar')
    const input = screen.getByPlaceholderText('Search...')

    expect(label).toBeInTheDocument()

    expect(label).toHaveStyleRule(
      'border',
      `1px solid ${darkTheme.colors.grey800}`,
    )

    act(() => {
      userEvent.tab()
    })

    expect(input).toHaveFocus()
    expect(label).not.toHaveFocus()
  })

  it('should trigger onChange', () => {
    const onChange = jest.fn()
    render(
      <Input
        onChange={onChange}
        placeholder="Search..."
        id="search-bar"
        aria-label="Search"
      />,
    )

    act(() => {
      userEvent.type(screen.getByPlaceholderText('Search...'), 'Hello')
    })

    expect(onChange).toHaveBeenCalledTimes(5)
  })

  it('should trigger onSubmit', () => {
    const onSubmit = jest.fn()
    render(
      <Input
        onSubmit={onSubmit}
        placeholder="Search..."
        id="search-bar"
        aria-label="Search"
      />,
    )

    act(() => {
      fireEvent.submit(screen.getByPlaceholderText('Search...'))
    })

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
