import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { api } from '../services/api'

function Categories() {
    const navigate = useNavigate()
    const { can } = useAuth()

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let cancelled = false

        const fetchCategories = async () => {
            try {
               const { response, data } = await api.get('/categories')
                if (!response.ok) {
                    throw new Error('No se pudieron cargar las categorías.')
                }

                

                if (!cancelled) {
                    setCategories(data)
                }
            } catch (error) {
                if (!cancelled) {
                    setError(error.message)
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        fetchCategories()

        return () => {
            cancelled = true
        }
    }, [])

    const handleDelete = async (categoryId) => {
        const confirmed = window.confirm(
            '¿Estás seguro de eliminar esta categoría?'
        )

        if (!confirmed) {
            return
        }

        try {
           const { response, data } = await api.delete(
    `/categories/${categoryId}`
)

            if (!response.ok) {
                throw new Error(
                    data.message || 'No se pudo eliminar la categoría.'
                )
            }

            setCategories((previousCategories) =>
                previousCategories.filter(
                    (category) => category.id !== categoryId
                )
            )
        } catch (error) {
            console.error(error)
            window.alert(error.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto min-h-screen max-w-md bg-white shadow">

                <header className="bg-green-600 px-5 py-6 text-white">

                    <button
                        onClick={() => navigate('/inventory')}
                        className="text-sm opacity-80 hover:opacity-100"
                    >
                        ← Volver
                    </button>

                    <h1 className="mt-2 text-2xl font-bold">
                        Categorías
                    </h1>

                </header>

                <main className="p-5">

                    <div className="mb-5 flex items-center justify-between">

                        <h2 className="text-lg font-semibold">
                            Categorías
                        </h2>

                        {can('categorias.crear') && (
                            <button
                                onClick={() => navigate('/categories/create')}
                                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white"
                            >
                                + Nueva
                            </button>
                        )}

                    </div>

                    {loading && (
                        <p className="text-center text-gray-500">
                            Cargando categorías...
                        </p>
                    )}

                    {error && (
                        <p className="rounded-lg bg-red-50 p-3 text-center text-red-600">
                            {error}
                        </p>
                    )}

                    {!loading && !error && (
                        <div className="space-y-4">

                            {categories.length === 0 ? (
                                <p className="rounded-lg border border-gray-200 p-4 text-center text-gray-500">
                                    No hay categorías registradas.
                                </p>
                            ) : (
                                categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="rounded-xl border border-gray-200 p-4 shadow-sm"
                                    >

                                        <div>
                                            <h3 className="font-bold text-gray-800">
                                                {category.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-600">
                                                {category.description ||
                                                    'Sin descripción'}
                                            </p>
                                        </div>

                                        {(can('categorias.editar') ||
                                            can('categorias.eliminar')) && (
                                            <div className="mt-4 flex gap-2">

                                                {can('categorias.editar') && (
                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/categories/${category.id}/edit`
                                                            )
                                                        }
                                                        className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
                                                    >
                                                        Editar
                                                    </button>
                                                )}

                                                {can('categorias.eliminar') && (
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                category.id
                                                            )
                                                        }
                                                        className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white"
                                                    >
                                                        Eliminar
                                                    </button>
                                                )}

                                            </div>
                                        )}

                                    </div>
                                ))
                            )}

                        </div>
                    )}

                </main>

            </div>
        </div>
    )
}

export default Categories