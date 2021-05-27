import { formatNumberWithComa, isArrayEmpty, isObjectEmpty } from './utility'

export const getPrice = async (eventObj, $axios) => {
  let price

  if (!eventObj.is_free && !eventObj.is_sold_out) {
    const response = await $axios.get(`ticket-types/events/${eventObj.id}`)

    if (!isArrayEmpty(response.data.data)) {
      const currency = response.data.data[0].currency
      const maxValue = response.data.data.sort((a, b) => b.price - a.price)[0]
        .price
      const minValue = response.data.data.sort((a, b) => a.price - b.price)[0]
        .price

      price = `${currency}${formatNumberWithComa(
        minValue
      )} - ${currency}${formatNumberWithComa(maxValue)}`
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

export const transformPostData = (form, socialLinks, userTags) => ({
  ...form,
  num_of_tickets: Number(form.num_of_tickets),
  is_free: Number(form.is_free),
  social_links: socialLinks,
  tags: userTags.join(', '),
})

export const isFeedbackSuccess = (data) => {
  return data && !isObjectEmpty(data) && data.status === 'success'
}

export const getLocalStoreItem = (prop, defaultValue) => {
  if (process.client) {
    if (defaultValue) {
      return localStorage.getItem(prop)
        ? JSON.parse(localStorage.getItem(prop))
        : defaultValue
    }

    return localStorage.getItem(prop)
  }
}

export const updateLocalStorage = (prop, payload) => {
  if (process.client) {
    return localStorage.setItem(prop, JSON.stringify(payload))
  }
}

export const deletLocalStoreItem = (prop) => {
  if (process.client) {
    return localStorage.removeItem(prop)
  }
}

export const clearLocalStorage = () => {
  if (process.client) {
    return localStorage.clear()
  }
}
