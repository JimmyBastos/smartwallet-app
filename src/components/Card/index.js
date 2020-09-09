import React from 'react'
import PropTypes from 'prop-types'

import { Container, Content, Shadow } from './styles'

const Card = ({ children, contentStyle = {}, ...props }) => {
  return (
    <Container {...props}>
      <Content style={contentStyle}>
        { children }
      </Content>
      <Shadow/>
    </Container>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  contentStyle: PropTypes.object
}

export default Card
