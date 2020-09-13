import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  padding: 16px 24px;
  flex-direction: row;
  align-items: center;
`

export const Title = styled.Text`
  font-size: 18px;
  margin-left: 16px;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.font.semibold};
`
