import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Dashboard from '../screens/Dashboard'

const App = createStackNavigator()

const AppRoutes = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#F4F8F9'
        }
      }}
    >
      <App.Screen name="Dashboard" component={Dashboard}/>
    </App.Navigator>
  )
}

export default AppRoutes
