import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password, navigation) => {
    try {
      const response = await fetch('https://fakestoreapi.com/users');
      const users = await response.json();

      const foundUser = users.find(
        user => user.username === username && user.password === password
      );

      if (foundUser) {
        const role = foundUser.id === 1 ? 'admin' : 'user';
        setUser({ ...foundUser, role });

        navigation.navigate('Home'); 
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Login failed', error.message);
    }
  };

  const logout = (navigation) => {
    setUser(null);
    navigation.navigate('Login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
