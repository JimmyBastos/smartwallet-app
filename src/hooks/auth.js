import React, { createContext, useCallback, useState, useContext, useEffect } from 'react'

import AsyncStorage from '@react-native-community/async-storage'

import api from '../services/api'

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
      }

      setLoading(false)
    }

    loadStoragedData()
  })

  const signIn = useCallback(async ({ email, senha }) => {
    try {
      const data = await api.post('/login', {
        email,
        senha
      })

      await AsyncStorage.multiSet([
        ['@SmartWallet:token', data.token],
        ['@SmartWallet:user', JSON.stringify(data.user)]
      ])

      setAuthData(data)
    } catch (error) {
      console.error(error)

      const data = {
        token: 'usuario-nao-encontrado',
        user: {
          name: 'Jimmy Bastos',
          avatar_url: 'https://avatars0.githubusercontent.com/u/17859531'
        }
      }

      await AsyncStorage.multiSet([
        ['@SmartWallet:token', data.token],
        ['@SmartWallet:user', JSON.stringify(data.user)]
      ])
    }
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
