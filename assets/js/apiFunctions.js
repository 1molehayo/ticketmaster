import { formatNumberWithComa, isArrayEmpty } from './utility'

export const getPrice = async (eventObj, $axios) => {
  let price

  if (!eventObj.is_free && !eventObj.is_sold_out) {
    const response = await $axios.get(`ticket-types/events/${eventObj.id}`)

    if (!isArrayEmpty(response.data.data)) {
      const maxValue = response.data.data.sort((a, b) => b.price - a.price)[0]
        .price
      const minValue = response.data.data.sort((a, b) => a.price - b.price)[0]
        .price

      price = `\u20A6${formatNumberWithComa(
        minValue
      )} - \u20A6${formatNumberWithComa(maxValue)}`
    } else {
      price = 'N/A'
    }
  }

  return price
}

export const getEventDate = (datetime, moment, isFull = false) => {
  if (datetime) {
    if (isFull) {
      return moment(datetime).format('dddd, MMMM Do YYYY, hh:mm A')
    }

    return moment(datetime).format('Do MMMM YYYY')
  }

  return 'N/A'
}

export const getOptimizedImage = ($vssWidth, image) => {
  if ($vssWidth && image) {
    const urlParams = new URLSearchParams(image)
    urlParams.set('w', `${$vssWidth}`)
    return decodeURIComponent(urlParams.toString())
  }

  return image
}

export const transformPostData = (form, socialLinks) => ({
  ...form,
  num_of_tickets: Number(form.num_of_tickets),
  is_free: Number(form.is_free),
  social_links: socialLinks,
})
