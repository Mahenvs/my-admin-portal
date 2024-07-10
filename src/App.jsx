// docker build -t react-app:dev .
// docker run -p 5173:5173 react-app-cust:dev
import "./App.css";
import ProductsList from "./components/ProductsList";
import AddProduct from "./components/AddProduct";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/RootLayout";
import NewShop from "./components/NewShop";
import { RegisterUser } from "./components/RegisterUser";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import { RedirectHome } from "./components/RedirectHome";
import AddCategory from "./components/AddCategory";
import Profile from "./components/Profile";
import OrderView from "./components/OrderView";
import OrdersList from "./components/OrdersList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <RedirectHome />,
      },
      {
        path: "/products/*",
        element: <ProductsList />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/add-category",
        element: <AddCategory />,
      },
      {
        path: "/order-view",
        element: <OrdersList />,
        children: [
          {
            path: ":orderId",
            element: <OrderView />,
          },
        ],
      },
      {
        path: "/update-profile",
        element: <Profile />,
      },
    ],
  },

  {
    path: "/auth",
    element: <RegisterUser />,
  },
  {
    path: "/create-new-shop",
    element: <NewShop />,
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </Provider>
  );
}

export default App;
