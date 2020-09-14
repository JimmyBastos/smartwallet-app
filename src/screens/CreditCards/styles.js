import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding: 0 32px 32px;
`

export const Header = styled.View`
  padding-right: 32px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const CreateCard = styled(RectButton)`
  flex-direction: row;
  justify-content: space-between;
  height: 42px;
  padding: 0 16px;
  background: ${props => props.theme.colors.success};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`

export const CreateCardText = styled.Text`
  font-family: ${props => props.theme.font.medium};
  color: #fff;
  font-size: 14px;
  margin-right: 8px;
`

export const InvoiceCardTitle = styled.Text`
  font-size: 16px;
  text-transform: capitalize;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.font.semibold};
`

export const InvoiceCardDescription = styled.Text`
  font-size: 12px;
  font-family: ${props => props.theme.font.regular};
  color: ${props => props.theme.colors.text};
`

export const InvoiceCardBalance = styled.Text`
  font-size: 18px;
  font-family: ${props => props.theme.font.semibold};
  color: ${props => props.isPayed ? props.theme.colors.primary : props.theme.colors.secondary};
`

export const Title = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.font.semibold};
  margin-bottom: 8px;
`
