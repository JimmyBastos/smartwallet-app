import styled from 'styled-components/native'

import FeatherIcon from 'react-native-vector-icons/Feather'

export const Icon = styled(FeatherIcon)`
  text-align: center;
  margin-bottom: 36px;
`

export const Title = styled.Text`
  font-size: 28px;
  text-align: center;
  color: #0400CD;
  font-family: ${props => props.theme.font.medium};
  margin-bottom: 8px;
`

export const Subtitle = styled.Text`
  font-size: 16px;
  text-align: center;
  color: #8896B3;
  font-family: ${props => props.theme.font.regular};;
`
