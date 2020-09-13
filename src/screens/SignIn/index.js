import React, { useCallback, useRef, useContext } from 'react'

import { useNavigation } from '@react-navigation/native'

import * as Yup from 'yup'

import { Form } from '@unform/mobile'

import Icon from 'react-native-vector-icons/Feather'

import getValidationErrors from '../../utils/getValidationErrors'

import { useAuth } from '../../hooks/auth'

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
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText
} from './styles'

import { ThemeContext } from 'styled-components'

const SignIn = () => {
  const theme = useContext(ThemeContext)

  const formRef = useRef(null)
  const passwordInputRef = useRef(null)

  const { signIn } = useAuth()

  const navigation = useNavigation()

  const handleSignIn = useCallback(async (formData) => {
    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        senha: Yup.string()
          .required('Senha obrigatória')
      })

      await schema.validate(formData, { abortEarly: false })

      await signIn({
        email: formData.email,
        senha: formData.senha
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        formRef.current.setErrors(
          getValidationErrors(error)
        )
      } else {
        console.error(error)

        Alert.alert(
          'Erro na autenticação!',
          'Não foi possível fazer login. Verifique seu e-mail e senha.'
        )
      }
    }
  }, [signIn])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <View>
              <Title>
                Faça Seu Login
              </Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                name="email"
                keyboardType="email-address"
                icon="mail"
                placeholder="E-mail"
                onSubmitEditing={() => {
                  passwordInputRef.current.focus()
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="senha"
                icon="lock"
                placeholder="Senha"
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
                Entrar
              </Button>
            </Form>
            {false && <ForgotPassword>
              <ForgotPasswordText>
                Esqueci minha senha
              </ForgotPasswordText>
            </ForgotPassword>}

          </Container>
        </ScrollView>

        <CreateAccountButton
          onPress={() => navigation.navigate('SignUp')}
        >
          <Icon name="log-in" size={20} color={theme.colors.text} />
          <CreateAccountButtonText>
                Criar uma conta
          </CreateAccountButtonText>
        </CreateAccountButton>
      </KeyboardAvoidingView>
    </>
  )
}

export default SignIn
