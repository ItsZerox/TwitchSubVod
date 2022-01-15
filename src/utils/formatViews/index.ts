const formatViews = (views?: number, viewText?: string) => {
  if (!views) {
    return ''
  }

  const viewTextFinal = viewText ? ` ${viewText}` : ''

  if (views < 1000) {
    return `${views}${viewTextFinal}`
  } else if (views >= 1000 && views < 1000000) {
    const thousands = views / 1000
    const roundedThousands = Math.round(thousands * 10) / 10

    return `${roundedThousands}k${viewTextFinal}`
  } else if (views >= 1000000 && views < 1000000000) {
    const millions = views / 1000000
    const roundedMillions = Math.round(millions * 10) / 10

    return `${roundedMillions}m${viewTextFinal}`
  } else if (views >= 1000000000) {
    const billions = views / 1000000000
    const roundedBillions = Math.round(billions * 10) / 10

    return `${roundedBillions}b${viewTextFinal}`
  }
}

export default formatViews
