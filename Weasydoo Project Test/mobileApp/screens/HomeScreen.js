import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/NavBar';

export default function HomeScreen({ navigation }) {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const result = await fetch('https://fakestoreapi.com/products');
            const data = await result.json();
            setProducts(data);
            setLoading(false);
        }
        async function fetchCategories() {
            const result = await fetch('https://fakestoreapi.com/products/categories');
            const data = await result.json();
            setCategories(data);
        }
        fetchData();
        fetchCategories();
    }, []);

    const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
    });

    const handleDelete = (id) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this product?',
        [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: async () => {
            try {
                await fetch(`https://fakestoreapi.com/products/${id}`, { method: 'DELETE' });
                setProducts(products.filter(p => p.id !== id));
                Alert.alert('Success', 'Product deleted successfully');
            } catch (error) {
                Alert.alert('Error', 'Failed to delete product');
            }
            }, style: 'destructive'
        }
        ]
    );
};

    if (loading) return <Text>Loading products...</Text>;

return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.title}>Welcome to the Store 🛍️</Text>
      
      {user?.role === 'admin' && (
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Add')}>
          <Text style={styles.addButtonText}>Add New Product</Text>
        </TouchableOpacity>
      )}

      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={setSelectedCategory}
        >
          <Picker.Item label="All categories" value="all" />
          {categories.map(cat => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.productCategory}>{item.category}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>

            <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('ProductDetails', { id: item.id })}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>

            {user?.role === 'admin' && (
              <View style={styles.adminButtons}>
                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Edit', { id: item.id })}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#faf8ff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#5d3fd3', textAlign: 'center', marginBottom: 16 },
  addButton: { backgroundColor: '#6e57e0', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  addButtonText: { color: 'white', fontWeight: 'bold' },
  filterContainer: { flexDirection: 'row', marginBottom: 16, alignItems: 'center', justifyContent: 'space-between' },
  searchInput: { flex: 1, height: 40, borderColor: '#6e57e0', borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, color: '#4b3ca7', backgroundColor: '#f3f0ff' },
  picker: { width: 150, height: 40, color: '#4b3ca7', backgroundColor: '#f3f0ff', borderRadius: 8 },
  productList: { paddingBottom: 50 },
  card: { flex: 1, backgroundColor: 'white', margin: 8, borderRadius: 8, padding: 10, shadowColor: '#6e57e0', shadowOpacity: 0.2, shadowRadius: 5, elevation: 3 },
  productImage: { width: '100%', height: 120, resizeMode: 'contain', marginBottom: 8 },
  productTitle: { fontWeight: 'bold', fontSize: 14, marginBottom: 4, color: '#3d2e99' },
  productCategory: { fontStyle: 'italic', fontSize: 12, color: '#7c6edb', marginBottom: 4 },
  productPrice: { fontWeight: 'bold', fontSize: 14, color: '#5d3fd3', marginBottom: 8 },
  detailsButton: { backgroundColor: '#a692f3', padding: 8, borderRadius: 6, alignItems: 'center', marginBottom: 4 },
  detailsButtonText: { color: 'white' },
  adminButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  editButton: { flex: 1, backgroundColor: '#5d3fd3', padding: 6, borderRadius: 6, marginRight: 4, alignItems: 'center' },
  editButtonText: { color: 'white' },
  deleteButton: { flex: 1, backgroundColor: '#d94e70', padding: 6, borderRadius: 6, marginLeft: 4, alignItems: 'center' },
  deleteButtonText: { color: 'white' },
});