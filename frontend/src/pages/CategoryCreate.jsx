import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

function CategoryCreate() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        description: '',
    })

    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [validationErrors, setValidationErrors] = useState({})

    function handleChange(event) {
        const { name, value } = event.target

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }))

        setValidationErrors((previous) => ({
            ...previous,
            [name]: undefined,
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()

        setSaving(true)
        setError('')
        setMessage('')
        setValidationErrors({})

        try {
            await api.post('/categories', {
                name: form.name,
                description: form.description,
            })

            setMessage('Categoría creada correctamente.')

            setForm({
                name: '',
                description: '',
            })

            setTimeout(() => {
                navigate('/categories')
            }, 800)
        } catch (error) {
            console.error(error)

            if (error.status === 422) {
                setValidationErrors(error.errors || {})
            } else if (error.status === 401) {
                setError(
                    'Tu sesión ha expirado. Inicia sesión nuevamente.'
                )
            } else if (error.status === 403) {
                setError(
                    'No tienes permisos para crear categorías.'
                )
            } else if (error.status === 404) {
                setError('No se encontró el recurso solicitado.')
            } else {
                setError(
                    error.message ||
                        'Ocurrió un error inesperado al crear la categoría.'
                )
            }
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto min-h-screen max-w-md bg-white shadow">
                <header className="bg-green-600 px-5 py-5 text-white">
                    <button
                        onClick={() => navigate('/categories')}
                        className="text-sm opacity-80"
                    >
                        ← Volver a categorías
                    </button>

                    <h1 className="mt-2 text-2xl font-bold">
                        Nueva categoría
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
                              placeholder="Ej. Electrónica"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-500"
                            />

                            {validationErrors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {validationErrors.name[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
                                Descripción
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Descripción de la categoría"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-500"
                            />

                            {validationErrors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {validationErrors.description[0]}
                                </p>
                            )}
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
                            className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white shadow hover:bg-green-700 disabled:opacity-50"
                        >
                            {saving
                                ? 'Guardando...'
                                : 'Guardar categoría'}
                        </button>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default CategoryCreate