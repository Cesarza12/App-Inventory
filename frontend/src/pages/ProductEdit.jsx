import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../services/api'

function ProductEdit() {
    const navigate = useNavigate()
    const { id: productId } = useParams()


    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const [form, setForm] = useState({
        name: '',
        code: '',
        category_id: '',
        description: '',
        price: '',
        stock: '',
        minimum_stock: '',
    })

    useEffect(() => {
        async function loadData() {
            try {
               const [
    { response: productResponse, data: product },
    { response: categoriesResponse, data: categoriesData },
] = await Promise.all([
    api.get(`/products/${productId}`),
    api.get('/categories'),
])

                if (!productResponse.ok) {
                    throw new Error('No se pudo cargar el producto')
                }

                if (!categoriesResponse.ok) {
                    throw new Error('No se pudieron cargar las categorías')
                }

              

                setForm({
                    name: product.name ?? '',
                    code: product.code ?? '',
                    category_id: product.category_id ?? '',
                    description: product.description ?? '',
                    price: product.price ?? '',
                    stock: product.stock ?? '',
                    minimum_stock: product.minimum_stock ?? '',
                })

                setCategories(categoriesData)
                setLoading(false)

            } catch (error) {
                console.error(error)
                setError(error.message)
                setLoading(false)
            }
        }

        loadData()
    }, [productId])

    function handleChange(event) {
        const { name, value } = event.target

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }))
    }

    async function handleSubmit(event) {
    event.preventDefault()

    setSaving(true)
    setError('')
    setMessage('')

    try {
        // Obtener la cookie CSRF de Laravel
       const { response, data } = await api.put(
    `/products/${productId}`,
    {
        name: form.name,
        code: form.code,
        category_id: Number(form.category_id),
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        minimum_stock: Number(form.minimum_stock),
    }
)

        if (!response.ok) {
            if (data.errors) {
                const validationErrors = Object.values(data.errors)
                    .flat()
                    .join(' ')

                throw new Error(validationErrors)
            }

            throw new Error(
                data.message || 'No se pudo actualizar el producto'
            )
        }

        setMessage('Producto actualizado correctamente.')

        setTimeout(() => {
          navigate('/products')
       }, 800)
    } catch (error) {
        console.error(error)
        setError(error.message)
    } finally {
        setSaving(false)
    }
}

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto min-h-screen max-w-md bg-white p-5 shadow">
                    <p className="text-center text-gray-500">
                        Cargando producto...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto min-h-screen max-w-md bg-white shadow">

                <header className="bg-blue-600 px-5 py-5 text-white">

                    <button
                       onClick={() => navigate('/products')}
                        className="text-sm opacity-80"
>
                        ← Volver a productos
                    </button>

                    <h1 className="mt-2 text-2xl font-bold">
                        Editar producto
                    </h1>

                </header>

                <main className="p-5">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
                                Nombre
                            </label>

                            <input
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
                                Código
                            </label>

                            <input
                                name="code"
                                type="text"
                                value={form.code}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
                                Categoría
                            </label>

                            <select
                                name="category_id"
                                value={form.category_id}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border bg-white px-4 py-3 outline-none focus:border-blue-500"
                            >
                                <option value="">
                                    Selecciona una categoría
                                </option>

                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
                                Descripción
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
                                Precio
                            </label>

                            <input
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={form.price}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
                                Stock
                            </label>

                            <input
                                name="stock"
                                type="number"
                                min="0"
                                value={form.stock}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
                                Stock mínimo
                            </label>

                            <input
                                name="minimum_stock"
                                type="number"
                                min="0"
                                value={form.minimum_stock}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        {error && (
                            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50"
                        >
                            {saving
                                ? 'Guardando...'
                                : 'Actualizar producto'}
                        </button>

                    </form>

                </main>
            </div>
        </div>
    )
}

export default ProductEdit