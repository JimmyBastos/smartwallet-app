import React, {
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
  useImperativeHandle
} from 'react'

import { View } from 'react-native'

import PropTypes from 'prop-types'

import {
  Container,
  InputField,
  TextInput,
  Icon,
  ErrorMessage
} from './styles'

import { useField } from '@unform/core'
import { ThemeContext } from 'styled-components'

const Input = React.forwardRef(
  ({ name, icon, style, rawValue = '', onChangeText, ...props }, ref) => {
    const theme = useContext(ThemeContext)

    const {
      registerField,
      defaultValue = '',
      fieldName,
      error
    } = useField(name)

    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    const inputRef = useRef({ value: defaultValue })

    const handleOnChange = useCallback(text => {
      if (inputRef.current) inputRef.current.value = text
      if (onChangeText) onChangeText(text)
    }, [onChangeText])

    const handleInputFocus = useCallback(() => {
      setIsFocused(true)
    }, [setIsFocused])

    const handleInputBlur = useCallback(() => {
      setIsFocused(false)
      setIsFilled(!!inputRef.current.value)
    }, [setIsFocused])

    useImperativeHandle(ref, () => ({
      focus () {
        inputRef.current.focus()
      }
    }))

    useEffect(() => {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
        getValue (input) {
          return rawValue || input.value
        },
        setValue (input, value) {
          inputRef.current.value = value
          inputRef.current.setNativeProps({
            text: value
          })
        },
        clearValue () {
          inputRef.current.value = ''
          inputRef.current.clar()
        }
      })
    }, [registerField, rawValue, fieldName, inputRef])

    return (
      <Container
        style={style}
      >
        <InputField
          isFocused={isFocused}
          isFilled={isFilled}
          hasError={!!error}
        >
          <Icon
            name={icon}
            size={20}
            color={isFocused || isFilled ? theme.colors.primary : theme.colors.text }
          />

          <TextInput
            ref={inputRef}
            placeholderTextColor={theme.colors.text}
            defaultValue={defaultValue}
            onChangeText={handleOnChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            {...props}
          />

        </InputField>

        <ErrorMessage>
          {error}
        </ErrorMessage>
      </Container>
    )
  }
)

Input.displayName = 'Input'

Input.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.any,
  rawValue: PropTypes.any,
  focus: PropTypes.func,
  onChangeText: PropTypes.func
}

export default Input
