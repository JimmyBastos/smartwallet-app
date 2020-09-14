import styled from 'styled-components/native'

export const Container = styled.View`
  border-radius: 10px;
  background: ${props => props.theme.colors.foreground};
  width: 100%;
`

export const Content = styled.View`
  padding: 16px;
  z-index: 1;
`

export const Shadow = styled.View`
  position: absolute;
  border-radius: 10px;
  height: 100%;
  width: 100%;
  opacity: .25;
  background-color: ${props => props.theme.colors.foreground};
  shadow-color: #000;
  elevation: 16;
  z-index: 0;
`
