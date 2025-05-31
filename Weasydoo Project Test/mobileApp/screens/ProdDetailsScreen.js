import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import NavBar from '../components/NavBar';


export default function ProductDetailsScreen({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#5d3fd3" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <NavBar />
      <Text style={styles.title}>{product.title}</Text>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <Text style={styles.label}><Text style={styles.bold}>Price :</Text> ${product.price}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Category :</Text> {product.category}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Description :</Text> {product.description}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Rate :</Text> ⭐ {product.rating?.rate} / 5</Text>
      <Text style={styles.label}><Text style={styles.bold}>Reviews :</Text> {product.rating?.count}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#faf8ff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faf8ff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5d3fd3',
    marginBottom: 12,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#3d2e99',
  },
  bold: {
    fontWeight: 'bold',
  },
});
