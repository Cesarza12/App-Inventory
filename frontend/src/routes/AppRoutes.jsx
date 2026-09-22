import { Routes, Route, Navigate } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'
import PermissionRoute from './PermissionRoute'

import DashboardLayout from '../layouts/DashboardLayout'

import Inventory from '../pages/Inventory'
import Products from '../pages/Products'
import ProductCreate from '../pages/ProductCreate'
import ProductEdit from '../pages/ProductEdit'

import Categories from '../pages/Categories'
import CategoryCreate from '../pages/CategoryCreate'
import CategoryEdit from '../pages/CategoryEdit'

function AppRoutes() {
    return (
        <Routes>

            {/* Rutas privadas */}
           <Route element={<ProtectedRoute />}>

    <Route element={<DashboardLayout />}>

        <Route
            path="/inventory"
            element={<Inventory />}
        />

        <Route
            path="/products"
            element={<Products />}
        />

        <Route element={<PermissionRoute permission="productos.crear" />}>
              <Route
               path="/products/create"
             element={<ProductCreate />}
         />
         </Route>

        <Route element={<PermissionRoute permission="productos.editar" />}>
    <Route
        path="/products/:id/edit"
        element={<ProductEdit />}
    />
</Route>

        <Route
            path="/categories"
            element={<Categories />}
        />

       <Route element={<PermissionRoute permission="categorias.crear" />}>
    <Route
        path="/categories/create"
        element={<CategoryCreate />}
    />
</Route>

        <Route element={<PermissionRoute permission="categorias.editar" />}>
    <Route
        path="/categories/:id/edit"
        element={<CategoryEdit />}
    />
</Route>

        <Route
            path="/"
            element={<Navigate to="/inventory" replace />}
        />

    </Route>

</Route>

            {/* Página no encontrada */}
            <Route
                path="*"
                element={
                    <div className="min-h-screen bg-gray-100 p-5">
                        <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow">
                            <h1 className="text-2xl font-bold text-gray-800">
                                404
                            </h1>

                            <p className="mt-2 text-gray-600">
                                Página no encontrada.
                            </p>
                        </div>
                    </div>
                }
            />

        </Routes>
    )
}

export default AppRoutes