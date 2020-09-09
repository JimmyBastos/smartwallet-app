import styled from 'styled-components/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 32px 140px;
`

export const Title = styled.Text`
  margin: 56px 0 24px;
  font-size: 24px;
  color:${props => props.theme.colors.primary};
  font-family: ${props => props.theme.font.medium};
`

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-top-width: 1px;
  border-color: #DADADA;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const BackToSignInText = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 18px;
  font-family: ${props => props.theme.font.regular};
  margin-left: 16px;
`
