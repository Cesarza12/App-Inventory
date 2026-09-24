import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { api } from '../services/api'

function Products() {
    const { can } = useAuth()
    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')

    useEffect(() => {
                

        const params = search
            ? `?search=${encodeURIComponent(search)}`
            : ''

        api.get(`/products${params}`)
            .then(({ data }) => {
                setProducts(data)
            })
            .catch((error) => {
                console.error(error)

                if (error.status === 401) {
                    setError(
                        'Tu sesión ha expirado. Inicia sesión nuevamente.'
                    )
                    return
                }

                if (error.status === 403) {
                    setError(
                        'No tienes permiso para consultar los productos.'
                    )
                    return
                }

                if (error.status === 404) {
                    setError(
                        'No se encontraron los productos solicitados.'
                    )
                    return
                }

                setError(
                    'No se pudieron cargar los productos. Inténtalo nuevamente.'
                )
            })
            .finally(() => {
                setLoading(false)
            })
    }, [search])

    async function handleDelete(productId) {
        const confirmed = window.confirm(
            '¿Estás seguro de que deseas eliminar este producto?'
        )

        if (!confirmed) {
            return
        }

        try {
            await api.delete(`/products/${productId}`)

            setProducts((previousProducts) =>
                previousProducts.filter(
                    (product) => product.id !== productId
                )
            )
        } catch (error) {
            console.error(error)

            if (error.status === 401) {
                window.alert(
                    'Tu sesión ha expirado. Inicia sesión nuevamente.'
                )
                return
            }

            if (error.status === 403) {
                window.alert(
                    'No tienes permiso para eliminar productos.'
                )
                return
            }

            if (error.status === 404) {
                window.alert(
                    'El producto ya no existe o no fue encontrado.'
                )
                return
            }

            if (error.status === 422) {
                const validationMessage = error.errors
                    ? Object.values(error.errors)
                          .flat()
                          .join(' ')
                    : 'Los datos enviados no son válidos.'

                window.alert(validationMessage)
                return
            }

            window.alert(
                'No se pudo eliminar el producto. Inténtalo nuevamente.'
            )
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto min-h-screen max-w-md bg-white shadow">

                {/* Encabezado */}
                <header className="bg-blue-600 px-5 py-5 text-white">

                    <button
                        onClick={() => navigate('/inventory')}
                        className="text-sm opacity-80"
                    >
                        ← Volver
                    </button>

                    <h1 className="mt-2 text-2xl font-bold">
                        Productos
                    </h1>

                </header>

                {/* Contenido */}
                <main className="p-5">

                    <div className="mb-5">
                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Buscar por nombre o código..."
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-5 flex items-center justify-between">

                        <h2 className="text-lg font-semibold">
                            Inventario
                        </h2>

                        {can('productos.crear') && (
                            <button
                                onClick={() =>
                                    navigate('/products/create')
                                }
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                            >
                                + Nuevo
                            </button>
                        )}

                    </div>

                    {loading && (
                        <p className="text-center text-gray-500">
                            Cargando productos...
                        </p>
                    )}

                    {error && (
                        <p className="rounded-lg bg-red-50 p-3 text-center text-red-600">
                            {error}
                        </p>
                    )}

                    {!loading && !error && products.length === 0 && (
                        <p className="rounded-lg bg-gray-50 p-4 text-center text-gray-500">
                            No se encontraron productos.
                        </p>
                    )}

                    {!loading && !error && products.length > 0 && (
                        <div className="space-y-4">

                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="rounded-xl border border-gray-200 p-4 shadow-sm"
                                >

                                    <div className="flex justify-between gap-3">

                                        <div>
                                            <h3 className="font-bold text-gray-800">
                                                {product.name}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                {product.code}
                                            </p>
                                        </div>

                                        <p className="font-bold text-blue-600">
                                            ${product.price}
                                        </p>

                                    </div>

                                    <p className="mt-2 text-sm text-gray-600">
                                        {product.description}
                                    </p>

                                    <div className="mt-3 flex justify-between text-sm">

                                        <span>
                                            Categoría:{' '}
                                            <strong>
                                                {product.category?.name ??
                                                    'Sin categoría'}
                                            </strong>
                                        </span>

                                        <span>
                                            Stock:{' '}
                                            <strong>
                                                {product.stock}
                                            </strong>
                                        </span>

                                    </div>

                                    <div className="mt-4 flex gap-2">

                                        {can('productos.editar') && (
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/products/${product.id}/edit`
                                                    )
                                                }
                                                className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
                                            >
                                                ✏️ Editar
                                            </button>
                                        )}

                                        {can('productos.eliminar') && (
                                            <button
                                                onClick={() =>
                                                    handleDelete(product.id)
                                                }
                                                className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white"
                                            >
                                                🗑️ Eliminar
                                            </button>
                                        )}

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </main>
            </div>
        </div>
    )
}

export default Products