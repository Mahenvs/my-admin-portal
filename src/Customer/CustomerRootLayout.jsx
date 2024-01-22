import { Outlet } from "react-router-dom"

import CustomerLayout from "./CustomerLayOut"
  
export const CustomerRootLayout = ({children}) =>{
    return<>
      <CustomerLayout>
        {children}
      </CustomerLayout>
    </>
}