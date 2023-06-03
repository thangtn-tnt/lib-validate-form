/* eslint-disable react/prop-types */
import React from 'react'

export default function FormInput({ ...props }) {
  const { type, config, value, changed, errorMessage, label } = props
  let inputElement = null
  switch (type) {
    case 'input':
      inputElement = <input {...config} value={value} onChange={changed} />
      break

    case 'select':
      inputElement = (
        <select>
          {config.options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )
      break

    default:
      inputElement = <input {...config} value={value} onChange={changed} />
      break
  }

  return (
    <div>
      <label> {label} </label>
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        {inputElement}
        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
      </div>
    </div>
  )
}
