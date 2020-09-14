import React from 'react'

import { AuthProvider } from './auth'
import { FinancialDataProvider } from './financial'

import PropTypes from 'prop-types'

const AppProvider = ({ children }) => (
  <AuthProvider>
    <FinancialDataProvider>
      {children}
    </FinancialDataProvider>
  </AuthProvider>
)

AppProvider.propTypes = {
  children: PropTypes.node
}

export default AppProvider
