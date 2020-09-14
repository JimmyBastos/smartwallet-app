import React, { useCallback, useState } from 'react'

import FeatherIcon from 'react-native-vector-icons/Feather'

import PropTypes from 'prop-types'

import headerBackground from '../../assets/background2.png'

import { useNavigation } from '@react-navigation/native'

import { Alert } from 'react-native'

import {
  Card,
  SpacedRow,
  Brand,
  Action,
  ActionText,
  CardNumber,
  OwnerName,
  ExpirationDate
} from './styles'

import api from '../../services/api'

const CreditCard = ({ id: cartao_id, bandeira, numero, nome, validade }) => {
  const isEditable = useState(!!cartao_id)
  const navigation = useNavigation()

  const handleEditCreditCardNavigate = useCallback(
    () => {
      navigation.navigate('EditCreditCard', { cartao_id })
    }, [navigation, cartao_id]
  )

  const handleEditCreditCardDelete = useCallback(() => {
    Alert.alert(
      'Deseja realmente excluir este cartão?',
      'Todas as faturas associadas a ele também serão excluidas.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => api.delete(`cartao/${cartao_id}`) }
      ],
      { cancelable: false }
    )
  }, [cartao_id])

  return (
    <Card
      source={headerBackground}
      imageStyle={{ borderRadius: 8 }}
    >
      <SpacedRow>
        <Brand>
          {bandeira}
        </Brand>

        {isEditable && (<SpacedRow>
          <Action
            activeOpacity={0.65}
            onPress={handleEditCreditCardNavigate}
          >
            <ActionText>
            Editar
            </ActionText>

            <FeatherIcon
              name="edit"
              size={16}
              color="#fff"
            />
          </Action>

          <Action
            activeOpacity={0.65}
            onPress={handleEditCreditCardDelete}
          >
            <ActionText>
              Excluir
            </ActionText>

            <FeatherIcon
              name="trash-2"
              size={16}
              color="#fff"
            />
          </Action>
        </SpacedRow>)}

      </SpacedRow>

      <CardNumber
        value={numero}
        type={'credit-card'}
        options={{
          obfuscated: true
        }}
      />

      <SpacedRow>
        <OwnerName>
          {nome}
        </OwnerName>

        <ExpirationDate>
          {validade}
        </ExpirationDate>
      </SpacedRow>
    </Card>
  )
}

CreditCard.propTypes = {
  id: PropTypes.number,
  bandeira: PropTypes.string.isRequired,
  numero: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  validade: PropTypes.string.isRequired
}

export default CreditCard
