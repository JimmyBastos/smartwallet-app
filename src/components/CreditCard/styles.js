
import styled from 'styled-components'

import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextMask } from 'react-native-masked-text'

export const Card = styled.ImageBackground`
  height: 200px;
  padding: 16px;
  justify-content: space-between;
`

export const Brand = styled.Text`
  color: #fff;
  font-size: 14px;
  font-family: ${({ theme }) => theme.font.medium};
`

export const SpacedRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Action = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-left: 16px;
`

export const ActionText = styled.Text`
  font-family: ${({ theme }) => theme.font.regular};
  color: #fff;
  margin-right: 10px;
  padding-top: 3px;
`

export const CardNumber = styled(TextMask)`
  font-family: ${({ theme }) => theme.font.semibold};
  font-size: 22px;
  letter-spacing: 4px;
  color: #fff;
`

export const OwnerName = styled.Text`
  font-size: 15px;
  letter-spacing: 2px;
  font-family: ${({ theme }) => theme.font.medium};
  color: #fff;
  text-transform: uppercase;
  flex:7;
`

export const ExpirationDate = styled.Text`
  flex: 1;
  color: #fff;
  alignSelf: flex-start;
`
