import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useField } from '@unform/core'
import NativeCheckBox from '@react-native-community/checkbox'
import PropTypes from 'prop-types'

import { Container, Label } from './styles'

const CheckBox = React.forwardRef(
  ({ name, label }) => {
    const { fieldName, registerField, defaultValue = false } = useField(name)

    const inputRef = useRef({ value: defaultValue })

    const [checkboxValue, setCheckboxValue] = useState(defaultValue)

    const handleToggleOption = useCallback(setCheckboxValue, [])

    useEffect(() => {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
        getValue: (input) => {
          return checkboxValue
        },
        clearValue: () => {
          setCheckboxValue(defaultValue)
        },
        setValue: (_, value) => {
          setCheckboxValue(value)
        }
      })
    }, [fieldName, checkboxValue, defaultValue, registerField])

    return (
      <Container>
        <NativeCheckBox
          value={checkboxValue}
          onValueChange={handleToggleOption}
          ref={inputRef}
        />
        <Label>{label}</Label>
      </Container>
    )
  }
)

CheckBox.displayName = 'CheckBox'

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default CheckBox
