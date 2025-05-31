import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  return (
    <View style={styles.navbar}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.link}>Home</Text>
        </TouchableOpacity>
        {user && (
          <TouchableOpacity onPress={() => navigation.navigate('AddProduct')}>
            <Text style={styles.link}>Add Product</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.right}>
        {user ? (
          <>
            <Text style={styles.username}>{user.username}</Text>
            <TouchableOpacity onPress={logout}>
              <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5e9ff',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#d0a7ff',
    shadowColor: '#c084fc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  left: {
    flexDirection: 'row',
    gap: 15,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  link: {
    color: '#7c3aed',
    fontWeight: 'bold',
    fontSize: 16,
  },
  username: {
    fontWeight: 'bold',
    color: '#6b21a8',
  },
  logout: {
    marginLeft: 10,
    color: '#a855f7',
    fontWeight: 'bold',
  },
});
