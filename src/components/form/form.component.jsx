import React from 'react'
import fieldsForm from '../form/json/field.json'
import useForm from '../../hooks/useForm'
import FormInput from '../../components/form/form-input/form-input.component'

export default function Form() {
  const [renderElementsForm, formIsValid, handlerOnChangeForm] = useForm(...fieldsForm)

  const renderForm = () => {
    let form = (
      <>
        <form>
          {renderElementsForm().map((item) => (
            <FormInput
              key={item.id}
              label={item.config.label}
              type={item.config.type}
              config={item.config.config}
              value={item.config.value}
              changed={(ev) => handlerOnChangeForm(ev, item.id)}
              errorMessage={item.config.errorMessage}
            />
          ))}
          <button disabled={!formIsValid} type='button'>
            Submit
          </button>
        </form>
      </>
    )

    return form
  }

  return <div className='container'>{renderForm()}</div>
}
