export const checkValidation = ({ placeholder, value }, rules) => {
  let isValid = true
  let error = null
  let pattern = /[/<>+*¿?'`=$%&()!#|]/
  if (!rules) {
    return {
      isValid,
      error
    }
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid
    if (!isValid) {
      error = `${placeholder} is required`
    }
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
    if (!isValid) {
      error = `${placeholder} should minimum ${rules.minLength} characters `
    }
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
    if (!isValid) {
      error = `${placeholder} should maximum ${rules.minLength} characters`
    }
  }

  if (rules.isEmail) {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    isValid = pattern.test(value) && isValid
    if (!isValid) {
      error = `${placeholder} is not valid`
    }
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/
    isValid = pattern.test(value) && isValid
    if (!isValid) {
      error = `${placeholder} isn't a number`
    }
  }

  if (pattern.test(value)) {
    isValid = false
    error = `${placeholder} has characters not permit`
  }

  return {
    isValid,
    error
  }
}
