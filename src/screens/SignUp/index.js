import React, { useRef, useCallback, useContext } from 'react'

import { ThemeContext } from 'styled-components'

import { useNavigation } from '@react-navigation/native'

import * as Yup from 'yup'

import { Form } from '@unform/mobile'

import Icon from 'react-native-vector-icons/Feather'

import api from '../../services/api'

import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'
import Button from '../../components/Button'

import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native'

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText
} from './styles'

import InputMask from '../../components/InputMask'
import cpfValidator from '../../utils/cpfValidator'

const SignUp = () => {
  const theme = useContext(ThemeContext)

  const formRef = useRef(null)
  const emailInputRef = useRef(null)
  const documentInputRef = useRef(null)
  const phoneInputRef = useRef(null)
  const passwordInputRef = useRef(null)

  const navigation = useNavigation()

  const handleSignUp = useCallback(
    async (formData) => {
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          nome: Yup.string()
            .required('Nome obrigatório'),
          cpf: Yup.string()
            .test('CPF Valido', 'Verifique seu CPF', cpfValidator),
          celular: Yup.string()
            .required('Celular obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          senha: Yup.string()
            .min(6, 'No mínimo 6 digitos')
        })

        await schema.validate(formData, { abortEarly: false })

        await api.post('usuario', formData)

        navigation.navigate('RegisterFinished')
      } catch (error) {
        console.log(error)
        if (error instanceof Yup.ValidationError) {
          formRef.current.setErrors(
            getValidationErrors(error)
          )
        } else {
          Alert.alert(
            'Erro finalizar cadastro!',
            'Ocorreu um erro ao fazer seu cadastro, tente novamente.'
          )
        }
      }
    }, [navigation])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <View>
              <Title>
                Crie Sua Conta
              </Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                name="nome"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  documentInputRef.current.focus()
                }}

              />

              <InputMask
                ref={documentInputRef}
                type="cpf"
                name="cpf"
                keyboardType="numeric"
                icon="file-text"
                placeholder="CPF"
                returnKeyType="next"
                onSubmitEditing={() => {
                  phoneInputRef.current.focus()
                }}
              />

              <InputMask
                ref={phoneInputRef}
                type="cel-phone"
                name="celular"
                keyboardType="numeric"
                icon="phone-call"
                placeholder="Celular"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current.focus()
                }}
              />

              <Input
                ref={emailInputRef}
                autoCapitalize="none"
                returnKeyType="next"
                autoCorrect={false}
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                onSubmitEditing={() => {
                  passwordInputRef.current.focus()
                }}
              />

              <Input
                ref={passwordInputRef}
                name="senha"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
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
                Criar Conta
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn
        onPress={() => navigation.navigate('SignIn')}
      >
        <Icon name="arrow-left" size={20} color={theme.colors.text} />
        <BackToSignInText>
          Voltar Para o Login
        </BackToSignInText>
      </BackToSignIn>
    </>
  )
}

export default SignUp
