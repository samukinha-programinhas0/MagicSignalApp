import React, { useContext } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { CartContext } from '../contexts/CartContext';
import RetroText from '../components/RetroText';

export default function ProductDetail({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  return (
    <ImageBackground
      source={require('../assets/papeldeparedeapp.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image source={product.image} style={styles.image} />
        <RetroText style={styles.name}>{product.name}</RetroText>
        <RetroText style={styles.price}>{product.price}</RetroText>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addToCart(product);
            navigation.navigate('Cart');
          }}
        >
          <RetroText style={styles.buttonText}>Adicionar ao Carrinho</RetroText>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, alignItems: 'center', padding: 16 },
  image: { width: 200, height: 200, marginBottom: 16 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: '#ffffffff' },
  price: { fontSize: 20, color: '#ffffffff', marginBottom: 16 },
  button: { backgroundColor: '#bb9f22ff', padding: 16, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16 }
});