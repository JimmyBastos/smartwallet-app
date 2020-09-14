import React, { useState, useContext, useCallback, useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { ThemeContext } from 'styled-components'

import { useAuth } from '../../hooks/auth'
import { useFinancialData } from '../../hooks/financial'

import { format as formatDate } from 'date-fns'

import { numberToBRL } from '../../utils/formatNumber'

import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  RefreshControl
} from 'react-native'

import headerBackground from '../../assets/background2.png'

import { TouchableOpacity } from 'react-native-gesture-handler'

import FeatherIcon from 'react-native-vector-icons/Feather'
import Card from '../../components/Card'
import Button from '../../components/Button'

import {
  Container,
  Header,
  Title,
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
  InvoiceCardBalance
} from './styles'

const Dashboard = () => {
  const theme = useContext(ThemeContext)
  const navigation = useNavigation()

  const { user, signOut } = useAuth()
  const { invoiceList, creditCardList, financialReport, updateFinancialData } = useFinancialData()

  const [refreshing, setRefreshing] = React.useState(false)

  useEffect(() => {
    updateFinancialData()
  }, [updateFinancialData])

  const onRefresh = useCallback(
    async () => {
      setRefreshing(true)
      await updateFinancialData()
      setRefreshing(false)
    }, [updateFinancialData]
  )

  const handleInvoicesNavigate = useCallback(
    (cartao_id = null) => {
      navigation.navigate('CreditCards', { cartao_id })
    }, [navigation]
  )

  const handleCreateCardNavigate = useCallback(
    (cartao_id = null) => {
      navigation.navigate('EditCreditCard')
    }, [navigation]
  )

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Header
            source={headerBackground}
            imageStyle={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
          >
            <Container>
              <UserInformationContainer>
                <WellcomeMessage>
                  Olá, {user.nome}
                </WellcomeMessage>

                <View style={{ alignItems: 'center' }}>
                  <UserAvatarContainer >
                    <UserAvatarImage source={{ uri: user.avatar_url }} />
                  </UserAvatarContainer>

                  <TouchableOpacity onPress={signOut} >
                    <BalanceDescription>
                      Sair
                    </BalanceDescription>
                  </TouchableOpacity>

                </View>
              </UserInformationContainer>

              <View>
                <Balance>
                  {numberToBRL(financialReport.totalBalance)}
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
                      { financialReport.payedCount } {financialReport.payedCount === 1 ? 'Fatura Paga' : 'Faturas Pagas'}
                    </PaymentStatsTitle>
                  </View>

                  <PaymentStatsBalance style={{ color: theme.colors.primary }} >
                    {numberToBRL(financialReport.payedTotal)}
                  </PaymentStatsBalance>
                </View>
                <FeatherIcon size={16} name="more-vertical" color={theme.colors.text} />
                <View>
                  <View style={{ ...styles.row, marginBottom: 4 }}>
                    <FeatherIcon name="target" size={6} color={theme.colors.error}/>
                    <PaymentStatsTitle>
                      { financialReport.unpayedCount } {financialReport.unpayedCount === 1 ? 'Fatura Pendente' : 'Faturas Pendentes'}
                    </PaymentStatsTitle>
                  </View>

                  <PaymentStatsBalance style={{ color: theme.colors.error }} >
                    {numberToBRL(financialReport.unpayedTotal)}
                  </PaymentStatsBalance>
                </View>
              </PaymentStatsCard>
            </Container>
          </Header>

          <Container>
            {!!invoiceList.length && (
              <Title>
                Faturas
              </Title>
            )}

            {invoiceList.slice(0, 5).map((invoice, index) => (
              <Card
                key={`invoice-${index}=${invoice.fatura_id}`}
                style={{ marginBottom: 16 }}
                contentStyle={{ ...styles.row, justifyContent: 'space-between' }}
                onPress={() =>
                  handleInvoicesNavigate(invoice.cartao_id)
                }
              >
                <View>
                  <InvoiceCardTitle>
                    {invoice.cartao}
                  </InvoiceCardTitle>
                  <InvoiceCardDescription>
                    {invoice.data_pagamento ? 'Pagamento ' : 'Vencimento ' }
                    {formatDate(new Date(invoice.data_pagamento || invoice.data_vencimento), 'dd/MM/yyyy')}
                  </InvoiceCardDescription>
                </View>
                <InvoiceCardBalance isPayed={!!invoice.data_pagamento}>
                  {numberToBRL(invoice.valor)}
                </InvoiceCardBalance>
              </Card>
            ))}

            {(!!invoiceList.length || !!creditCardList.length) && (
              <Button onPress={handleInvoicesNavigate}>
                Todas as Faturas
              </Button>
            )}

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {!creditCardList.length && (
        <Container style={{ width: '100%', position: 'absolute', bottom: 88, alignItems: 'center' }}>
          <Title style={{ fontSize: 24, textAlign: 'center', marginBottom: 16 }}>
            Que tal cadastrarmos seu primeiro cartão?
          </Title>
          <Button
            onPress={handleCreateCardNavigate}
            style={{ backgroundColor: theme.colors.success }}
          >
            Cadastrar Agora
          </Button>
        </Container>
      )}
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
