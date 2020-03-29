import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import Incidents from './pages/Incidents'
import Details from './pages/Details'

const Stack = createStackNavigator()

function RootStack() {
    return(
      <Stack.Navigator screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS
      }}>
          <Stack.Screen name={"Incidents"} component={Incidents}/>
          <Stack.Screen name={"Details"} component={Details}/>
      </Stack.Navigator>
    )
}

export default function Routes(){
    return(
        <NavigationContainer>
            <RootStack/>
        </NavigationContainer>
    )
}