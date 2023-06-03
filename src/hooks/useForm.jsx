import { useState } from 'react'
import { checkValidation } from '../utils/validation/validation'

export default function useForm(fieldForm) {
  const [fieldState, setFieldState] = useState({ ...fieldForm })
  const [formIsValid, setFormIsValid] = useState(false)

  const renderElementsForm = () => {
    const formElementsArr = []
    if (fieldState) {
      for (let key in fieldState) {
        formElementsArr.push({
          id: key,
          config: fieldState[key]
        })
      }
    }
    return formElementsArr
  }

  const onSubmitJSON = () => {
    const data = {}
    for (let key in fieldState) {
      data[key] = fieldState[key].value
    }
    return data
  }

  const handlerFormValidation = (form) => {
    let isValidForm = true
    for (let inputElement in form) {
      isValidForm && form[inputElement].valid
    }
    return isValidForm
  }

  const onResetForm = () => {
    setFieldState(fieldForm)
    setFormIsValid(false)
  }

  const handlerOnChangeForm = (e, id) => {
    const validation = checkValidation(e.target, fieldState[id].validation)
    console.log(fieldState[id].validation)
    const formData = {
      ...fieldState,
      [id]: {
        ...fieldState[id],
        value: e.target.value,
        valid: validation.isValid,
        errorMessage: validation.error
      }
    }
    setFieldState(formData)
    setFormIsValid(handlerFormValidation(formData))
  }

  const handlerLoadData = (data) => {
    const loadForm = { ...fieldState }
    for (let formElement in fieldState) {
      loadForm[formElement] = {
        ...fieldState[formElement],
        value: data[formElement] || '',
        valid: true
      }
    }
    setFieldState(loadForm)
    setFormIsValid(true)
  }

  return [renderElementsForm, formIsValid, handlerOnChangeForm, onSubmitJSON, onResetForm, handlerLoadData]
}
