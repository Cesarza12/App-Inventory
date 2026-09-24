import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext.js'
import { api } from '../services/api'

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [permissions, setPermissions] = useState([])
    const [loading, setLoading] = useState(true)
    const [mode, setMode] = useState(null)

    useEffect(() => {
        async function loadUser() {
            try {
                const { data } = await api.get('/user')

                setUser(data)
                setMode(data.mode ?? data.role)
                setPermissions(data.permissions ?? [])
            } catch (error) {
                console.error('Error al obtener el usuario:', error)
                setUser(null)
                setMode(null)
                setPermissions([])
            } finally {
                setLoading(false)
            }
        }

        loadUser()
    }, [])

    function can(permission) {
        return permissions.includes(permission)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                mode,
                permissions,
                loading,
                can,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}