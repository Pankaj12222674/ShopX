import React, { useEffect } from 'react'                          // ADDED: useEffect
import { Routes, Route } from "react-router-dom"
import AuthLayout from './components/auth/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthCheck from './components/auth/AuthCheck'
import Navbar from './components/Navbar'
import { useSelector, useDispatch } from 'react-redux'            // ADDED: useDispatch
import { profile } from './redux/features/authSlice'              // ADDED
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminProducts from './admin/pages/AdminProducts'
import AdminCategories from './admin/pages/AdminCategories'
import AdminOrders from './admin/pages/AdminOrders'
import AdminCustomers from './admin/pages/AdminCustomers'
import AdminSettings from './admin/pages/AdminSettings'
import Profile from './pages/Profile'
import Home from './pages/customer/Home'
import Products from './pages/customer/Products'
import ProductDetails from './pages/customer/ProductDetails'
import Cart from './pages/customer/Cart'
import Checkout from './pages/customer/Checkout'
import OrderSuccess from './pages/customer/OrderSuccess'
import MyOrders from './pages/customer/MyOrders'
import OrderDetails from './pages/customer/OrderDetails'
import SuperAdminDashboard from './pages/superadmin/Dashboard'
import SuperAdminUsers from './pages/superadmin/Users'
import SuperAdminUserDetails from './pages/superadmin/UserDetails'
import SuperAdminEditUser from './pages/superadmin/EditUser'
import SuperAdminAdmins from './pages/superadmin/Admins'
import SuperAdminCreateAdmin from './pages/superadmin/CreateAdmin'
import SuperAdminActivity from './pages/superadmin/Activity'
import SuperAdminProducts from './pages/superadmin/ProductsOverview'
import SuperAdminOrders from './pages/superadmin/OrdersOverview'
import SuperAdminReports from './pages/superadmin/Reports'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Notifications from './pages/Notifications'
import Help from './pages/Help'
import SupportManagement from './pages/SupportManagement'

function App() {
  const { user, isAuthenticate, authCheck, token } = useSelector((state) => state.auth)  // ADDED: token
  const dispatch = useDispatch()                                  // ADDED

  // ADDED: restore the user after a page refresh
  useEffect(() => {
    if (token) dispatch(profile())
  }, [dispatch, token])

  // ADDED: wait for the profile, otherwise a refresh redirects to login first
  if (token && !isAuthenticate) return <p>Loading...</p>

  return (
    <div>
      <Routes>
        <Route path='/forgot-password' element={<AuthLayout />}>
          <Route index element={<ForgotPassword />} />
        </Route>
        <Route path='/reset-password/:token' element={<AuthLayout />}>
          <Route index element={<ResetPassword />} />
        </Route>
        <Route path='/auth' element={<AuthCheck isAuthenticate={isAuthenticate} authCheck={authCheck} user={user}><AuthLayout /></AuthCheck>}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        <Route path='/' element={<AuthCheck isAuthenticate={isAuthenticate} authCheck={authCheck} user={user}> <Navbar /></AuthCheck>}>
          {/* ADDED: child route, otherwise <Outlet /> in Navbar shows nothing */}
          <Route index element={<Home />} />
          <Route path='profile' element={<Profile />} />
          <Route path='notifications' element={<Notifications />} />
          <Route path='help' element={<Help />} />
          <Route path='products' element={<Products />} />
          <Route path='products/:id' element={<ProductDetails />} />
          <Route path='cart' element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='order-success' element={<OrderSuccess />} />
          <Route path='orders' element={<MyOrders />} />
          <Route path='orders/:id' element={<OrderDetails />} />
        </Route>

        <Route path='/admin' element={<AuthCheck isAuthenticate={isAuthenticate} authCheck={authCheck} user={user}><Navbar /></AuthCheck>}>
          <Route index element={<AdminDashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='categories' element={<AdminCategories />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='customers' element={<AdminCustomers />} />
          <Route path='settings' element={<AdminSettings />} />
          <Route path='support' element={<SupportManagement />} />
        </Route>

        <Route path='/superadmin' element={<AuthCheck isAuthenticate={isAuthenticate} authCheck={authCheck} user={user}> <Navbar /></AuthCheck>}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path='users' element={<SuperAdminUsers />} />
          <Route path='users/:id' element={<SuperAdminUserDetails />} />
          <Route path='users/:id/edit' element={<SuperAdminEditUser />} />
          <Route path='admins' element={<SuperAdminAdmins />} />
          <Route path='create-admin' element={<SuperAdminCreateAdmin />} />
          <Route path='activity' element={<SuperAdminActivity />} />
          <Route path='products' element={<SuperAdminProducts />} />
          <Route path='orders' element={<SuperAdminOrders />} />
          <Route path='reports' element={<SuperAdminReports />} />
          <Route path='profile' element={<Profile />} />
          <Route path='support' element={<SupportManagement />} />
        </Route>

        {/* ADDED: redirect target used by AuthCheck */}
          <Route path='/unauth-page' element={<div>You are not allowed to view this page</div>} />

        {/* ADDED: unknown URLs */}
        <Route path='*' element={<div>Page not found</div>} />
      </Routes>
    </div>
  )
}

export default App