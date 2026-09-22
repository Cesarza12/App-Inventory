<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Nuevo producto</title>

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

        <!-- Encabezado -->
        <header class="bg-blue-600 px-5 py-5 text-white">

            <a href="/products" class="text-sm opacity-80">
                ← Volver a productos
            </a>

            <h1 class="mt-2 text-2xl font-bold">
                Nuevo producto
            </h1>

        </header>

        <!-- Formulario -->
        <main class="p-5">

            <form id="product-form" class="space-y-4">

                <!-- Nombre -->
                <div>
                    <label
                        for="name"
                        class="mb-1 block text-sm font-semibold text-gray-700">
                        Nombre
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        class="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                        placeholder="Ej. Laptop HP">
                </div>

                <!-- Código -->
                <div>
                    <label
                        for="code"
                        class="mb-1 block text-sm font-semibold text-gray-700">
                        Código
                    </label>

                    <input
                        id="code"
                        name="code"
                        type="text"
                        required
                        class="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                        placeholder="Ej. LAP-002">
                </div>

                <!-- Categoría -->
                <div>
                    <label
                        for="category_id"
                        class="mb-1 block text-sm font-semibold text-gray-700">
                        Categoría
                    </label>

                    <select
                        id="category_id"
                        name="category_id"
                        required
                        class="w-full rounded-lg border bg-white px-4 py-3 outline-none focus:border-blue-500">

                        <option value="">
                            Cargando categorías...
                        </option>

                    </select>
                </div>

                <!-- Descripción -->
                <div>
                    <label
                        for="description"
                        class="mb-1 block text-sm font-semibold text-gray-700">
                        Descripción
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        rows="3"
                        class="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                        placeholder="Descripción del producto"></textarea>
                </div>

                <!-- Precio -->
                <div>
                    <label
                        for="price"
                        class="mb-1 block text-sm font-semibold text-gray-700">
                        Precio
                    </label>

                    <input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        class="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                        placeholder="0.00">
                </div>

                <!-- Stock -->
                <div>
                    <label
                        for="stock"
                        class="mb-1 block text-sm font-semibold text-gray-700">
                        Stock inicial
                    </label>

                    <input
                        id="stock"
                        name="stock"
                        type="number"
                        min="0"
                        value="0"
                        required
                        class="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500">
                </div>

                <!-- Stock mínimo -->
                <div>
                    <label
                        for="minimum_stock"
                        class="mb-1 block text-sm font-semibold text-gray-700">
                        Stock mínimo
                    </label>

                    <input
                        id="minimum_stock"
                        name="minimum_stock"
                        type="number"
                        min="0"
                        value="0"
                        required
                        class="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500">
                </div>

                <!-- Mensaje -->
                <div
                    id="form-message"
                    class="hidden rounded-lg p-3 text-sm">
                </div>

                <!-- Botón -->
                <button
                    type="submit"
                    id="save-product"
                    class="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow hover:bg-blue-700">

                    Guardar producto

                </button>

            </form>

        </main>

    </div>

</body>
</html>