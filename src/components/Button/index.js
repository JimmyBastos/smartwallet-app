import React from 'react'
import PropTypes from 'prop-types'

import { Container, ButtonText } from './styles'

const Button = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <ButtonText>
        { children }
      </ButtonText>
    </Container>
  )
}

Button.propTypes = {
  children: PropTypes.string.isRequired
}

export default Button
