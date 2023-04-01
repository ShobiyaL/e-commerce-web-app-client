import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import ProductScreen from './screens/ProductScreen';
import Footer from './components/Footer';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ProfileScreen from './screens/ProfileScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import UserOrdersScreen from './screens/UserOrdersScreen'
import AdminConsoleScreen from './screens/AdminConsoleScreen';

function App() {
  return (
    <ChakraProvider>
<BrowserRouter>
  <Navbar/>
  <main>
    <Routes>
    <Route path='/' element={<LandingScreen/>}/>
     <Route path='/products' element={<ProductsScreen/>}/>
     <Route path='/cart' element={<CartScreen/>}/>
     <Route path='/products/:id' element={<ProductScreen/>}/>
     <Route path='/login' element={<LoginScreen/>}/>
     <Route path='/registration' element={<RegistrationScreen/>}/>
     <Route path='/profile' element={<ProfileScreen/>}/>
     <Route path='/checkout' element={<CheckoutScreen/>}/>
     <Route path='/user-orders' element={<UserOrdersScreen/>}/>
     <Route path='/admin-console' element={<AdminConsoleScreen/>}/>
    </Routes>
  </main>
  <Footer/>
</BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
