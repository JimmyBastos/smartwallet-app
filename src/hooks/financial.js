import React, { createContext, useCallback, useState, useContext, useEffect } from 'react'

import AsyncStorage from '@react-native-community/async-storage'

import api from '../services/api'

const FinancialContext = createContext({})

function useFinancialData () {
  const context = useContext(FinancialContext)

  if (!context) {
    throw new Error('useContext must be used within an FinancialDataProvider')
  }

  return context
}

const FinancialDataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [invoiceList, setInvoiceList] = useState([])
  const [invoiceWithCardList, setInvoiceWithCardList] = useState([])
  const [creditCardWithInvoicesList, setCreditCardWithInvoicesLis] = useState([])
  const [creditCardList, setCreditCardList] = useState([])
  const [financialReport, setFinancialReport] = useState({})

  useEffect(() => {
    // TODO: Deveria ser retornada pela API
    setInvoiceWithCardList(
      invoiceList.map(
        inv => Object.assign({ cartao: creditCardList.find(cc => cc.id === inv.cartao_id) }, inv)
      ).filter(
        inv => inv.cartao
      )
    )
  }, [invoiceList, creditCardList])

  useEffect(() => {
    // TODO: Deveria ser retornada pela API
    setCreditCardWithInvoicesLis(
      creditCardList.map(card => Object.assign({
        faturas: invoiceList.filter(inv => inv.cartao_id === card.id)
      }, card))
    )
  }, [invoiceList, creditCardList])

  useEffect(function calculateReport () {
    const totalBalance = invoiceList.reduce(
      (value, invoice) => (value + (+invoice.valor)), 0
    )

    const unpayedTotal = invoiceList.reduce(
      (value, invoice) => {
        return !invoice.data_pagamento ? value + (+invoice.valor) : value
      }, 0
    )

    const payedTotal = invoiceList.reduce(
      (value, invoice) => (
        invoice.data_pagamento ? value + (+invoice.valor) : value
      ), 0
    )

    const payedCount = invoiceList.reduce(
      (value, invoice) => (
        value + Number(!!invoice.data_pagamento)
      ), 0
    )

    const unpayedCount = invoiceList.reduce(
      (value, invoice) => (
        value + Number(!invoice.data_pagamento)
      ), 0
    )

    setFinancialReport({
      totalBalance,
      unpayedTotal,
      payedTotal,
      payedCount,
      unpayedCount
    })
  }, [invoiceList])

  useEffect(function loadSavedData () {
    async function loadStoragedData () {
      const [[, cards], [, invoices], [, financialReport]] = await AsyncStorage.multiGet([
        '@SmartWallet:cards',
        '@SmartWallet:invoices',
        '@SmartWallet:financialReport'
      ])

      if (cards && invoices && financialReport) {
        setCreditCardList(JSON.parse(cards))
        setInvoiceList(JSON.parse(invoices))
        setFinancialReport(JSON.parse(financialReport))
      }

      setLoading(false)
    }

    loadStoragedData()
  }, [])

  const updateCreditCardList = useCallback(async () => {
    const { data } = await api.get('/cartao')

    setCreditCardList(data)

    AsyncStorage.setItem(
      '@SmartWallet:cards',
      JSON.stringify(data)
    )
  }, [])

  const updateInvoiceList = useCallback(async () => {
    const { data } = await api.get('/fatura')

    setInvoiceList(data)

    AsyncStorage.setItem(
      '@SmartWallet:invoices',
      JSON.stringify(data)
    )
  }, [])

  const updateFinancialData = useCallback(async () => {
    updateCreditCardList()
    updateInvoiceList()
  }, [updateCreditCardList, updateInvoiceList])

  return (
    <FinancialContext.Provider
      value={{
        loading,
        creditCardList,
        invoiceList,
        financialReport,
        updateFinancialData,
        updateCreditCardList,
        updateInvoiceList,
        creditCardWithInvoicesList,
        invoiceWithCardList
      }}
    >

      { children }
    </FinancialContext.Provider>
  )
}

export { useFinancialData, FinancialDataProvider }
