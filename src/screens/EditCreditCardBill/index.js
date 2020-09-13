import React, { useCallback, useRef, useEffect, useState } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'

import * as Yup from 'yup'

import { Form } from '@unform/mobile'

import getValidationErrors from '../../utils/getValidationErrors'

import Button from '../../components/Button'
import BackNavigation from '../../components/BackNavigation'
import InputMask from '../../components/InputMask'

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native'

import {
  Container
} from './styles'

import api from '../../services/api'

const EditCreditCardBill = () => {
  const route = useRoute()

  const navigation = useNavigation()

  const formRef = useRef(null)
  const valueRef = useRef(null)
  const expireDateRef = useRef(null)
  const paymentDateRef = useRef(null)

  const [isUpdating] = useState(
    route.params?.fatura_id
  )

  useEffect(() => {
    if (isUpdating) {
      api.get(`/faturas/${route.params.fatura_id}`).then(
        ({ data }) => formRef.current.setData(data)
      )
    } else {
      console.log(route.params)
      formRef.current.setData({ cartao_id: route.params.cartao_id })
    }
  }, [isUpdating, route])

  const saveCreditCardBill = useCallback(
    async ({ cartao_id, fatura_id, valor, data_vencimento, data_pagamento }) => {
      const data = {
        cartao_id,
        valor,
        data_vencimento,
        data_pagamento
      }

      if (isUpdating) {
        await api.put(`/faturas/${fatura_id}`, data)
      } else {
        await api.post('/faturas', data)
      }
    }, [isUpdating]
  )

  const handleCreditCardChange = useCallback(
    async (formData) => {
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          valor: Yup.number()
            .required('Informe o valor da fatura')
            .min(1, 'No mínimo R$ 1,00'),

          data_vencimento: Yup.string()
            .required('Informe o vencimento da fatura')

        })

        await schema.validate(formData, { abortEarly: false })
        await saveCreditCardBill(formData)

        navigation.navigate('CreditCardBillSaved', { cartao_id: formData.cartao_id })
      } catch (error) {
        console.error(error)
        if (error instanceof Yup.ValidationError) {
          formRef.current.setErrors(
            getValidationErrors(error)
          )
        } else {
          Alert.alert(
            'Erro ao salvar fatura!',
            'Não foi possível salvar a fatura. Verifique os dados e tente novamente.'
          )
        }
      }
    }, [navigation, saveCreditCardBill]
  )

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <BackNavigation>
          { isUpdating ? 'Editar Fatura' : 'Nova Fatura' }
        </BackNavigation>

        <ScrollView
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Form ref={formRef} onSubmit={handleCreditCardChange}>
              <InputMask
                ref={valueRef}
                type={'money'}
                name="valor"
                keyboardType="numeric"
                icon="dollar-sign"
                placeholder="Valor"
                returnKeyType="next"
                options={{
                  precision: 2,
                  separator: ',',
                  delimiter: '.',
                  unit: 'R$',
                  suffixUnit: ''
                }}
                onSubmitEditing={() => {
                  expireDateRef.current.focus()
                }}
              />

              <InputMask
                ref={expireDateRef}
                type={'datetime'}
                name="data_vencimento"
                keyboardType="numeric"
                icon="calendar"
                placeholder="Data de Vencimento"
                returnKeyType="next"
                options={{ format: 'DD/MM/YY' }}
                onSubmitEditing={() => {
                  paymentDateRef.current.focus()
                }}
              />

              <InputMask
                ref={paymentDateRef}
                type={'datetime'}
                name="data_pagamento"
                keyboardType="numeric"
                icon="calendar"
                placeholder="Data de Pagamento (opcional)"
                returnKeyType="next"
                options={{ format: 'DD/MM/YY' }}
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

export default EditCreditCardBill
