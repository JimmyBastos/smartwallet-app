import React, { useState, useRef, useCallback, useEffect, useContext } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'

import { format as formatDate } from 'date-fns'

import { numberToBRL } from '../../utils/formatNumber'

import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  Alert
} from 'react-native'

import FeatherIcon from 'react-native-vector-icons/Feather'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import BackNavigation from '../../components/BackNavigation'
import Card from '../../components/Card'
import Button from '../../components/Button'
import CreditCard from '../../components/CreditCard'

import {
  Container,
  Header,
  InvoiceCardTitle,
  InvoiceCardDescription,
  InvoiceCardBalance,
  Title,
  CreateCard,
  CreateCardText
} from './styles'

import api from '../../services/api'
import { ThemeContext } from 'styled-components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFinancialData } from '../../hooks/financial'

const { width: viewportWidth } = Dimensions.get('window')

const CreditCards = () => {
  const navigation = useNavigation()
  const theme = useContext(ThemeContext)
  const route = useRoute()
  const slideRef = useRef(null)

  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [selectedCard, setSelectedCard] = useState({})
  const [cardInvoices, setCardInvoices] = useState({})

  const { invoiceList, creditCardList } = useFinancialData()

  useEffect(() => {
    if (route.params?.cartao_id) {
      setSelectedCard(creditCardList.find(
        card => (card.id === route.params?.cartao_id)
      ))
    } else {
      setSelectedCard(creditCardList[activeSlideIndex])
    }
  }, [route.params, creditCardList, activeSlideIndex])

  useEffect(() => {
    setCardInvoices(invoiceList.filter(
      invoice => invoice.cartao_id === selectedCard.id
    ) || [])
  }, [invoiceList, selectedCard])

  const handleCreditCardBillDelete = useCallback((fatura_id) => {
    Alert.alert(
      'Deseja excluir permanentemente esta fatura?',
      '',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => api.delete(`faturas/${fatura_id}`) }
      ],
      { cancelable: false }
    )
  }, [])

  const handleEditCreditCardBillNavigate = useCallback(
    ({ cartao_id, fatura_id }) => {
      navigation.navigate('EditCreditCardBill', {
        cartao_id,
        fatura_id
      })
    }, [navigation]
  )

  const handleEditCreditCardNavigate = useCallback(
    ({ cartao_id }) => {
      navigation.navigate('EditCreditCard', { cartao_id })
    }, [navigation]
  )

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Header>
          <BackNavigation style={{ flex: 3 }}>
            Meus Cartões
          </BackNavigation>
          <CreateCard
            style={{ flex: 1 }}
            onPress={() => handleEditCreditCardNavigate({})}
          >
            <CreateCardText>
              Novo
            </CreateCardText>

            <FeatherIcon
              name="plus"
              size={16}
              color="#fff"
            />
          </CreateCard>
        </Header>

        <ScrollView>

          <View style={{ marginTop: 16 }}>
            <Carousel
              ref={slideRef}
              layout={'default'}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth - 64}
              data={creditCardList}
              onSnapToItem={index => setActiveSlideIndex(index) }
              renderItem={({ item, index }) => (
                <CreditCard
                  id={item.id}
                  nome={item.nome}
                  bandeira={item.bandeira}
                  numero={item.numero}
                  validade={item.validade}
                />
              )}
            />
            <Pagination
              dotsLength={creditCardList.length}
              activeDotIndex={activeSlideIndex}
              containerStyle={styles.paginationContainer}
              dotColor={theme.colors.primary}
              inactiveDotColor={theme.colors.secondary}
              dotStyle={{
                width: 16,
                height: 8,
                borderRadius: 4
              }}
              inactiveDotStyle={{
                width: 8,
                height: 8
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={slideRef}
              tappableDots={!!slideRef}
            />
          </View>

          <Container style={{ marginTop: creditCardList.length ? 0 : 16 }}>
            <Title>
              Faturas
            </Title>

            {cardInvoices.map((invoice, index) => (
              <Card
                key={`invoice-${index}=${invoice.fatura_id}`}
                style={{ marginBottom: 16 }}
                contentStyle={{ flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <View>
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() =>
                      handleEditCreditCardBillNavigate({ fatura_id: invoice.id })
                    }
                  >
                    <InvoiceCardTitle>
                      {formatDate(
                        new Date(invoice.data_vencimento),
                        "MMMM 'de' yyyy",
                        { locale: require('date-fns/locale/pt-BR') }
                      )}
                    </InvoiceCardTitle>

                    <FeatherIcon
                      style={{ marginLeft: 4, marginBottom: 4 }}
                      name="edit"
                      size={16}
                      color={theme.colors.primary}
                    />
                  </TouchableOpacity>

                  <InvoiceCardDescription>
                    {invoice.data_pagamento ? 'Pagamento ' : 'Vencimento ' }
                    {formatDate(
                      new Date(invoice.data_pagamento || invoice.data_vencimento),
                      'dd/MM/yyyy'
                    )}
                  </InvoiceCardDescription>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <InvoiceCardBalance isPayed={!!invoice.data_pagamento}>
                    {numberToBRL(invoice.valor)}
                  </InvoiceCardBalance>

                  <TouchableOpacity
                    onPress={() =>
                      handleCreditCardBillDelete(invoice.id)
                    }
                  >
                    <FeatherIcon
                      style={{ marginLeft: 16, marginTop: 4 }}
                      name="trash-2"
                      size={18}
                      color={theme.colors.error}
                    />
                  </TouchableOpacity>
                </View>
              </Card>
            ))}

            <Button
              onPress={() =>
                handleEditCreditCardBillNavigate({ cartao_id: selectedCard.id })
              }
            >
              Nova Fatura
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

export default CreditCards
