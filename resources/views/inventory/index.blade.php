<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Inventario</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#2563eb">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Inventario">
</head>

<body class="min-h-screen bg-gray-100">

    <div class="mx-auto max-w-md min-h-screen bg-white shadow">

        <!-- Encabezado -->
       <header class="bg-blue-600 px-5 py-6 text-white">

    <a
        href="http://127.0.0.1:8000/dashboard"
        class="text-sm opacity-80 hover:opacity-100"
    >
        ← Panel administrador
    </a>

    <p class="mt-2 text-sm opacity-80">
        Sistema de inventario
    </p>

    <h1 class="text-2xl font-bold">
        Mi Inventario
    </h1>

</header>

        <!-- Contenido -->
        <main class="p-5">

            <!-- Resumen -->
            <section class="grid grid-cols-2 gap-4">

                <div class="rounded-xl bg-blue-50 p-4">
                    <p class="text-sm text-gray-500">Productos</p>
                    <p id="products-count" class="mt-1 text-2xl font-bold">
                        -
                    </p>
                </div>

                <div class="rounded-xl bg-green-50 p-4">
                    <p class="text-sm text-gray-500">Categorías</p>
                    <p id="categories-count" class="mt-1 text-2xl font-bold">
                        -
                    </p>
                </div>

            </section>

            <!-- Acciones -->
            <section class="mt-6 space-y-3">

                <a
                  href="/products"
                  class="block w-full rounded-xl bg-blue-600 px-4 py-4 text-left font-semibold text-white shadow">
                 📦 Productos
               </a>

                <button
                    class="w-full rounded-xl bg-green-600 px-4 py-4 text-left font-semibold text-white shadow">
                    📁 Categorías
                </button>

                <button
                    class="w-full rounded-xl bg-orange-500 px-4 py-4 text-left font-semibold text-white shadow">
                    📊 Movimientos
                </button>

            </section>

            <!-- Estado -->
            <section class="mt-6 rounded-xl bg-gray-50 p-4">
                <p class="text-sm text-gray-500">Estado de la API</p>

                <p id="api-status" class="mt-1 font-semibold text-gray-400">
                    Comprobando...
                </p>
            </section>

        </main>

    </div>

</body>
</html>