import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Pages/authenticationPages/SignUp';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/authenticationPages/Login';
import SendEmail from './Pages/authenticationPages/SendEmail';
import ResetPassword from './Pages/authenticationPages/ResetPassword';
import store from './store';
import { Provider } from 'react-redux';
import AuthNotification from './Pages/authenticationPages/AuthNotification';
import SuccessfulAuthNotification from './Pages/authenticationPages/SuccessfulAuthNotification';
import SuccessfulReset from './Pages/authenticationPages/SuccessfulReset';
import EcommerceHome from './Templates/Ecommerce/Pages/EcommerceHome';
import { EditTemplatePage } from './Pages/EditTemplate/EditTemplatePage';
import { CustDashboard } from './Pages/CustDashboard/CustDashboard';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import StoreHome from './Pages/CustDashboard/EcommerceStore/StoreHome';
import ProductDescription from './Templates/Ecommerce/Pages/ProductDescription';
import Cart from './Templates/Ecommerce/Pages/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Payment from './Templates/Ecommerce/Pages/Payment';
import Receipt from './Templates/Ecommerce/Pages/Receipt';
import { FinanceEditForm } from './Templates/Finance/Components/FinanceEditForm';
import ProtectRoute from './Pages/authenticationPages/ProtectRoute';
import NonDirectPayment from './Templates/Ecommerce/Pages/NonDirectPayment';
import OrderComplete from './Templates/Ecommerce/Pages/OrderComplete';


const App: React.FC =() => {
  const loggedIn = window.localStorage.getItem('token');
  const customerRole = window.localStorage.getItem('customer');

  return (
    <Provider store={store}>
      <Router>
        <div className='app'>
        <ToastContainer 
            newestOnTop
            rtl={false}
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            theme="colored"
          />
        
          <Routes>
          <Route path='/' element={loggedIn && customerRole ? < CustDashboard/> : loggedIn && !customerRole ?<Dashboard/> : <LandingPage />}/>
            <Route path='/custdashboard/*' element={<ProtectRoute><CustDashboard /></ProtectRoute>} />
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/landing' element={<LandingPage/>}/>
            <Route path='/social/landing/:id' element={<LandingPage/>}/>
            <Route path='/resetpw1' element={<SendEmail/>}/>
            <Route path='/resetpw2/:id' element={<ResetPassword/>}/>
            <Route path='/authnotification' element={<AuthNotification/>}/>
            <Route path='/auth-success/:token' element={<SuccessfulAuthNotification/>}/>
            <Route path='/successful-reset' element={<SuccessfulReset/>}/>
            <Route
              path="/dashboard/*" element={<ProtectRoute><Dashboard /></ProtectRoute>}
            />
            <Route path='/ecommerce' element={<EcommerceHome/>}/>
            <Route path='/dashboard/project/templates/edit-template-page' element={<EditTemplatePage />} />
            <Route path='/stores/ecommerce' element={<StoreHome />} />
            <Route path='/product/:id' element={<ProductDescription />} />
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/payment' element={<Payment />}/>
            <Route path='/receipt' element={<Receipt />}/>
            <Route path='/non-direct-payment' element={<NonDirectPayment />}/>
            <Route path='/order-complete' element={<OrderComplete />}/>
            <Route path='/finance-edit-form' element={<FinanceEditForm />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App;
