import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { api } from '../services/api'

function Inventory() {
    const { mode } = useAuth()
    const navigate = useNavigate()

    const [productsCount, setProductsCount] = useState(0)
    const [categoriesCount, setCategoriesCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let cancelled = false

        async function loadCounts() {
            try {
                setError('')

                const [{ data: products }, { data: categories }] =
                    await Promise.all([
                        api.get('/products'),
                        api.get('/categories'),
                    ])

                if (!cancelled) {
                    setProductsCount(products.length)
                    setCategoriesCount(categories.length)
                }
            } catch (error) {
                if (!cancelled) {
                    if (error.status === 401) {
                        setError(
                            'Tu sesión ha expirado. Inicia sesión nuevamente.'
                        )
                    } else if (error.status === 403) {
                        setError(
                            'No tienes permisos para consultar los datos del inventario.'
                        )
                    } else if (error.status === 404) {
                        setError('No se encontró el recurso solicitado.')
                    } else {
                        setError(
                            error.message ||
                                'Ocurrió un error al cargar el inventario.'
                        )
                    }
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        loadCounts()

        return () => {
            cancelled = true
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto min-h-screen max-w-md bg-white shadow">
                <header className="bg-blue-600 px-5 py-5 text-white">
                    <a
                        href={
                            mode === 'worker'
                                ? 'http://127.0.0.1:8000/worker'
                                : 'http://127.0.0.1:8000/admin'
                        }
                        className="text-sm text-blue-100 hover:text-white"
                    >
                        ←{' '}
                        {mode === 'worker'
                            ? 'Panel trabajador'
                            : 'Panel administrador'}
                    </a>

                    <h1 className="mt-4 text-2xl font-bold">
                        Sistema de inventario
                    </h1>
                </header>

                <main className="p-5">
                    <section className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl bg-blue-50 p-5">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-500">
                                    Productos
                                </p>

                                <span className="text-xl">📦</span>
                            </div>

                            <p className="mt-3 text-3xl font-bold text-gray-800">
                                {loading ? '...' : productsCount}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-green-50 p-5">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-500">
                                    Categorías
                                </p>

                                <span className="text-xl">📁</span>
                            </div>

                            <p className="mt-3 text-3xl font-bold text-gray-800">
                                {loading ? '...' : categoriesCount}
                            </p>
                        </div>
                    </section>

                    {error && (
                        <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <section className="mt-7">
                        <h2 className="mb-3 text-lg font-bold text-gray-800">
                            Opciones
                        </h2>

                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/products')}
                                className="flex w-full items-center rounded-2xl bg-blue-600 px-5 py-4 text-left text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
                            >
                                <span className="text-2xl">📦</span>

                                <span className="ml-4 flex-1 font-semibold">
                                    Productos
                                </span>

                                <span className="text-xl opacity-70">→</span>
                            </button>

                            <button
                                onClick={() => navigate('/categories')}
                                className="flex w-full items-center rounded-2xl bg-green-600 px-5 py-4 text-left text-white shadow-sm transition hover:bg-green-700 active:scale-[0.99]"
                            >
                                <span className="text-2xl">📁</span>

                                <span className="ml-4 flex-1 font-semibold">
                                    Categorías
                                </span>

                                <span className="text-xl opacity-70">→</span>
                            </button>

                            <button
                                className="flex w-full items-center rounded-2xl bg-orange-500 px-5 py-4 text-left text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.99]"
                            >
                                <span className="text-2xl">📊</span>

                                <span className="ml-4 flex-1 font-semibold">
                                    Movimientos
                                </span>

                                <span className="text-xl opacity-70">→</span>
                            </button>
                        </div>
                    </section>

                    <section className="mt-7 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                        <div className="flex items-center gap-2">
                            <span
                                className={`h-2.5 w-2.5 rounded-full ${
                                    error
                                        ? 'bg-red-500'
                                        : loading
                                        ? 'bg-gray-400'
                                        : 'bg-green-500'
                                }`}
                            ></span>

                            <span className="text-sm text-gray-500">
                                API
                            </span>
                        </div>

                        <span
                            className={`text-sm font-semibold ${
                                error
                                    ? 'text-red-600'
                                    : loading
                                    ? 'text-gray-400'
                                    : 'text-green-600'
                            }`}
                        >
                            {loading
                                ? 'Comprobando...'
                                : error
                                ? 'Error'
                                : 'Conectada'}
                        </span>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Inventory