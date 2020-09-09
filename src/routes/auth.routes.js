import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import RegisterFinished from '../screens/RegisterFinished'
import Dashboard from '../screens/Dashboard'

const Auth = createStackNavigator()

const AuthRoutes = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#F4F8F9'
        }
      }}
    >
      <Auth.Screen name="SignIn" component={SignIn}/>
      <Auth.Screen name="Dashboard" component={Dashboard}/>
      <Auth.Screen name="SignUp" component={SignUp}/>
      <Auth.Screen name="RegisterFinished" component={RegisterFinished}/>

    </Auth.Navigator>
  )
}

export default AuthRoutes
