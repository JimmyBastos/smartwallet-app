import 'react-native-gesture-handler'

import React from 'react'
import { ThemeProvider } from 'styled-components'

import { NavigationContainer } from '@react-navigation/native'

import {
  View,
  StatusBar
} from 'react-native'

import Routes from './routes'

import AppProvider from './hooks'
import theme from './config/theme'

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <ThemeProvider theme={theme}>
        <AppProvider>
          <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Routes />
          </View>
        </ AppProvider>
      </ThemeProvider>
    </NavigationContainer>
  )
}

export default App
