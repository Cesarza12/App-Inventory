import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function PermissionRoute({ permission }) {
    const { can, loading } = useAuth()

    if (loading) {
        return <div>Cargando...</div>
    }

    if (!can(permission)) {
        return <Navigate to="/inventory" replace />
    }

    return <Outlet />
}

export default PermissionRoute