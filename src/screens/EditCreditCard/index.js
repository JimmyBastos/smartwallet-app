import React, { useCallback, useRef, useEffect, useState } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'

import * as Yup from 'yup'

import { Form } from '@unform/mobile'

import getValidationErrors from '../../utils/getValidationErrors'
import creditCardType from 'credit-card-type'
import creditCardValidator from 'card-validator'
import Input from '../../components/Input'
import Button from '../../components/Button'
import BackNavigation from '../../components/BackNavigation'
import InputMask from '../../components/InputMask'

import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StyleSheet
} from 'react-native'

import {
  Container
} from './styles'

import api from '../../services/api'
import { useFinancialData } from '../../hooks/financial'

const EditCreditCard = () => {
  const { updateCreditCardList } = useFinancialData()

  const formRef = useRef(null)
  const ccNumberInputRef = useRef(null)
  const cvcInputRef = useRef(null)
  const ccExpireDateRef = useRef(null)
  const nameInputRef = useRef(null)

  const navigation = useNavigation()
  const route = useRoute()

  const [isUpdating] = useState(
    route.params?.cartao_id
  )

  useEffect(() => {
    if (isUpdating) {
      api.get(`/cartoes/${route.params?.cartao_id}`).then(
        ({ data }) => formRef.current.setData(data)
      )
    }
  }, [isUpdating, route.params])

  const saveCreditCard = useCallback(
    ({ cartao_id = null, bandeira, identificacao, nome, numero, cvc, validade }) => {
      const data = {
        identificacao,
        bandeira,
        nome,
        numero,
        cvc,
        validade
      }

      return isUpdating
        ? api.put(`/cartoes/${cartao_id}`, data)
        : api.post('/cartoes', data)
    }, [isUpdating]
  )

  const handleCreditCardChange = useCallback(
    async (formData) => {
      try {
        formRef.current.setErrors({})

        const rawCardNumber = formData.numero?.join('')

        const [ccBrand] = creditCardType(rawCardNumber)

        Object.assign(formData, {
          numero: rawCardNumber,
          bandeira: ccBrand?.niceType,
          identificacao: `${ccBrand?.niceType} • Final ${formData.numero?.slice()?.pop()}`
        })

        const schema = Yup.object().shape({
          numero: Yup.string()
            .required('Digite o Numero do Cartão')
            .test('valid-cc-number', 'Verifique o número do cartão', val => creditCardValidator.number(val).isValid),

          validade: Yup.string()
            .required('Digite a Validade')
            .test('valid-cc-expiration', 'Verifique a validade', val => creditCardValidator.expirationDate(val).isValid),

          cvc: Yup.string()
            .required('Digite o CVC')
            .test('valid-cc-cvc', 'Verifique o CVC', val => creditCardValidator.cvv(val).isValid),

          nome: Yup.string()
            .required('Informe o(a) Titular do Cartão')

        })

        await schema.validate(formData, { abortEarly: false })

        const { data } = await saveCreditCard(formData)

        updateCreditCardList()

        navigation.navigate('CreditCardSaved', { cartao_id: data.id })
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          formRef.current.setErrors(
            getValidationErrors(error)
          )
        } else {
          console.error(error)

          Alert.alert(
            'Erro ao salvar cartão!',
            'Não foi possível salvar seu cartão de credito. Verifique os dados e tente novamente.'
          )
        }
      }
    }, [navigation, saveCreditCard]
  )

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <BackNavigation>
          { isUpdating ? 'Editar Cartão' : 'Novo Cartão' }
        </BackNavigation>

        <ScrollView
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Form ref={formRef} onSubmit={handleCreditCardChange}>
              <InputMask
                ref={ccNumberInputRef}
                type={'credit-card'}
                name="numero"
                keyboardType="numeric"
                icon="credit-card"
                placeholder="Numero"
                returnKeyType="next"
                style={{ flexShrink: 1 }}
                options={{
                  obfuscated: false,
                  issuer: 'visa-or-mastercard'
                }}
                onSubmitEditing={() => {
                  ccExpireDateRef.current.focus()
                }}
              />

              <View style={styles.row}>
                <InputMask
                  ref={ccExpireDateRef}
                  type={'custom'}
                  name="validade"
                  keyboardType="numeric"
                  icon="calendar"
                  placeholder="MM/AA"
                  returnKeyType="next"
                  style={{ flex: 1, marginRight: 8 }}
                  options={{ mask: '99/99' }}
                  onSubmitEditing={() => {
                    cvcInputRef.current.focus()
                  }}
                />

                <Input
                  ref={cvcInputRef}
                  name="cvc"
                  icon="lock"
                  keyboardType="numeric"
                  style={{ flex: 1 }}
                  placeholder="CVC"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    nameInputRef.current.focus()
                  }}
                />
              </View>

              <Input
                ref={nameInputRef}
                name="nome"
                icon="user"
                placeholder="Nome Impresso No Cartão"
                returnKeyType="next"
                onSubmitEditing={() => {
                  formRef.current.submitForm()
                }}

              />

              <Button
                style={{ marginTop: 16 }}
                onPress={() => {
                  formRef.current.submitForm()
                }}
              >
                Salvar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default EditCreditCard
