import React, { useCallback, useRef, useEffect, useState } from 'react'

import { TabRouter, useNavigation, useRoute } from '@react-navigation/native'

import * as Yup from 'yup'

import { format as formatDate } from 'date-fns'

import { Form } from '@unform/mobile'

import getValidationErrors from '../../utils/getValidationErrors'

import Button from '../../components/Button'
// import CheckBox from '../../components/CheckBox'
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
import { useFinancialData } from '../../hooks/financial'
import { numberToBRL } from '../../utils/formatNumber'

const EditCreditCardBill = () => {
  const route = useRoute()

  const { updateFinancialData } = useFinancialData()

  const navigation = useNavigation()

  const formRef = useRef(null)
  const valueRef = useRef(null)
  const expireDateRef = useRef(null)
  const paymentDateRef = useRef(null)
  const paymentStatusRef = useRef(null)

  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setIsUpdating(route.params?.fatura_id)
  }, [route.params])

  useEffect(() => {
    if (isUpdating) {
      api.get(`/fatura/${route.params.fatura_id}`).then(
        ({ data }) => {
          Object.assign(data, {
            data_pagamento: data.data_pagamento ? formatDate(new Date(data.data_pagamento), 'dd/MM/yyyy') : '',
            data_vencimento: formatDate(new Date(data.data_vencimento), 'dd/MM/yyyy')
          })

          formRef.current.setData(data)
        }
      )
    }
  }, [isUpdating, route])

  const saveCreditCardBill = useCallback(
    ({ cartao_id, fatura_id, valor, data_vencimento, pagamento_efetutuado, data_pagamento }) => {
      console.log(cartao_id)
      const data = {
        cartao_id,
        valor,
        pagamento_efetutuado,
        data_vencimento,
        data_pagamento
      }
      return isUpdating
        ? api.put(`/fatura/${fatura_id}`, data)
        : api.post('/fatura', data)
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

          // pagamento_efetuado: Yup.boolean(),

          // data_pagamento: Yup.string()
          //   .when('pagamento_efetuado', {
          //     is: true,
          //     then: Yup.string().required('Informe a data de pagamento')
          //   })

        })

        await schema.validate(formData, { abortEarly: false })

        await saveCreditCardBill({
          fatura_id: route.params?.fatura_id,
          cartao_id: route.params.cartao_id,
          ...formData
        })

        updateFinancialData()

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
    }, [route.params, navigation, updateFinancialData, saveCreditCardBill]
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
                options={{ format: 'DD/MM/YYYY' }}
              />

              {/* <CheckBox
                ref={paymentStatusRef}
                name="pagamento_efetuado"
                label="Esta fatura já foi paga?"
              /> */}

              <InputMask
                ref={paymentDateRef}
                type={'datetime'}
                name="data_pagamento"
                keyboardType="numeric"
                icon="calendar"
                placeholder="Data de Pagamento (opcional)"
                returnKeyType="next"
                options={{ format: 'DD/MM/YYYY' }}
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
