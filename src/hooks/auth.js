import React, { createContext, useCallback, useState, useContext, useEffect } from 'react'

import AsyncStorage from '@react-native-community/async-storage'

import api, { setAutorizationToken } from '../services/api'

import PropTypes from 'prop-types'

const AuthContext = createContext({})

function useAuth () {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useContext must be used within an AuthProvider')
  }

  return context
}

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStoragedData () {
      const [[, token], [, user]] = await AsyncStorage.multiGet([
        '@SmartWallet:token',
        '@SmartWallet:user'
      ])

      if (token && user) {
        setAuthData({ token, user: JSON.parse(user) })
        setAutorizationToken(token)
      }

      setLoading(false)
    }

    loadStoragedData()
  }, [])

  const signIn = useCallback(async ({ email, senha }) => {
    // TODO: POST to login
    const { data: [user] } = await api.get('/usuario', {
      params: {
        email,
        senha
      }
    })

    // TODO: Properly store user token
    await AsyncStorage.multiSet([
      ['@SmartWallet:token', user.email],
      ['@SmartWallet:user', JSON.stringify(user)]
    ])

    setAuthData({ user, token: user.email })
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@SmartWallet:token', '@SmartWallet:user'])
    setAuthData({ })
  }, [])

  return (
    <AuthContext.Provider value={{ user: authData.user, loading, signIn, signOut }}>
      { children }
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node
}

export { useAuth, AuthProvider }
