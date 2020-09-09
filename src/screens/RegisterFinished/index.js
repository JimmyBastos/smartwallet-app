import React from 'react'

import { useNavigation } from '@react-navigation/native'

import { View, StyleSheet } from 'react-native'

import Button from '../../components/Button'
import Message from '../../components/Message'

const RegisterFinished = () => {
  const navigation = useNavigation()

  const handleButtonClick = () => {
    navigation.navigate('SignIn')
  }

  return (
    <View
      style={styleSheet.container}
    >
      <Message
        title="Cadastro Realizado Com Sucesso"
        message="Você já pode fazer login."
      >
        <Button
          style={styleSheet.button}
          onPress={handleButtonClick}
        >
              Ok
        </Button>
      </Message>
    </View>
  )
}

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    width: 128,
    marginTop: 24,
    alignSelf: 'center'
  }
})

export default RegisterFinished
