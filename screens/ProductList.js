import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import RetroText from '../components/RetroText';

const products = [
  { id: '1', name: 'Pelucia do Ponce', price: 'R$ 50,00', image: require('../assets/produto1.jpg') },
  { id: '2', name: 'Chapéu', price: 'R$ 80,00', image: require('../assets/produto2.jpg') },
];

export default function ProductList({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={item.image} style={styles.image} />
            <RetroText style={styles.name}>{item.name}</RetroText>
            <RetroText style={styles.price}>{item.price}</RetroText>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('Cart')}
      >
        <RetroText style={styles.cartText}>Ir para o Carrinho</RetroText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { backgroundColor: '#fff', marginBottom: 16, padding: 16, borderRadius: 8, alignItems: 'center' },
  image: { width: 100, height: 100, marginBottom: 8 },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: '#ffffffff' },
  cartButton: { backgroundColor: '#bb9f22ff', padding: 16, borderRadius: 8, alignItems: 'center' },
  cartText: { color: '#fff', fontSize: 16 }
});