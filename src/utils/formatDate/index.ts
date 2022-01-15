const formatDate = (date?: Date | string, locale?: string): string => {
  if (!date) {
    return ''
  }

  const dateObj = new Date(date)

  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default formatDate
