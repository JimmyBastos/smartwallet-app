import styled, { css } from 'styled-components/native'

import FeatherIcon from 'react-native-vector-icons/Feather'

import PropTypes from 'prop-types'

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  border-radius: 8px;
  margin-bottom: 8px;
  background: ${props => props.theme.colors.foreground};

  border-width: 2px;
  border-color: ${props => props.theme.colors.foreground};

  ${props => props.hasError && css`
      border-color: ${props.theme.colors.error};
  `}

  ${props => props.isFocused && css`
      border-color: ${props.theme.colors.primary};
  `}

  flex-direction: row;
  align-items: center;
`

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  font-family: ${props => props.theme.font.medium};
`

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`

Container.propTypes = {
  isFilled: PropTypes.bool,
  isFocused: PropTypes.bool,
  hasError: PropTypes.bool
}
