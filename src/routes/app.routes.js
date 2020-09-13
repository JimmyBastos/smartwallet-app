import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Dashboard from '../screens/Dashboard'
import CreditCards from '../screens/CreditCards'

import EditCreditCard from '../screens/EditCreditCard'
import EditCreditCardBill from '../screens/EditCreditCardBill'

import CreditCardBillSaved from '../screens/CreditCardBillSaved'
import CreditCardSaved from '../screens/CreditCardSaved'

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
      <App.Screen name="CreditCards" component={CreditCards}/>

      <App.Screen name="EditCreditCard" component={EditCreditCard}/>
      <App.Screen name="EditCreditCardBill" component={EditCreditCardBill}/>

      <App.Screen name="CreditCardBillSaved" component={CreditCardBillSaved}/>
      <App.Screen name="CreditCardSaved" component={CreditCardSaved}/>
    </App.Navigator>
  )
}

export default AppRoutes
