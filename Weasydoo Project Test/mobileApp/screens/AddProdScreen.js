import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Navbar from '../components/NavBar';


export default function AddProductScreen() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('electronics');
  const [image, setImage] = useState('');

  const handleSubmit = async () => {
    if (!title || !price || !description || !image) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newProduct = {
      title,
      price: parseFloat(price),
      description,
      image,
      category,
    };

    try {
      const res = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      console.log('Product added:', data);
      Alert.alert('Success', 'Product successfully added!');
      // Optionally, clear form or navigate
      setTitle('');
      setPrice('');
      setDescription('');
      setImage('');
      setCategory('electronics');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Error adding product. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Navbar />
      <Text style={styles.title}>Add Product</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={[styles.input, styles.textArea]}
      />

      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />

      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.picker}
      >
        <Picker.Item label="electronics" value="electronics" />
        <Picker.Item label="jewelery" value="jewelery" />
        <Picker.Item label="men's clothing" value="men's clothing" />
        <Picker.Item label="women's clothing" value="women's clothing" />
      </Picker>

      <View style={styles.buttonContainer}>
        <Button title="Add" onPress={handleSubmit} color="#6e57e0" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#faf8ff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    color: '#5d3fd3',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f3f0ff',
    borderColor: '#6e57e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    color: '#4b3ca7',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    backgroundColor: '#f3f0ff',
    color: '#4b3ca7',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});
