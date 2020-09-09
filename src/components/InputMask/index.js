import React, { useState, useCallback } from 'react'

import { TextInputMask } from 'react-native-masked-text'

import Input from '../Input'

import PropTypes from 'prop-types'

const InputMask = React.forwardRef(
  ({ type, ...rest }, ref) => {
    const [value, setValue] = useState('')
    const [rawValue, setRawValue] = useState('')

    const handleOnChangeText = useCallback((maskedValue, unmaskedValue) => {
      setValue(maskedValue)
      setRawValue(unmaskedValue)
    }, [])

    return (
      <TextInputMask
        type={type}
        includeRawValueInChangeText
        value={value}
        onChangeText={handleOnChangeText}
        customTextInput={Input}
        customTextInputProps={{
          ref,
          rawValue,
          ...rest
        }}
        {...rest}
      />
    )
  }
)

InputMask.displayName = 'InputMask'

InputMask.propTypes = {
  type: PropTypes.string.isRequired
}

export default InputMask
