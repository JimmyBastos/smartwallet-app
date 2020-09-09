import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'

import FeatherIcon from 'react-native-vector-icons/Feather'

import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
  Text,
  Image
} from 'react-native'

import Card from '../../components/Card'
import Button from '../../components/Button'

import headerBackground from '../../assets/background2.png'

import {
  Container,
  Title
} from './styles'

const Dashboard = () => {
  const [invoices] = useState([
    {
      card: 'Mastercard',
      value: 1200,
      expires_at: '01/01/2020',
      paid_at: ''
    },
    {
      card: 'Mastercard',
      value: 1200,
      expires_at: '01/01/2020',
      paid_at: '01/01/2020'
    },
    {
      card: 'Mastercard',
      value: 1200,
      expires_at: '01/01/2020',
      paid_at: '01/01/2020'
    },
    {
      card: 'Mastercard',
      value: 1200,
      expires_at: '01/01/2020',
      paid_at: '01/01/2020'
    },
    {
      card: 'Mastercard',
      value: 1200,
      expires_at: '01/01/2020',
      paid_at: '01/01/2020'
    }
  ])

  const navigation = useNavigation()

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          style={{ flex: 1 }}
        >
          <ImageBackground
            source={headerBackground}
            style={{
              minHeight: 272,
              marginBottom: 36
            }}
            imageStyle={{
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8
            }}
          >
            <Container>
              <View
                style={{
                  marginTop: 16,
                  marginBottom: 32,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Text style={{
                  fontSize: 24,
                  color: '#FFF',
                  fontFamily: 'Poppins-SemiBold'
                }}>
                  Olá, Jimmy Bastos
                </Text>

                <View
                  style={{
                    backgroundColor: '#fff',
                    padding: 3,
                    borderRadius: 50
                  }}
                >
                  <Image
                    style={{
                      height: 48,
                      width: 48,
                      borderRadius: 50
                    }}
                    source={{ uri: 'https://avatars0.githubusercontent.com/u/17859531' }}
                  />
                </View>
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 36,
                    color: '#FFF',
                    fontFamily: 'Poppins-Bold',
                    lineHeight: 48
                  }}
                >
                  R$ 5600,00
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#FFF',
                    fontFamily: 'Poppins-Regular'
                  }}
                >
                   Gastos até o dia 07/11
                </Text>
              </View>

              <Card
                style={{
                  position: 'absolute',
                  bottom: -36,
                  alignSelf: 'center'

                }}
                contentStyle={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: '#8896B3',
                      marginBottom: 4
                    }}
                  >
                3 Faturas Pagas
                  </Text>

                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      color: '#0400CD',
                      fontSize: 20
                    }}
                  >
                R$ 1200,00
                  </Text>
                </View>
                <FeatherIcon
                  size={16}
                  name="more-vertical"
                  color= "#8896B3"
                />
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: '#8896B3',
                      marginBottom: 4
                    }}
                  >
                     1 Fatura Pendente
                  </Text>

                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      color: '#FF3962',
                      fontSize: 20
                    }}
                  >
                R$ 1200,00
                  </Text>

                </View>
              </Card>
            </Container>

          </ImageBackground>

          <Container>
            <Title>
              Faturas
            </Title>

            {invoices.map((invoice, index) => (
              <Card
                key={`invoice-card-${index}`}
                contentStyle={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                style={{
                  marginBottom: 16
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      color: '#0400CD',
                      fontSize: 16
                    }}
                  >
                    {invoice.card}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: '#8896B3'
                    }}
                  >
                    {invoice.expires_at}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 16,
                    color: invoice.paid_at ? '#4C4E54' : '#FF3962'
                  }}
                >
                    R$ {invoice.value},00
                </Text>
              </Card>
            ))}

            <Button>
              Todas as Faturas
            </Button>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default Dashboard
