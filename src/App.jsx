import './App.css';
import ProductsList from './components/ProductsList';
import AddProduct from './components/AddProduct';

import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './components/RootLayout';
import  { useContext } from 'react';
import AuthContext from './components/AuthContext';
import AuthProvider from './components/AuthProvider';
import NewShop from './Customer/NewShop';
import { RegisterUser } from './components/RegisterUser';
import { CustomerRootLayout } from './Customer/CustomerRootLayout';
import CheckOut from './Customer/CheckOut';
import Home from './Customer/Home';
import {Provider } from 'react-redux';
import appStore from './store/appStore';
// import { PersistGate } from 'redux-persist/integration/react';
// import store, { persistor } from './store/appStore'; // Import persistor from store

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useContext(AuthContext); // Access authentication state from AuthContext

  // Check if user is logged in, redirect to login if not
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Render protected component if user is logged in
  return element;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/products',
        element:<ProductsList />
        // element: <ProtectedRoute element={<ProductsList />} />,
      },
      {
        path: '/add-product',
        element:<AddProduct/>
        // element: <ProtectedRoute element={<AddProduct />} />,
      }      
    ],
  },

  {
    path: '/register',
    element: <RegisterUser />,
  },
  {
    path: '/create-new-shop',
    element:<NewShop/>
  },
  {
    path: '/Customer',
    element: <CustomerRootLayout />,
    children: [
      
      {
        path: '/Customer/:storeDomain', // Combined path with the parent route
        element: <Home />, // This will render at '/Customer/shopping-cart'
      },
      {
        path: 'shopping-cart', // Combined path with the parent route
        element: <CheckOut />, // This will render at '/Customer/shopping-cart'
      }
    ],
  },
  
  
]);

function App() {
  return (
    <AuthProvider> 
      <Provider store={appStore}>
      {/* <PersistGate loading={null} persistor={persistor}> */}

        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>
        {/* </PersistGate> */}
      </Provider>
    </AuthProvider>
  );
}

export default App;
