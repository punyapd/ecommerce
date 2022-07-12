import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import './bootstrap.min (2).css'
import { HashRouter , Routes , Route } from 'react-router-dom';
import Header from './components/Header';
import Homescreen from './pages/Homescreen';
import LoginPage from './pages/LoginPage';
import PlaceOrder from './pages/PlaceOrder';

import ProductDetails from './pages/ProductDetails';
import CartScreen from './pages/CartScreen';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from   './pages/AdminPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import OrderDetails from './pages/OrderDetails';
import Success from './components/Success';
import Failure from './components/Failure';
import UserEditPage from './pages/UserEditPage';
import ProductsList from './pages/ProductsList';
import EditProductPage from './pages/EditProductPage';
import OrderListPage from './pages/OrderListPage'


function App() {
  
  return (
    <div className="App">
      <HashRouter>
      <Header />
      <Routes>
      <Route  path='/' element = {<Homescreen/>} />
      <Route path='/product/:id' element = {<ProductDetails/>} />
      <Route path='/cart' element = {<CartScreen/>} />
      <Route path = '/cart/:id/' element = {<CartScreen />} />
      <Route path = '/login' element = {<LoginPage />} />
      <Route path = '/register' element = {<RegisterPage />} />
      <Route path = '/profile'  element = {<ProfilePage />} />
      <Route path = '/admin/userlists'  element = {<AdminPage />} />
      <Route path = '/admin/user/:id/edit'  element = {<UserEditPage />} />
      <Route path = '/admin/orderslist'  element = {<OrderListPage />} />

      <Route path = '/shipping'  element = {<ShippingPage />} />
      <Route path = '/payment'  element = {<PaymentPage />} />
      <Route path = '/placeorder'  element = {<PlaceOrder />} />
      <Route path = '/order/:id'  element = {<OrderDetails />} />
      <Route path = 'order/success/:id'  element = {<Success />} />
      <Route path = '/failure/:id'  element = {<Failure />} />
      <Route path = '/admin/products'  element = {<ProductsList />} />
      <Route path = '/admin/product/:id/edit'  element = {<EditProductPage />} />

       
      </Routes>
      </HashRouter>
     

     
      
    </div>
  );
}

export default App;
