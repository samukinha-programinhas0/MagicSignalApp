import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { CartContext } from '../contexts/CartContext';
import RetroText from '../components/RetroText';

export default function Cart() {
  const { removeFromCart } = useContext(CartContext);
  const [cartItems, setCard] = useState([]);

  const SERVER_URL = 'http://192.168.15.4:3000/products'; // Substitua pelo seu IP local

  const loadCart = async () => {
    try {
      const res = await fetch(SERVER_URL);
      const data = await res.json();
      setCard(data);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
    } catch (error) {
      console.error('Erro ao remover item:', error);
    } finally {
      loadCart();
    }
  };

  return (
    <ImageBackground
      source={require('../assets/papeldeparedeapp.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <RetroText style={styles.title}>Seu Carrinho</RetroText>
        {cartItems.length === 0 ? (
          <RetroText style={styles.empty}>Seu Carrinho está vazio!</RetroText>
        ) : (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <RetroText style={styles.name}>{item.name}</RetroText>
                  <RetroText style={styles.price}>{item.price}</RetroText>
                  <TouchableOpacity onPress={() => handleRemove(item.id)}>
                    <RetroText style={styles.remove}>Remover</RetroText>
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity style={styles.checkoutButton} onPress={() => console.log("Finalizar compra")}>
              <RetroText style={styles.checkoutText}>Prosseguir com a compra</RetroText>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#ffffffff' }, 
  empty: { fontSize: 16, color: '#ffffffff', textAlign: 'center' }, 
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontSize: 16, color: '#ffffffff' },
  price: { fontSize: 16, color: '#ffffffff' }, 
  remove: { color: 'red', marginLeft: 8 },
  checkoutButton: {
    backgroundColor: '#ffffffff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});