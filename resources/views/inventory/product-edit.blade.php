<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Editar producto</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#2563eb">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Inventario">
</head>

<body class="min-h-screen bg-gray-100">

    <div class="mx-auto min-h-screen max-w-md bg-white shadow">

        <header class="bg-blue-600 px-5 py-5 text-white">

            <a href="/products" class="text-sm opacity-80">
                ← Volver a productos
            </a>

            <h1 class="mt-2 text-2xl font-bold">
                Editar producto
            </h1>

        </header>

        <main class="p-5">

            <form id="product-edit-form" class="space-y-4">

                <div>
                    <label
                        for="edit-name"
                        class="mb-1 block text-sm font-semibold text-gray-700">
                        Nombre
                    </label>

                    <input
                        id="edit-name"
                        type="text"
                        required
                        class="w-full rounded-lg border px-4 py-3">
                </div>

                <div>
                    <label
                        for="edit-code"
                        class="mb-1 block text-sm font-semibold text-gray-700">
                        Código
                    </label>

                    <input
                        id="edit-code"
                        type="text"
                        required
                        class="w-full rounded-lg border px-4 py-3">
                </div>

                <div>
                    <label
                        for="edit-category"
                        class="mb-1 block text-sm font-semibold text-gray-700">
                        Categoría
                    </label>

                    <select
                        id="edit-category"
                        required
                        class="w-full rounded-lg border bg-white px-4 py-3">
                    </select>
                </div>

                <div>
                    <label
                        for="edit-description"
                        class="mb-1 block text-sm font-semibold text-gray-700">
                        Descripción
                    </label>

                    <textarea
                        id="edit-description"
                        rows="3"
                        class="w-full rounded-lg border px-4 py-3"></textarea>
                </div>

                <div>
                    <label
                        for="edit-price"
                        class="mb-1 block text-sm font-semibold text-gray-700">
                        Precio
                    </label>

                    <input
                        id="edit-price"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        class="w-full rounded-lg border px-4 py-3">
                </div>

                <div>
                    <label
                        for="edit-stock"
                        class="mb-1 block text-sm font-semibold text-gray-700">
                        Stock
                    </label>

                    <input
                        id="edit-stock"
                        type="number"
                        min="0"
                        required
                        class="w-full rounded-lg border px-4 py-3">
                </div>

                <div>
                    <label
                        for="edit-minimum-stock"
                        class="mb-1 block text-sm font-semibold text-gray-700">
                        Stock mínimo
                    </label>

                    <input
                        id="edit-minimum-stock"
                        type="number"
                        min="0"
                        required
                        class="w-full rounded-lg border px-4 py-3">
                </div>

                <div
                    id="edit-message"
                    class="hidden rounded-lg p-3 text-sm">
                </div>

                <button
                    id="update-product"
                    type="submit"
                    class="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white">

                    Guardar cambios

                </button>

            </form>

        </main>

    </div>

</body>
</html>