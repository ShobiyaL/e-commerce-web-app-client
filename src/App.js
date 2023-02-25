import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <ChakraProvider>
<BrowserRouter>
  <Navbar/>
  <main>
    <Routes>
     <Route path='/products' element={<ProductsScreen/>}/>
     <Route path='/cart' element={<CartScreen/>}/>
     <Route path='/product/:id' element={<ProductScreen/>}/>
    </Routes>
  </main>
</BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
