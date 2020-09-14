import React from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'

import { View, StyleSheet } from 'react-native'

import Button from '../../components/Button'
import Message from '../../components/Message'

const CreditCardSaved = () => {
  const navigation = useNavigation()
  const route = useRoute()

  const handleButtonClick = () => {
    navigation.navigate('EditCreditCardBill', {
      cartao_id: route.params.cartao_id
    })
  }

  return (
    <View
      style={styleSheet.container}
    >
      <Message
        title="Tudo Pronto"
        message="Você já pode cadastrar sua primeira fatura."
      >
        <Button
          style={styleSheet.button}
          onPress={handleButtonClick}
        >
          Nova Fatura
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
    width: 224,
    marginTop: 24,
    alignSelf: 'center'
  }
})

export default CreditCardSaved
