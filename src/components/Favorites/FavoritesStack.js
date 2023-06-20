import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import FavoriteScreen from './FavoriteScreen';
import colors from '../../res/colors';

const Stack = createStackNavigator();

export default function FavoritesStack(){

    return (
        <Stack.Navigator
         screenOptions={{
            headerStyle: {
              backgroundColor: colors.blackPearl,
              shadowColor: colors.blackPearl,
            },
            headerTintColor: colors.white,
            headerTitleAlign: 'center'
          }}
        >
            <Stack.Screen name='favorites' component={FavoriteScreen}/>
        </Stack.Navigator>
    )
}
