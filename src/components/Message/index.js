import React, { useContext } from 'react'
import { View } from 'react-native'
import { Title, Subtitle, Icon } from './styles'

import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'

const Message = ({ title, message, children }) => {
  const theme = useContext(ThemeContext)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 240
      }}
    >
      <View>
        <Icon
          name="check"
          size={80}
          color={theme.colors.success}
        />
        <Title>
          { title }
        </Title>
        <Subtitle>
          { message }
        </Subtitle>
        { children }
      </View>
    </View>
  )
}

Message.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Message
