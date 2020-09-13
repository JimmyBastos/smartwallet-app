import styled, { css } from 'styled-components/native'

import FeatherIcon from 'react-native-vector-icons/Feather'

import PropTypes from 'prop-types'

export const Container = styled.View`
  width: 100%;
  margin-bottom: 2px;
`

export const InputField = styled.View`
  background: ${props => props.theme.colors.foreground};
  padding: 0 16px;
  width: 100%;
  height: 64px;

  flex-direction: row;
  align-items: center;

  border-radius: 8px;
  border-width: 2px;
  border-color: ${props => props.theme.colors.foreground};

  ${props => props.hasError && css`
      border-color: ${props.theme.colors.error};
  `}

  ${props => props.isFocused && css`
      border-color: ${props.theme.colors.primary};
  `}
`

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.font.medium};
`

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`

export const ErrorMessage = styled.Text`
  width: 100%;
  padding: 0 2px;
  font-size: 11px;
  color: ${props => props.theme.colors.error};
  font-family: ${props => props.theme.font.medium};
`

Container.propTypes = {
  isFilled: PropTypes.bool,
  isFocused: PropTypes.bool,
  hasError: PropTypes.bool
}
