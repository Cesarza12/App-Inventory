import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function Sidebar() {
    const { can } = useAuth()

    const linkClass = ({ isActive }) =>
        `flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition ${
            isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`

    return (
        <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white">

            <div className="border-b border-gray-200 px-5 py-5">
                <h2 className="text-xl font-bold text-gray-900">
                    Inventario
                </h2>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">

                <NavLink
                    to="/inventory"
                    className={linkClass}
                >
                    <span className="mr-3">📊</span>
                    Inventario
                </NavLink>

                {can('productos.ver') && (
                    <NavLink
                        to="/products"
                        className={linkClass}
                    >
                        <span className="mr-3">📦</span>
                        Productos
                    </NavLink>
                )}

                {can('categorias.ver') && (
                    <NavLink
                        to="/categories"
                        className={linkClass}
                    >
                        <span className="mr-3">📁</span>
                        Categorías
                    </NavLink>
                )}

            </nav>

        </aside>
    )
}

export default Sidebar