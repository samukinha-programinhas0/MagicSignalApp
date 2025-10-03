import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './screens/ProductList';
import ProductDetail from './screens/ProductDetail';
import Cart from './screens/Cart';
import { CartProvider } from './contexts/CartContext';
import { Text, View, ActivityIndicator, ImageBackground, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    RetroGaming: require('./assets/fonts/RetroGaming.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const RetroText = (props) => (
    <Text {...props} style={[props.style, { fontFamily: 'RetroGaming' }]} />
  );

  return (
    <CartProvider>
      <ImageBackground
        source={require('./assets/papeldeparedeapp.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ProductList">
            <Stack.Screen
              name="ProductList"
              component={ProductList}
              options={{ title: 'Produtos', headerShown: true }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{ title: 'Detalhes do Produto' }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{ title: 'Carrinho' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
});