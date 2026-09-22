import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function ProtectedRoute() {
    const { user, loading } = useAuth()

    useEffect(() => {
        if (!loading && !user) {
            window.location.href = 'http://127.0.0.1:8000/login'
        }
    }, [loading, user])

    if (loading) {
        return <div>Cargando...</div>
    }

    if (!user) {
        return null
    }

    return <Outlet />
}

export default ProtectedRoute