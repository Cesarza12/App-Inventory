import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext.js'

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [permissions, setPermissions] = useState([])
    const [loading, setLoading] = useState(true)
    const [mode, setMode] = useState(null)

    useEffect(() => {
        async function loadUser() {
            try {
                const response = await fetch('/api/user', {
                    credentials: 'include',
                })

                if (!response.ok) {
                    setUser(null)
                    setMode(null)
                    setPermissions([])
                    return
                }

                const data = await response.json()

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