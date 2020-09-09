import styled from 'styled-components/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import Button from '../../components/Button'

export const Container = styled.View`
  flex: 1;
  padding: 0 32px 32px;
`

export const Title = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.font.medium};
  margin: 24px 0 24px;
`

export const ForgotPasswordText = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 16px;
  font-family: ${props => props.theme.font.medium};
`

export const CreateParcelButton = styled(Button)`
  padding: 16px 0 ${16 + getBottomSpace()}px;
`
