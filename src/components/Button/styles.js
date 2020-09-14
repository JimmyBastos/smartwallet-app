import styled from 'styled-components/native'

import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
  height: 56px;
  padding: 0 36px;
  background: ${props => props.theme.colors.primary};
  border-radius: 8px;

  justify-content: center;
  align-items: center;
`

export const ButtonText = styled.Text`
  font-family: ${props => props.theme.font.medium};
  color: #fff;
  font-size: 18px;
`
