import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'

function AuthCheck({ children, user, isAuthenticate, authCheck }) {

    const location = useLocation()
    const path = location.pathname

    const isAuthPage = path.startsWith('/auth/login') || path.startsWith('/auth/register')
    const isUnauthPage = path === '/unauth-page'
    const isProfilePage = path === '/profile'
    const isAdminArea = path === '/admin' || path.startsWith('/admin/')
    const isSuperAdminArea = path === '/superadmin' || path.startsWith('/superadmin/')
    const isCustomerArea = !isAdminArea && !isSuperAdminArea && !isUnauthPage && !isAuthPage && !isProfilePage

    // each role's own home
    const homePath =
        user?.role === 'superadmin' ? '/superadmin' :
        user?.role === 'admin' ? '/admin' : '/'

    // 1. logged out: only login/register
    if (!isAuthenticate && !authCheck && !isAuthPage) {
        return <Navigate to='/auth/login' replace />
    }

    if (isAuthenticate && authCheck) {

        // 2. logged in: keep off login/register
        if (isAuthPage) {
            return <Navigate to={homePath} replace />
        }

        // 3. customer: only customer pages
        if (user?.role !== 'admin' && user?.role !== 'superadmin' && (isAdminArea || isSuperAdminArea)) {
            return <Navigate to='/unauth-page' replace />
        }

        // 4. admin: only /admin (customer pages go to their home, superadmin area is blocked)
        if (user?.role === 'admin') {
            if (isSuperAdminArea) return <Navigate to='/unauth-page' replace />
            if (isCustomerArea) return <Navigate to='/admin' replace />
        }

        // 5. superadmin: only /superadmin
        if (user?.role === 'superadmin') {
            if (isAdminArea) return <Navigate to='/unauth-page' replace />
            if (isCustomerArea) return <Navigate to='/superadmin' replace />
        }
    }

    return <>{children}</>
}

export default AuthCheck