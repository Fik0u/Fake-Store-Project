import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProdDetailsScreen';
import AddProductScreen from './screens/AddProdScreen';
import EditProductScreen from './screens/EditProdScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}} >
                <Stack.Screen name = 'Login' component = {LoginScreen} />
                <Stack.Screen name = 'Home' component={HomeScreen} />
                <Stack.Screen name = 'ProductDetails' component={ProductDetailsScreen} />
                <Stack.Screen name = 'Add' component={AddProductScreen} />
                <Stack.Screen name = 'Edit' component={EditProductScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};