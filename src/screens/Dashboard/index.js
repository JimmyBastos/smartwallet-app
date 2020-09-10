import React, { useState, useContext, useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth'
import { ThemeContext } from 'styled-components'

import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  StyleSheet
} from 'react-native'

import headerBackground from '../../assets/background2.png'

import FeatherIcon from 'react-native-vector-icons/Feather'

import { numberToBRL } from '../../utils/formatNumber'
import Card from '../../components/Card'
import Button from '../../components/Button'

import {
  Container,
  Header,
  UserInformationContainer,
  WellcomeMessage,
  UserAvatarContainer,
  UserAvatarImage,
  Balance,
  BalanceDescription,
  PaymentStatsCard,
  PaymentStatsTitle,
  PaymentStatsBalance,
  InvoiceCardTitle,
  InvoiceCardDescription,
  InvoiceCardBalance,
  Title
} from './styles'

const Dashboard = () => {
  const theme = useContext(ThemeContext)
  const navigation = useNavigation()

  const [totalBalance, setTotalBalance] = useState(0)
  const [unpayedTotal, setUnpayedTotal] = useState(0)
  const [payedTotal, setPayedTotal] = useState(0)
  const [payedCount, setPayedCount] = useState(0)
  const [unpayedCount, setUnpayedCount] = useState(0)

  const { user } = useAuth()

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

  const handleInvoicesNavigate = (credit_card_id = null) => {
    navigation.navigate('CreditCardBills', { credit_card_id })
  }

  useEffect(() => {
    setTotalBalance(invoices.reduce(
      (value, invoince) => (value + Number(invoince.value)), 0
    ))

    setUnpayedTotal(invoices.reduce(
      (value, invoince) => {
        return !invoince.paid_at ? value + Number(invoince.value) : value
      }, 0
    ))

    setPayedTotal(invoices.reduce(
      (value, invoince) => {
        return invoince.paid_at ? value + Number(invoince.value) : value
      }, 0
    ))

    setPayedCount(invoices.reduce(
      (value, invoince) => (
        value + Number(!!invoince.paid_at)
      ), 0
    ))

    setUnpayedCount(invoices.reduce(
      (value, invoince) => (
        value + Number(!invoince.paid_at)
      ), 0
    ))
  },
  [
    invoices,
    setTotalBalance,
    setUnpayedTotal,
    setPayedTotal,
    setPayedCount,
    setUnpayedCount
  ])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView>
          <Header
            source={headerBackground}
            imageStyle={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
          >
            <Container>
              <UserInformationContainer>
                <WellcomeMessage>
                  Olá, {user.name}
                </WellcomeMessage>

                <UserAvatarContainer>
                  <UserAvatarImage source={{ uri: user.avatar_url }} />
                </UserAvatarContainer>
              </UserInformationContainer>

              <View>
                <Balance>
                  {numberToBRL(totalBalance)}
                </Balance>
                <BalanceDescription>
                   Gastos até o dia 07/11
                </BalanceDescription>
              </View>

              <PaymentStatsCard contentStyle={{ ...styles.row, justifyContent: 'space-between' }}>
                <View>
                  <View style={{ ...styles.row, marginBottom: 4 }}>
                    <FeatherIcon name="target" size={6} color={theme.colors.success}/>
                    <PaymentStatsTitle>
                      { payedCount } {payedCount === 1 ? 'Fatura Paga' : 'Faturas Pagas'}
                    </PaymentStatsTitle>
                  </View>

                  <PaymentStatsBalance style={{ color: theme.colors.primary }} >
                    {numberToBRL(payedTotal)}
                  </PaymentStatsBalance>
                </View>
                <FeatherIcon size={16} name="more-vertical" color={theme.colors.text} />
                <View>
                  <View style={{ ...styles.row, marginBottom: 4 }}>
                    <FeatherIcon name="target" size={6} color={theme.colors.error}/>
                    <PaymentStatsTitle>
                      { unpayedCount } {unpayedCount === 1 ? 'Fatura Pendente' : 'Faturas Pendentes'}
                    </PaymentStatsTitle>
                  </View>

                  <PaymentStatsBalance style={{ color: theme.colors.error }} >
                    {numberToBRL(unpayedTotal)}
                  </PaymentStatsBalance>
                </View>
              </PaymentStatsCard>
            </Container>
          </Header>

          <Container>
            <Title>
              Faturas
            </Title>

            {invoices.map((invoice, index) => (
              <Card
                key={`invoice-${index}=${invoice.invoice_id}`}
                style={{ marginBottom: 16 }}
                contentStyle={{ ...styles.row, justifyContent: 'space-between' }}
                onPress={() =>
                  handleInvoicesNavigate(invoice.credit_card_id)
                }
              >
                <View>
                  <InvoiceCardTitle>
                    {invoice.card}
                  </InvoiceCardTitle>
                  <InvoiceCardDescription>
                    {invoice.expires_at}
                  </InvoiceCardDescription>
                </View>
                <InvoiceCardBalance isPayed={!!invoice.payed_at}>
                  {numberToBRL(invoice.value)}
                </InvoiceCardBalance>
              </Card>
            ))}

            <Button onPress={handleInvoicesNavigate}>
              Todas as Faturas
            </Button>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default Dashboard
