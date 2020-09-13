import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'

import { Container, Title } from './styles'

import FeatherIcon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const BackNavigation = ({ children, ...props }) => {
  const navigation = useNavigation()
  const theme = useContext(ThemeContext)

  const handleNavigation = () => {
    navigation.goBack()
  }

  return (
    <Container {...props}>
      <TouchableOpacity onPress={handleNavigation}>
        <FeatherIcon
          name="chevron-left"
          size={32}
          color={theme.colors.primary}/>
      </TouchableOpacity>
      <Title>
        {children}
      </Title>
    </Container>
  )
}

BackNavigation.propTypes = {
  children: PropTypes.string.isRequired
}

export default BackNavigation
