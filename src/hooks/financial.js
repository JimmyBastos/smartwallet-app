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
  const [creditCardList, setCreditCardList] = useState([])
  const [financialReport, setFinancialReport] = useState({})

  useEffect(function calculateReport () {
    const totalBalance = invoiceList.reduce(
      (value, invoice) => (value + invoice.valor), 0
    )

    const setUnpayedTotal = invoiceList.reduce(
      (value, invoice) => (
        !invoice.data_pagamento ? value + invoice.valor : value
      ), 0
    )

    const payedTotal = invoiceList.reduce(
      (value, invoice) => (
        invoice.data_pagamento ? value + invoice.valor : value
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
      setUnpayedTotal,
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
    const { data } = await api.get('/cartoes')

    setCreditCardList(data)

    await AsyncStorage.setItem(
      '@SmartWallet:cards',
      JSON.stringify(data)
    )
  }, [])

  const updateInvoiceList = useCallback(async () => {
    const { data } = await api.get('/faturas')

    setInvoiceList(data)

    await AsyncStorage.setItem(
      '@SmartWallet:invoices',
      JSON.stringify(data)
    )
  }, [])

  const updateFinancialData = useCallback(async () => {
    await updateCreditCardList()
    await updateInvoiceList()
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
        updateInvoiceList
      }}
    >

      { children }
    </FinancialContext.Provider>
  )
}

export { useFinancialData, FinancialDataProvider }
