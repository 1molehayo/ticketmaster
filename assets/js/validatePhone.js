// Declaring required variables
// non-digit characters which are allowed in phone numbers
const phoneNumberDelimiters = '()- '
// characters which are allowed in international phone numbers
// (a leading + is OK)
const validWorldPhoneChars = phoneNumberDelimiters + '+'

/**
 * Minimum & Maximum no of digits in an international phone no without the country code.
 *
 * According to Thanks to the international phone numbering plan (ITU-T E.164), phone numbers cannot contain more than
 * 15 digits, and 12 digits without country code. The shortest international phone numbers in use contain seven digits without country code.
 */

const minDigitsInIPhoneNumber = 7
const maxDigitsInIPhoneNumber = 12

const isInteger = (s) => {
  let i
  for (i = 0; i < s.length; i++) {
    // Check that current character is number.
    const c = s.charAt(i)
    if (c < '0' || c > '9') {
      return false
    }
  }
  // All characters are numbers.
  return true
}

const trim = (s) => {
  let i
  let returnString = ''
  // Search through string's characters one by one.
  // If character is not a whitespace, append to returnString.
  for (i = 0; i < s.length; i++) {
    // Check that current character isn't whitespace.
    const c = s.charAt(i)
    if (c !== ' ') {
      returnString += c
    }
  }
  return returnString
}

const stripCharsInBag = (s, bag) => {
  let i
  let returnString = ''
  // Search through string's characters one by one.
  // If character is not in bag, append to returnString.
  for (i = 0; i < s.length; i++) {
    // Check that current character isn't whitespace.
    const c = s.charAt(i)
    if (!bag.includes(c)) {
      returnString += c
    }
  }
  return returnString
}

const checkInternationalPhone = (strPhone) => {
  let bracket = 3

  strPhone = trim(strPhone)

  if (strPhone.indexOf('+') > 1) {
    return false
  }

  if (strPhone.includes('-')) {
    bracket = bracket + 1
  }

  if (strPhone.includes('(') && strPhone.indexOf('(') > bracket) {
    return false
  }

  const brchr = strPhone.indexOf('(')

  if (strPhone.includes('(') && strPhone.charAt(brchr + 2) !== ')') {
    return false
  }

  if (!strPhone.includes('(') && strPhone.includes(')')) {
    return false
  }

  const s = stripCharsInBag(strPhone, validWorldPhoneChars)
  return (
    isInteger(s) &&
    s.length >= minDigitsInIPhoneNumber &&
    s.length <= maxDigitsInIPhoneNumber
  )
}

export default checkInternationalPhone
