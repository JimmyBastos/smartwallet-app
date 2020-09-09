import React from 'react'

import { AuthProvider } from './auth'

import PropTypes from 'prop-types'

const AppProvider = ({ children }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
)

AppProvider.propTypes = {
  children: PropTypes.node
}

export default AppProvider
