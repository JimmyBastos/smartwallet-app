import styled from 'styled-components/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import Button from '../../components/Button'
import Card from '../../components/Card'

export const Container = styled.View`
  flex: 1;
  padding: 0 32px 32px;
`

export const Header = styled.ImageBackground`
  min-height: 272px;
  margin-bottom: 56px;
`

export const UserInformationContainer = styled.View`
  margin-top: 16px;
  margin-bottom: 32px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const WellcomeMessage = styled.Text`
  text-shadow: -1px 1px 16px rgba(0, 0, 0, 0.2);
  font-size: 24px;
  color: #FFF;
  font-family: ${props => props.theme.font.semibold};
`

export const UserAvatarContainer = styled.View`
  background-color: ${props => props.theme.colors.foreground};
  padding: 3px;
  border-radius: 50px;
`

export const UserAvatarImage = styled.Image`
  background-color: ${props => props.theme.colors.text};
  height: 48px;
  width: 48px;
  border-radius: 50px;
`

export const Balance = styled.Text`
  font-size: 36px;
  color: #FFF;
  font-family: ${props => props.theme.font.bold};
  line-height: 48px;
  text-shadow: -1px 1px 16px rgba(0, 0, 0, 0.2);
`

export const BalanceDescription = styled.Text`
  font-size: 14px;
  color: #FFF;
  font-family: ${props => props.theme.font.regular};
  text-shadow: -1px 1px 4px rgba(0, 0, 0, 0.2);
`

export const PaymentStatsCard = styled(Card)`
  position: absolute;
  align-self: center;
  bottom: -36px;
`

export const PaymentStatsTitle = styled.Text`
  font-family: ${props => props.theme.font.regular};
  margin-left: 4px;
`

export const PaymentStatsBalance = styled.Text`
  font-size: 20px;
  font-family: ${props => props.theme.font.semibold};
`

export const InvoiceCardTitle = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.font.semibold};
`

export const InvoiceCardDescription = styled.Text`
  font-size: 14px;
  font-family: ${props => props.theme.font.regular};
  color: ${props => props.theme.colors.text}
`

export const InvoiceCardBalance = styled.Text`
  font-size: 16px;
  font-family: ${props => props.theme.font.medium};
  color: ${props => props.isPayed ? props.theme.colors.primary : props.theme.colors.secondary}
`

export const Title = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.font.semibold};
  margin-bottom: 8px;
`

export const ForgotPasswordText = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 16px;
  font-family: ${props => props.theme.font.medium};
`

export const CreateParcelButton = styled(Button)`
  padding: 16px 0 ${16 + getBottomSpace()}px;
`
