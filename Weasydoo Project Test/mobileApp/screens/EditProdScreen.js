import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import Navbar from '../components/NavBar';

export default function EditProductScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setPrice(data.price.toString());
        setDescription(data.description);
        setCategory(data.category);
        setImage(data.image);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async () => {
    const updatedProduct = {
      title,
      price: parseFloat(price),
      description,
      image,
      category,
    };

    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();
      console.log('Product updated:', data);
      Alert.alert('Success', 'Product successfully updated!');
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Error updating product. Please try again.');
    }
  };

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Navbar />
      <Text style={styles.title}>Modifier le produit</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Price"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.textArea}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="Image URL"
      />

      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Electronics" value="electronics" />
        <Picker.Item label="Jewelery" value="jewelery" />
        <Picker.Item label="Men's clothing" value="men's clothing" />
        <Picker.Item label="Women's clothing" value="women's clothing" />
      </Picker>

      <Button title="Save Changes" onPress={handleSubmit} color="#5d3fd3" />
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
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#5d3fd3',
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 8,
  },
  loadingText: {
    padding: 20,
    textAlign: 'center',
    color: '#5d3fd3',
  },
});
