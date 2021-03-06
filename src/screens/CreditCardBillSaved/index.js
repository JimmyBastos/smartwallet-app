import React from 'react'

import { useNavigation } from '@react-navigation/native'

import { View, StyleSheet } from 'react-native'

import Button from '../../components/Button'
import Message from '../../components/Message'

const CreditCardSaved = () => {
  const navigation = useNavigation()

  const handleButtonClick = () => {
    navigation.navigate('Dashboard')
  }

  return (
    <View
      style={styleSheet.container}
    >
      <Message
        title="Fatura Atualizada"
        message="Veja o resumo de gastos em sua tela inicial"
      >
        <Button
          style={styleSheet.button}
          onPress={handleButtonClick}
        >
          Ver Resumo
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
    width: 196,
    marginTop: 24,
    alignSelf: 'center'
  }
})

export default CreditCardSaved
